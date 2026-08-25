import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { EstoqueService } from '../estoque/estoque.service';
import { ReabastecimentosService } from '../reabastecimentos/reabastecimentos.service';
import { VendasService } from '../vendas/vendas.service';

/**
 * Redes de seguranca periodicas: garantem que reabastecimento e liberacao
 * de reservas expiradas aconteçam mesmo se um evento pontual (job
 * enfileirado na hora da venda) falhar ou for perdido. O caminho
 * principal continua sendo o disparo automatico descrito na spec
 * (a cada venda confirmada / job atrasado por reserva).
 */
@Injectable()
export class JobsCronService {
  private readonly logger = new Logger(JobsCronService.name);

  constructor(
    private readonly estoqueService: EstoqueService,
    private readonly reabastecimentosService: ReabastecimentosService,
    private readonly vendasService: VendasService,
    private readonly config: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async verificarReabastecimento(): Promise<void> {
    await this.reabastecimentosService.verificarTodos();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async liberarReservasExpiradas(): Promise<void> {
    const minutos = this.config.get<number>('estoque.reservaExpiraMinutos') ?? 15;
    const ids = await this.estoqueService.listarIdsReservasExpiradas(minutos);
    for (const unidadeId of ids) {
      await this.vendasService.liberarReservaExpirada(unidadeId);
    }
    if (ids.length > 0) {
      this.logger.log(`Liberadas ${ids.length} reservas expiradas (rede de seguranca).`);
    }
  }
}
