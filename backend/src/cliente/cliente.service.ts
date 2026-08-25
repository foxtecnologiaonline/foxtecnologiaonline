import { Injectable } from '@nestjs/common';
import { VendasService } from '../vendas/vendas.service';
import { ProdutosService } from '../produtos/produtos.service';
import { ConteudoService } from '../conteudo/conteudo.service';
import { EstoqueService } from '../estoque/estoque.service';

@Injectable()
export class ClienteService {
  constructor(
    private readonly vendasService: VendasService,
    private readonly produtosService: ProdutosService,
    private readonly conteudoService: ConteudoService,
    private readonly estoqueService: EstoqueService,
  ) {}

  async minhasCompras(email: string) {
    const vendas = await this.vendasService.listarPorEmail(email);

    return Promise.all(
      vendas.map(async (venda) => {
        const [produto, unidade, conteudos] = await Promise.all([
          this.produtosService.findOneOrFail(venda.produtoId),
          venda.unidadeId ? this.estoqueService.buscarPorId(venda.unidadeId) : null,
          this.conteudoService.listarPorProduto(venda.produtoId),
        ]);
        return {
          vendaId: venda.id,
          produto: { id: produto.id, nome: produto.nome, descricao: produto.descricao },
          codigo: unidade?.codigo ?? null,
          comprasEm: venda.confirmadoEm,
          conteudos,
        };
      }),
    );
  }
}
