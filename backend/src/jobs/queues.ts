export const QUEUE_ESTOQUE = 'estoque';
export const QUEUE_VENDAS = 'vendas';
export const QUEUE_DEVOLUCOES = 'devolucoes';

export const JOB_GERAR_ESTOQUE_INICIAL = 'gerar-estoque-inicial';
export const JOB_REABASTECER_ESTOQUE = 'reabastecer-estoque';
export const JOB_LIBERAR_RESERVA_EXPIRADA = 'liberar-reserva-expirada';
export const JOB_EMITIR_E_ENTREGAR = 'emitir-e-entregar';
export const JOB_PROCESSAR_DEVOLUCAO = 'processar-devolucao';

export interface GerarEstoqueInicialPayload {
  produtoId: string;
  quantidade: number;
}

export interface ReabastecerEstoquePayload {
  produtoId: string;
  quantidade: number;
  estoqueDisponivelAntes: number;
}

export interface LiberarReservaExpiradaPayload {
  unidadeId: string;
}

export interface EmitirEEntregarPayload {
  vendaId: string;
}

export interface ProcessarDevolucaoPayload {
  devolucaoId: string;
}
