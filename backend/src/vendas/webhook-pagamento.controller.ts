import { Body, Controller, Headers, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { VendasService } from './vendas.service';
import { PagamentoService } from '../pagamento/pagamento.service';

@Controller('webhooks')
export class WebhookPagamentoController {
  constructor(
    private readonly vendasService: VendasService,
    private readonly pagamentoService: PagamentoService,
  ) {}

  @Post('pagamento')
  @HttpCode(200)
  async receber(
    @Req() req: Request,
    @Body() body: any,
    @Headers('x-webhook-signature') assinatura?: string,
  ) {
    const payloadBruto = JSON.stringify(body);
    this.pagamentoService.validarAssinatura(payloadBruto, assinatura);
    const evento = this.pagamentoService.normalizarEvento(body);
    await this.vendasService.confirmarPorEvento(evento);
    return { recebido: true };
  }
}
