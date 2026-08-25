import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { EstoqueModule } from '../estoque/estoque.module';
import { VendasModule } from '../vendas/vendas.module';
import { ReabastecimentosModule } from '../reabastecimentos/reabastecimentos.module';
import { DevolucoesModule } from '../devolucoes/devolucoes.module';

@Module({
  imports: [EstoqueModule, VendasModule, ReabastecimentosModule, DevolucoesModule],
  controllers: [AdminController],
})
export class AdminModule {}
