import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bullmq';
import { VendasService } from '../../vendas/vendas.service';
import { EstoqueService } from '../../estoque/estoque.service';
import { ProdutosService } from '../../produtos/produtos.service';
import { ConteudoService } from '../../conteudo/conteudo.service';
import { EmailService } from '../../email/email.service';
import {
  EmitirEEntregarPayload,
  JOB_EMITIR_E_ENTREGAR,
  JOB_LIBERAR_RESERVA_EXPIRADA,
  LiberarReservaExpiradaPayload,
  QUEUE_VENDAS,
} from '../queues';

@Processor(QUEUE_VENDAS)
export class VendasProcessor extends WorkerHost {
  private readonly logger = new Logger(VendasProcessor.name);

  constructor(
    private readonly vendasService: VendasService,
    private readonly estoqueService: EstoqueService,
    private readonly produtosService: ProdutosService,
    private readonly conteudoService: ConteudoService,
    private readonly emailService: EmailService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  async process(job: Job<EmitirEEntregarPayload | LiberarReservaExpiradaPayload>): Promise<void> {
    switch (job.name) {
      case JOB_LIBERAR_RESERVA_EXPIRADA: {
        const { unidadeId } = job.data as LiberarReservaExpiradaPayload;
        await this.vendasService.liberarReservaExpirada(unidadeId);
        break;
      }
      case JOB_EMITIR_E_ENTREGAR: {
        await this.emitirEEntregar((job.data as EmitirEEntregarPayload).vendaId);
        break;
      }
      default:
        this.logger.warn(`Job desconhecido na fila ${QUEUE_VENDAS}: ${job.name}`);
    }
  }

  /**
   * Regra de negocio 5: emissao e entrega automatica. Monta o e-mail com a
   * chave/licenca gerada e os materiais de apoio vinculados ao produto, e
   * envia automaticamente ao comprador. O acesso na area do cliente ja
   * fica liberado, pois GET /minhas-compras consulta vendas confirmadas
   * diretamente.
   */
  private async emitirEEntregar(vendaId: string): Promise<void> {
    const venda = await this.vendasService.buscarPorId(vendaId);
    if (venda.status !== 'confirmada' || !venda.unidadeId) {
      this.logger.warn(`Venda ${vendaId} nao esta confirmada; emissao abortada.`);
      return;
    }
    const [produto, unidade, conteudos] = await Promise.all([
      this.produtosService.findOneOrFail(venda.produtoId),
      this.estoqueService.buscarPorId(venda.unidadeId),
      this.conteudoService.listarPorProduto(venda.produtoId),
    ]);

    await this.emailService.enviarEntregaProduto({
      email: venda.compradorEmail,
      produtoNome: produto.nome,
      codigo: unidade?.codigo ?? null,
      conteudos: conteudos.map((c) => ({ titulo: c.titulo, tipo: c.tipo, url: c.url })),
      linkAreaCliente: `${this.config.get<string>('frontendUrl')}/minhas-compras`,
    });
    this.logger.log(`Venda ${vendaId} emitida e entregue para ${venda.compradorEmail}.`);
  }
}
