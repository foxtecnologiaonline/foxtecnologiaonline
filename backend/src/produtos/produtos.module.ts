import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { Produto } from './entities/produto.entity';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { QUEUE_ESTOQUE } from '../jobs/queues';
import { ConteudoModule } from '../conteudo/conteudo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    BullModule.registerQueue({ name: QUEUE_ESTOQUE }),
    ConteudoModule,
  ],
  providers: [ProdutosService],
  controllers: [ProdutosController],
  exports: [ProdutosService],
})
export class ProdutosModule {}
