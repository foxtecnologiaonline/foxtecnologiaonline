'use client'

import { useEffect, useMemo, useState } from 'react'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarData, formatarPreco } from '@/lib/format'
import type { StatusVenda, Venda } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import StatusBadge from '@/components/ui/StatusBadge'
import DataTable, { type Column } from '@/components/ui/DataTable'
import { AlertTriangle } from 'lucide-react'

const STATUS_OPCOES: StatusVenda[] = [
  'pendente',
  'aguardando_pagamento',
  'aprovada',
  'recusada',
  'cancelada',
]

export default function AdminVendasPage() {
  const [vendas, setVendas] = useState<Venda[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [filtroStatus, setFiltroStatus] = useState<string>('')

  useEffect(() => {
    let ativo = true
    api
      .get<Venda[]>('/admin/vendas')
      .then((data) => {
        if (ativo) setVendas(data)
      })
      .catch((err) => {
        if (ativo) setErro(mensagemDeErro(err))
      })
    return () => {
      ativo = false
    }
  }, [])

  const vendasFiltradas = useMemo(() => {
    if (!vendas) return []
    return filtroStatus ? vendas.filter((v) => v.status === filtroStatus) : vendas
  }, [vendas, filtroStatus])

  const columns: Column<Venda>[] = [
    { key: 'comprador', header: 'Comprador', render: (v) => v.compradorNome || v.compradorEmail },
    { key: 'produto', header: 'Produto', render: (v) => v.produto?.nome ?? v.produtoId },
    { key: 'valor', header: 'Valor', render: (v) => formatarPreco(v.valor) },
    { key: 'status', header: 'Status', render: (v) => <StatusBadge status={v.status} /> },
    { key: 'data', header: 'Data', render: (v) => formatarData(v.criadoEm) },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-fox-gray-dark">Vendas</h1>
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="border border-fox-accent rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fox-orange"
        >
          <option value="">Todos os status</option>
          {STATUS_OPCOES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {!vendas && !erro && <Spinner label="Carregando vendas..." />}

      {erro && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      )}

      {vendas && (
        <DataTable
          columns={columns}
          rows={vendasFiltradas}
          rowKey={(v) => v.id}
          emptyMessage="Nenhuma venda encontrada para o filtro selecionado."
        />
      )}
    </div>
  )
}
