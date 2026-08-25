import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { DevolucoesService } from '../../devolucoes/devolucoes.service';
import { JOB_PROCESSAR_DEVOLUCAO, ProcessarDevolucaoPayload, QUEUE_DEVOLUCOES } from '../queues';

@Processor(QUEUE_DEVOLUCOES)
export class DevolucoesProcessor extends WorkerHost {
  private readonly logger = new Logger(DevolucoesProcessor.name);

  constructor(private readonly devolucoesService: DevolucoesService) {
    super();
  }

  async process(job: Job<ProcessarDevolucaoPayload>): Promise<void> {
    if (job.name !== JOB_PROCESSAR_DEVOLUCAO) {
      this.logger.warn(`Job desconhecido na fila ${QUEUE_DEVOLUCOES}: ${job.name}`);
      return;
    }
    await this.devolucoesService.processarAutomaticamente(job.data.devolucaoId);
  }
}
