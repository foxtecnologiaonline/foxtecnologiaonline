import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Venda } from './entities/venda.entity';
import { CheckoutDto } from './dto/checkout.dto';
import { EstoqueService } from '../estoque/estoque.service';
import { ProdutosService } from '../produtos/produtos.service';
import { PagamentoService, EventoPagamentoNormalizado } from '../pagamento/pagamento.service';
import { ReabastecimentosService } from '../reabastecimentos/reabastecimentos.service';
import {
  EmitirEEntregarPayload,
  JOB_EMITIR_E_ENTREGAR,
  JOB_LIBERAR_RESERVA_EXPIRADA,
  LiberarReservaExpiradaPayload,
  QUEUE_VENDAS,
} from '../jobs/queues';

@Injectable()
export class VendasService {
  private readonly logger = new Logger(VendasService.name);

  constructor(
    @InjectRepository(Venda)
    private readonly vendas: Repository<Venda>,
    @InjectQueue(QUEUE_VENDAS)
    private readonly vendasQueue: Queue<EmitirEEntregarPayload | LiberarReservaExpiradaPayload>,
    private readonly estoqueService: EstoqueService,
    private readonly produtosService: ProdutosService,
    private readonly pagamentoService: PagamentoService,
    private readonly reabastecimentosService: ReabastecimentosService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Regra de negocio 3: reserva de 1 unidade disponivel no inicio do
   * checkout. Se a reserva nao for confirmada em X minutos, um job
   * (JOB_LIBERAR_RESERVA_EXPIRADA, agendado aqui como job atrasado do
   * BullMQ) libera a unidade de volta para "disponivel".
   */
  async checkout(dto: CheckoutDto) {
    const produto = await this.produtosService.findOneOrFail(dto.produtoId);
    if (produto.status !== 'ativo') {
      throw new BadRequestException('Produto indisponivel para venda.');
    }

    const unidade = await this.estoqueService.reservarUnidade(dto.produtoId);
    if (!unidade) {
      throw new BadRequestException('Estoque indisponivel para este produto no momento.');
    }

    const venda = await this.vendas.save(
      this.vendas.create({
        produtoId: produto.id,
        unidadeId: unidade.id,
        compradorEmail: dto.compradorEmail,
        valor: produto.preco,
        status: 'pendente',
      }),
    );

    await this.estoqueService.marcarReservadaParaVenda(unidade.id, venda.id);

    const { transacaoId, checkoutUrl } = await this.pagamentoService.iniciarCobranca(venda);
    await this.vendas.update(venda.id, { gatewayTransacaoId: transacaoId });

    const expiraMinutos = this.config.get<number>('estoque.reservaExpiraMinutos') ?? 15;
    await this.vendasQueue.add(
      JOB_LIBERAR_RESERVA_EXPIRADA,
      { unidadeId: unidade.id },
      { delay: expiraMinutos * 60 * 1000, jobId: `liberar-reserva-${unidade.id}` },
    );

    return {
      vendaId: venda.id,
      produtoId: produto.id,
      valor: venda.valor,
      status: venda.status,
      transacaoId,
      checkoutUrl,
    };
  }

  /**
   * Regra de negocio 4: confirmacao via webhook do gateway. Transacao
   * atomica: unidade -> vendido, venda -> confirmada, e dispara a emissao.
   */
  async confirmarPorEvento(evento: EventoPagamentoNormalizado): Promise<void> {
    const venda = await this.vendas.findOne({ where: { gatewayTransacaoId: evento.transacaoId } });
    if (!venda) {
      throw new NotFoundException(`Venda nao encontrada para a transacao ${evento.transacaoId}.`);
    }

    if (venda.status !== 'pendente') {
      this.logger.warn(`Venda ${venda.id} ja processada (status=${venda.status}); evento ignorado.`);
      return;
    }

    if (evento.status === 'recusado') {
      await this.vendas.update(venda.id, { status: 'cancelada' });
      if (venda.unidadeId) await this.estoqueService.liberarReserva(venda.unidadeId);
      return;
    }

    if (evento.status !== 'aprovado') return;

    if (!venda.unidadeId) {
      throw new BadRequestException('Venda sem unidade reservada associada.');
    }

    await this.vendas.update(venda.id, { status: 'confirmada', confirmadoEm: new Date() });
    await this.estoqueService.marcarVendida(venda.unidadeId, venda.id);

    await this.vendasQueue.add(JOB_EMITIR_E_ENTREGAR, { vendaId: venda.id });

    // Regra de negocio 2: verificar limiar de reabastecimento apos cada venda confirmada.
    await this.reabastecimentosService.verificarEDispararSeNecessario(venda.produtoId);
  }

  /**
   * Usado pelo job/cron JOB_LIBERAR_RESERVA_EXPIRADA: se a venda ainda
   * estiver pendente quando a reserva expira, cancela a venda e libera a
   * unidade de volta para "disponivel". Idempotente: se a venda ja foi
   * confirmada (unidade "vendido"), nao faz nada.
   */
  async liberarReservaExpirada(unidadeId: string): Promise<void> {
    const venda = await this.vendas.findOne({ where: { unidadeId, status: 'pendente' } });
    if (venda) {
      await this.vendas.update(venda.id, { status: 'cancelada' });
    }
    await this.estoqueService.liberarReserva(unidadeId);
  }

  async buscarPorId(id: string): Promise<Venda> {
    const venda = await this.vendas.findOne({ where: { id } });
    if (!venda) throw new NotFoundException('Venda nao encontrada.');
    return venda;
  }

  async listarPorEmail(email: string): Promise<Venda[]> {
    return this.vendas.find({
      where: { compradorEmail: email, status: 'confirmada' },
      order: { confirmadoEm: 'DESC' },
    });
  }

  async listarTodas(): Promise<Venda[]> {
    return this.vendas.find({ order: { criadoEm: 'DESC' } });
  }
}
