import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { VendasModule } from '../vendas/vendas.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { ConteudoModule } from '../conteudo/conteudo.module';
import { EstoqueModule } from '../estoque/estoque.module';

@Module({
  imports: [VendasModule, ProdutosModule, ConteudoModule, EstoqueModule],
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
