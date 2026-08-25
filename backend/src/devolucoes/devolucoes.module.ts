import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { Devolucao } from './entities/devolucao.entity';
import { Venda } from '../vendas/entities/venda.entity';
import { DevolucoesService } from './devolucoes.service';
import { DevolucoesController } from './devolucoes.controller';
import { EstoqueModule } from '../estoque/estoque.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { QUEUE_DEVOLUCOES } from '../jobs/queues';

@Module({
  imports: [
    TypeOrmModule.forFeature([Devolucao, Venda]),
    BullModule.registerQueue({ name: QUEUE_DEVOLUCOES }),
    EstoqueModule,
    ProdutosModule,
  ],
  providers: [DevolucoesService],
  controllers: [DevolucoesController],
  exports: [DevolucoesService],
})
export class DevolucoesModule {}
