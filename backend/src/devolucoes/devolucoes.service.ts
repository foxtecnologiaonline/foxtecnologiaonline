import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Devolucao } from './entities/devolucao.entity';
import { Venda } from '../vendas/entities/venda.entity';
import { CreateDevolucaoDto } from './dto/create-devolucao.dto';
import { EstoqueService } from '../estoque/estoque.service';
import { ProdutosService } from '../produtos/produtos.service';
import { EmailService } from '../email/email.service';
import { AuthenticatedUser } from '../common/decorators/current-user.decorator';
import { JOB_PROCESSAR_DEVOLUCAO, ProcessarDevolucaoPayload, QUEUE_DEVOLUCOES } from '../jobs/queues';

@Injectable()
export class DevolucoesService {
  private readonly logger = new Logger(DevolucoesService.name);

  constructor(
    @InjectRepository(Devolucao)
    private readonly devolucoes: Repository<Devolucao>,
    @InjectRepository(Venda)
    private readonly vendas: Repository<Venda>,
    @InjectQueue(QUEUE_DEVOLUCOES)
    private readonly devolucoesQueue: Queue<ProcessarDevolucaoPayload>,
    private readonly estoqueService: EstoqueService,
    private readonly produtosService: ProdutosService,
    private readonly emailService: EmailService,
    private readonly config: ConfigService,
  ) {}

  async solicitar(dto: CreateDevolucaoDto, usuario: AuthenticatedUser): Promise<Devolucao> {
    const venda = await this.vendas.findOne({ where: { id: dto.vendaId } });
    if (!venda) throw new NotFoundException('Venda nao encontrada.');
    if (usuario.tipo !== 'admin' && venda.compradorEmail !== usuario.email) {
      throw new ForbiddenException('Esta venda nao pertence a este usuario.');
    }
    if (venda.status !== 'confirmada' || !venda.unidadeId) {
      throw new BadRequestException('Somente vendas confirmadas podem ser devolvidas.');
    }

    const jaExiste = await this.devolucoes.findOne({
      where: { vendaId: venda.id },
    });
    if (jaExiste) {
      throw new BadRequestException('Ja existe uma solicitacao de devolucao para esta venda.');
    }

    const devolucao = await this.devolucoes.save(
      this.devolucoes.create({
        vendaId: venda.id,
        unidadeId: venda.unidadeId,
        motivo: dto.motivo ?? null,
        status: 'pendente',
      }),
    );

    await this.devolucoesQueue.add(JOB_PROCESSAR_DEVOLUCAO, { devolucaoId: devolucao.id });
    return devolucao;
  }

  /**
   * Regra de negocio 6: valida automaticamente a elegibilidade da
   * devolucao. Se elegivel, aprova automaticamente e libera a unidade.
   * Caso contrario, permanece "pendente" mas marcada como processada,
   * o que a coloca na fila de revisao manual (unica etapa nao
   * automatizada do fluxo).
   */
  async processarAutomaticamente(devolucaoId: string): Promise<void> {
    const devolucao = await this.devolucoes.findOne({ where: { id: devolucaoId } });
    if (!devolucao || devolucao.status !== 'pendente') return;

    const venda = await this.vendas.findOne({ where: { id: devolucao.vendaId } });
    const unidade = await this.estoqueService.buscarPorId(devolucao.unidadeId);
    if (!venda || !unidade) return;

    const elegivel = await this.avaliarElegibilidade(venda, unidade.status);

    if (elegivel) {
      await this.estoqueService.marcarDevolvida(unidade.id);
      await this.devolucoes.update(devolucao.id, {
        status: 'aprovada_automatica',
        processadoEm: new Date(),
      });
      const produto = await this.produtosService.findOneOrFail(venda.produtoId);
      await this.emailService.enviarDevolucaoAprovada({
        email: venda.compradorEmail,
        produtoNome: produto.nome,
      });
      this.logger.log(`Devolucao ${devolucao.id} aprovada automaticamente.`);
    } else {
      // Permanece "pendente", porem com processado_em preenchido: isso
      // sinaliza que ja passou pela regra automatica e agora aguarda
      // revisao manual do administrador.
      await this.devolucoes.update(devolucao.id, { processadoEm: new Date() });
      const produto = await this.produtosService.findOneOrFail(venda.produtoId);
      await this.emailService.enviarDevolucaoEmRevisao({
        email: venda.compradorEmail,
        produtoNome: produto.nome,
      });
      this.logger.log(`Devolucao ${devolucao.id} enviada para revisao manual.`);
    }
  }

  private async avaliarElegibilidade(venda: Venda, statusUnidade: string): Promise<boolean> {
    const prazoDias = this.config.get<number>('devolucao.prazoDias') ?? 7;
    const referencia = venda.confirmadoEm ?? venda.criadoEm;
    const dentroDoPrazo =
      referencia !== null &&
      Date.now() - new Date(referencia).getTime() <= prazoDias * 24 * 60 * 60 * 1000;

    // "sem uso registrado": aqui, aproximado pela unidade ainda estar no
    // estado "vendido" (nunca bloqueada/ja devolvida), na ausencia de um
    // rastreamento de uso mais granular no escopo atual.
    const semUsoRegistrado = statusUnidade === 'vendido';

    return dentroDoPrazo && semUsoRegistrado;
  }

  async aprovarManualmente(id: string): Promise<Devolucao> {
    const devolucao = await this.buscarPorIdOuFalha(id);
    if (devolucao.status !== 'pendente') {
      throw new BadRequestException('Esta devolucao ja foi processada.');
    }
    await this.estoqueService.marcarDevolvida(devolucao.unidadeId);
    await this.devolucoes.update(id, { status: 'aprovada_manual', processadoEm: new Date() });
    const venda = await this.vendas.findOneOrFail({ where: { id: devolucao.vendaId } });
    const produto = await this.produtosService.findOneOrFail(venda.produtoId);
    await this.emailService.enviarDevolucaoAprovada({ email: venda.compradorEmail, produtoNome: produto.nome });
    return this.buscarPorIdOuFalha(id);
  }

  async rejeitarManualmente(id: string): Promise<Devolucao> {
    const devolucao = await this.buscarPorIdOuFalha(id);
    if (devolucao.status !== 'pendente') {
      throw new BadRequestException('Esta devolucao ja foi processada.');
    }
    await this.devolucoes.update(id, { status: 'rejeitada', processadoEm: new Date() });
    return this.buscarPorIdOuFalha(id);
  }

  async buscarPorIdOuFalha(id: string): Promise<Devolucao> {
    const devolucao = await this.devolucoes.findOne({ where: { id } });
    if (!devolucao) throw new NotFoundException('Devolucao nao encontrada.');
    return devolucao;
  }

  /** Fila de revisao manual: pendentes que ja passaram pela regra automatica. */
  async listarFilaRevisaoManual(): Promise<Devolucao[]> {
    return this.devolucoes
      .createQueryBuilder('d')
      .where('d.status = :status', { status: 'pendente' })
      .andWhere('d.processadoEm IS NOT NULL')
      .orderBy('d.criadoEm', 'ASC')
      .getMany();
  }
}
