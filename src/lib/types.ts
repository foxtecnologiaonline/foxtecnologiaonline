// Tipos do domínio da loja de ativos digitais, conforme o contrato de API
// descrito na especificação (seção 4). O backend NestJS ainda não existe
// neste repositório — estes tipos e o mapa de rotas em api.ts documentam o
// contrato esperado para o frontend poder ser plugado assim que ele existir.

export type TipoUsuario = 'cliente' | 'admin'

export interface Usuario {
  id: string
  nome: string
  email: string
  tipo: TipoUsuario
}

export interface AuthResponse {
  token: string
  usuario: Usuario
}

export type StatusProduto = 'ativo' | 'inativo' | 'rascunho'

export type TipoConteudo = 'arquivo' | 'chave' | 'link'

export interface ConteudoProduto {
  id: string
  tipo: TipoConteudo
  titulo: string
  ordem: number
  url?: string
}

export interface Produto {
  id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
  status: StatusProduto
  estoqueLotePadrao?: number
  limiarReabastecimento?: number
  conteudos?: ConteudoProduto[]
}

export type StatusVenda =
  | 'pendente'
  | 'aguardando_pagamento'
  | 'aprovada'
  | 'recusada'
  | 'cancelada'

export interface Venda {
  id: string
  produtoId: string
  produto?: Pick<Produto, 'id' | 'nome' | 'preco'>
  compradorEmail: string
  compradorNome?: string
  valor: number
  status: StatusVenda
  checkoutUrl?: string
  criadoEm: string
}

export interface ConteudoCompra {
  id: string
  titulo: string
  tipo: TipoConteudo
  urlAssinada: string
}

export interface Compra {
  vendaId: string
  produto: Pick<Produto, 'id' | 'nome'>
  codigo?: string
  data: string
  status: StatusVenda
  conteudos: ConteudoCompra[]
}

export type StatusDevolucao =
  | 'pendente'
  | 'aprovada_automatica'
  | 'aprovada_manual'
  | 'rejeitada'

export interface Devolucao {
  id: string
  vendaId: string
  produto?: Pick<Produto, 'id' | 'nome'>
  motivo: string
  status: StatusDevolucao
  criadaEm: string
}

export type StatusUnidadeEstoque =
  | 'disponivel'
  | 'reservado'
  | 'vendido'
  | 'devolvido'
  | 'bloqueado'

export interface UnidadeEstoque {
  id: string
  codigo: string
  status: StatusUnidadeEstoque
  criadoEm: string
  vendaId?: string
}

export interface ResumoEstoque {
  disponivel: number
  reservado: number
  vendido: number
  devolvido: number
  bloqueado: number
}

export interface Reabastecimento {
  id: string
  produtoId: string
  produto?: Pick<Produto, 'id' | 'nome'>
  quantidadeGerada: number
  estoqueAntes: number
  criadoEm: string
}

export interface EstoqueResponse {
  produto: Pick<Produto, 'id' | 'nome'>
  resumo: ResumoEstoque
  unidades: UnidadeEstoque[]
}

export interface CheckoutResponse {
  vendaId: string
  checkoutUrl: string
  valor: number
  status: StatusVenda
}

export interface ApiErrorBody {
  statusCode: number
  message: string | string[]
}
