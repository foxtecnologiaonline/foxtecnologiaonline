const STYLES: Record<string, string> = {
  // vendas
  pendente: 'bg-yellow-100 text-yellow-800',
  aguardando_pagamento: 'bg-yellow-100 text-yellow-800',
  aprovada: 'bg-green-100 text-green-800',
  recusada: 'bg-red-100 text-red-800',
  cancelada: 'bg-gray-100 text-gray-700',
  // estoque
  disponivel: 'bg-green-100 text-green-800',
  reservado: 'bg-blue-100 text-blue-800',
  vendido: 'bg-purple-100 text-purple-800',
  devolvido: 'bg-orange-100 text-orange-800',
  bloqueado: 'bg-red-100 text-red-800',
  // devoluções
  aprovada_automatica: 'bg-green-100 text-green-800',
  aprovada_manual: 'bg-green-100 text-green-800',
  rejeitada: 'bg-red-100 text-red-800',
  // produto
  ativo: 'bg-green-100 text-green-800',
  inativo: 'bg-gray-100 text-gray-700',
  rascunho: 'bg-yellow-100 text-yellow-800',
}

const LABELS: Record<string, string> = {
  pendente: 'Pendente',
  aguardando_pagamento: 'Aguardando pagamento',
  aprovada: 'Aprovada',
  recusada: 'Recusada',
  cancelada: 'Cancelada',
  disponivel: 'Disponível',
  reservado: 'Reservado',
  vendido: 'Vendido',
  devolvido: 'Devolvido',
  bloqueado: 'Bloqueado',
  aprovada_automatica: 'Aprovada automaticamente',
  aprovada_manual: 'Aprovada manualmente',
  rejeitada: 'Rejeitada',
  ativo: 'Ativo',
  inativo: 'Inativo',
  rascunho: 'Rascunho',
}

export default function StatusBadge({ status }: { status: string }) {
  const style = STYLES[status] ?? 'bg-gray-100 text-gray-700'
  const label = LABELS[status] ?? status

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${style}`}>
      {label}
    </span>
  )
}
