import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { Venda } from './entities/venda.entity';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { WebhookPagamentoController } from './webhook-pagamento.controller';
import { EstoqueModule } from '../estoque/estoque.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { PagamentoModule } from '../pagamento/pagamento.module';
import { ReabastecimentosModule } from '../reabastecimentos/reabastecimentos.module';
import { QUEUE_VENDAS } from '../jobs/queues';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venda]),
    BullModule.registerQueue({ name: QUEUE_VENDAS }),
    EstoqueModule,
    ProdutosModule,
    PagamentoModule,
    ReabastecimentosModule,
  ],
  providers: [VendasService],
  controllers: [VendasController, WebhookPagamentoController],
  exports: [VendasService],
})
export class VendasModule {}
