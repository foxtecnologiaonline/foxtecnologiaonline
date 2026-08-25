import { Controller, Get, Param, ParseUUIDPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { EstoqueService } from '../estoque/estoque.service';
import { VendasService } from '../vendas/vendas.service';
import { ReabastecimentosService } from '../reabastecimentos/reabastecimentos.service';
import { DevolucoesService } from '../devolucoes/devolucoes.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(
    private readonly estoqueService: EstoqueService,
    private readonly vendasService: VendasService,
    private readonly reabastecimentosService: ReabastecimentosService,
    private readonly devolucoesService: DevolucoesService,
  ) {}

  @Get('estoque/:produto_id')
  async estoque(
    @Param('produto_id', ParseUUIDPipe) produtoId: string,
    @Query('status') status?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const [resumo, pagina] = await Promise.all([
      this.estoqueService.contarPorStatus(produtoId),
      this.estoqueService.listarPorProduto(
        produtoId,
        status,
        limit ? Number(limit) : undefined,
        offset ? Number(offset) : undefined,
      ),
    ]);
    return { resumo, ...pagina };
  }

  @Get('vendas')
  vendas() {
    return this.vendasService.listarTodas();
  }

  @Get('reabastecimentos')
  reabastecimentos() {
    return this.reabastecimentosService.listarLogs();
  }

  @Get('devolucoes/revisao-manual')
  filaRevisaoManual() {
    return this.devolucoesService.listarFilaRevisaoManual();
  }

  @Patch('devolucoes/:id/aprovar')
  aprovarDevolucao(@Param('id', ParseUUIDPipe) id: string) {
    return this.devolucoesService.aprovarManualmente(id);
  }

  @Patch('devolucoes/:id/rejeitar')
  rejeitarDevolucao(@Param('id', ParseUUIDPipe) id: string) {
    return this.devolucoesService.rejeitarManualmente(id);
  }
}
