import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { Produto } from '../produtos/entities/produto.entity';
import { ReabastecimentoLog } from './entities/reabastecimento-log.entity';
import { ReabastecimentosService } from './reabastecimentos.service';
import { EstoqueModule } from '../estoque/estoque.module';
import { QUEUE_ESTOQUE } from '../jobs/queues';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto, ReabastecimentoLog]),
    BullModule.registerQueue({ name: QUEUE_ESTOQUE }),
    EstoqueModule,
  ],
  providers: [ReabastecimentosService],
  exports: [ReabastecimentosService],
})
export class ReabastecimentosModule {}
