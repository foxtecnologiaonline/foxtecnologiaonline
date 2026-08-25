import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Repository } from 'typeorm';
import { Produto } from '../produtos/entities/produto.entity';
import { EstoqueService } from '../estoque/estoque.service';
import { ReabastecimentoLog } from './entities/reabastecimento-log.entity';
import {
  JOB_REABASTECER_ESTOQUE,
  QUEUE_ESTOQUE,
  ReabastecerEstoquePayload,
} from '../jobs/queues';

@Injectable()
export class ReabastecimentosService {
  private readonly logger = new Logger(ReabastecimentosService.name);

  constructor(
    @InjectRepository(Produto)
    private readonly produtos: Repository<Produto>,
    @InjectRepository(ReabastecimentoLog)
    private readonly logs: Repository<ReabastecimentoLog>,
    @InjectQueue(QUEUE_ESTOQUE)
    private readonly estoqueQueue: Queue<ReabastecerEstoquePayload>,
    private readonly estoqueService: EstoqueService,
  ) {}

  /**
   * Regra de negocio 2: reabastecimento automatico. Disparado apos cada
   * venda confirmada (chamado pelo VendasService) e tambem periodicamente
   * pelo cron em JobsModule, como rede de seguranca.
   */
  async verificarEDispararSeNecessario(produtoId: string): Promise<void> {
    const produto = await this.produtos.findOne({ where: { id: produtoId } });
    if (!produto) return;

    const disponiveis = await this.estoqueService.contarDisponiveis(produtoId);
    if (disponiveis >= produto.limiarReabastecimento) return;

    // jobId deduplica: evita enfileirar reabastecimentos duplicados enquanto
    // um lote anterior ainda nao foi processado para o mesmo produto.
    const jobId = `reabastecer-${produtoId}`;
    const jobExistente = await this.estoqueQueue.getJob(jobId);
    if (jobExistente && !(await jobExistente.isCompleted()) && !(await jobExistente.isFailed())) {
      return;
    }

    await this.estoqueQueue.add(
      JOB_REABASTECER_ESTOQUE,
      {
        produtoId,
        quantidade: produto.estoqueLotePadrao,
        estoqueDisponivelAntes: disponiveis,
      },
      { jobId },
    );
    this.logger.log(
      `Reabastecimento enfileirado para produto ${produtoId} (disponivel=${disponiveis}, limiar=${produto.limiarReabastecimento}).`,
    );
  }

  async registrarLog(params: {
    produtoId: string;
    quantidadeGerada: number;
    estoqueDisponivelAntes: number;
  }): Promise<void> {
    await this.logs.save(
      this.logs.create({
        produtoId: params.produtoId,
        quantidadeGerada: params.quantidadeGerada,
        estoqueDisponivelAntes: params.estoqueDisponivelAntes,
        motivo: 'limiar_atingido',
      }),
    );
  }

  async listarLogs(): Promise<ReabastecimentoLog[]> {
    return this.logs.find({ order: { criadoEm: 'DESC' }, take: 200 });
  }

  /** Rede de seguranca periodica: varre todos os produtos ativos. */
  async verificarTodos(): Promise<void> {
    const produtos = await this.produtos.find({ where: { status: 'ativo' } });
    for (const produto of produtos) {
      await this.verificarEDispararSeNecessario(produto.id);
    }
  }
}
