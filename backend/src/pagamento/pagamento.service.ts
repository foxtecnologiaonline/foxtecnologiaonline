import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';
import { Venda } from '../vendas/entities/venda.entity';

export interface EventoPagamentoNormalizado {
  transacaoId: string;
  status: 'aprovado' | 'recusado' | 'estornado';
  valor?: number;
}

/**
 * Camada de abstracao do gateway de pagamento. A integracao real
 * (Stripe/Mercado Pago/PagSeguro) troca apenas esta classe; o resto do
 * fluxo de vendas trabalha com o formato normalizado acima.
 */
@Injectable()
export class PagamentoService {
  constructor(private readonly config: ConfigService) {}

  async iniciarCobranca(venda: Venda): Promise<{ transacaoId: string; checkoutUrl: string }> {
    // Stub de gateway: em producao, chamar a API do provedor e retornar a
    // URL de checkout real / transacao criada.
    const transacaoId = `txn_${venda.id}`;
    const checkoutUrl = `${this.config.get<string>('frontendUrl')}/checkout/${venda.id}`;
    return { transacaoId, checkoutUrl };
  }

  validarAssinatura(payloadBruto: string, assinaturaRecebida: string | undefined): void {
    const secret = this.config.get<string>('pagamento.webhookSecret');
    if (!secret) return; // ambiente de desenvolvimento sem segredo configurado
    if (!assinaturaRecebida) {
      throw new UnauthorizedException('Assinatura do webhook ausente.');
    }
    const esperado = createHmac('sha256', secret).update(payloadBruto).digest('hex');
    const bufEsperado = Buffer.from(esperado);
    const bufRecebido = Buffer.from(assinaturaRecebida);
    if (
      bufEsperado.length !== bufRecebido.length ||
      !timingSafeEqual(bufEsperado, bufRecebido)
    ) {
      throw new UnauthorizedException('Assinatura do webhook invalida.');
    }
  }

  normalizarEvento(body: any): EventoPagamentoNormalizado {
    return {
      transacaoId: body.transacaoId ?? body.transaction_id ?? body.id,
      status: body.status,
      valor: body.valor ?? body.amount,
    };
  }
}
