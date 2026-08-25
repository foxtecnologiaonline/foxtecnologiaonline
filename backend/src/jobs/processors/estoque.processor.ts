import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { EstoqueService } from '../../estoque/estoque.service';
import { ReabastecimentosService } from '../../reabastecimentos/reabastecimentos.service';
import {
  GerarEstoqueInicialPayload,
  JOB_GERAR_ESTOQUE_INICIAL,
  JOB_REABASTECER_ESTOQUE,
  QUEUE_ESTOQUE,
  ReabastecerEstoquePayload,
} from '../queues';

@Processor(QUEUE_ESTOQUE)
export class EstoqueProcessor extends WorkerHost {
  private readonly logger = new Logger(EstoqueProcessor.name);

  constructor(
    private readonly estoqueService: EstoqueService,
    private readonly reabastecimentosService: ReabastecimentosService,
  ) {
    super();
  }

  async process(job: Job<GerarEstoqueInicialPayload | ReabastecerEstoquePayload>): Promise<void> {
    switch (job.name) {
      case JOB_GERAR_ESTOQUE_INICIAL: {
        const { produtoId, quantidade } = job.data as GerarEstoqueInicialPayload;
        await this.estoqueService.gerarLote(produtoId, quantidade);
        break;
      }
      case JOB_REABASTECER_ESTOQUE: {
        const { produtoId, quantidade, estoqueDisponivelAntes } =
          job.data as ReabastecerEstoquePayload;
        await this.estoqueService.gerarLote(produtoId, quantidade);
        await this.reabastecimentosService.registrarLog({
          produtoId,
          quantidadeGerada: quantidade,
          estoqueDisponivelAntes,
        });
        break;
      }
      default:
        this.logger.warn(`Job desconhecido na fila ${QUEUE_ESTOQUE}: ${job.name}`);
    }
  }
}
