import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EstoqueProcessor } from './processors/estoque.processor';
import { VendasProcessor } from './processors/vendas.processor';
import { DevolucoesProcessor } from './processors/devolucoes.processor';
import { JobsCronService } from './jobs-cron.service';
import { EstoqueModule } from '../estoque/estoque.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { ConteudoModule } from '../conteudo/conteudo.module';
import { VendasModule } from '../vendas/vendas.module';
import { DevolucoesModule } from '../devolucoes/devolucoes.module';
import { ReabastecimentosModule } from '../reabastecimentos/reabastecimentos.module';
import { QUEUE_DEVOLUCOES, QUEUE_ESTOQUE, QUEUE_VENDAS } from './queues';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: QUEUE_ESTOQUE },
      { name: QUEUE_VENDAS },
      { name: QUEUE_DEVOLUCOES },
    ),
    EstoqueModule,
    ProdutosModule,
    ConteudoModule,
    VendasModule,
    DevolucoesModule,
    ReabastecimentosModule,
  ],
  providers: [EstoqueProcessor, VendasProcessor, DevolucoesProcessor, JobsCronService],
})
export class JobsModule {}
