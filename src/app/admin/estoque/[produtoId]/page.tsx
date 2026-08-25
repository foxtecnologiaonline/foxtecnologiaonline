'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarData } from '@/lib/format'
import type { EstoqueResponse, ResumoEstoque } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import StatusBadge from '@/components/ui/StatusBadge'
import DataTable, { type Column } from '@/components/ui/DataTable'
import { AlertTriangle } from 'lucide-react'

const CARDS: { chave: keyof ResumoEstoque; label: string }[] = [
  { chave: 'disponivel', label: 'Disponível' },
  { chave: 'reservado', label: 'Reservado' },
  { chave: 'vendido', label: 'Vendido' },
  { chave: 'devolvido', label: 'Devolvido' },
  { chave: 'bloqueado', label: 'Bloqueado' },
]

export default function AdminEstoquePage({ params }: { params: { produtoId: string } }) {
  const [dados, setDados] = useState<EstoqueResponse | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true
    api
      .get<EstoqueResponse>(`/admin/estoque/${params.produtoId}`)
      .then((data) => {
        if (ativo) setDados(data)
      })
      .catch((err) => {
        if (ativo) setErro(mensagemDeErro(err))
      })
    return () => {
      ativo = false
    }
  }, [params.produtoId])

  const columns: Column<EstoqueResponse['unidades'][number]>[] = [
    { key: 'codigo', header: 'Código', render: (u) => <code>{u.codigo}</code> },
    { key: 'status', header: 'Status', render: (u) => <StatusBadge status={u.status} /> },
    { key: 'criadoEm', header: 'Criado em', render: (u) => formatarData(u.criadoEm) },
    { key: 'vendaId', header: 'Venda', render: (u) => u.vendaId ?? '—' },
  ]

  if (!dados && !erro) return <Spinner label="Carregando estoque..." />

  if (erro && !dados) {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
        <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
        <p>{erro}</p>
      </div>
    )
  }

  if (!dados) return null

  return (
    <div>
      <h1 className="text-2xl font-bold text-fox-gray-dark mb-6">Estoque — {dados.produto.nome}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {CARDS.map(({ chave, label }) => (
          <div key={chave} className="bg-white border border-fox-accent rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-fox-gray-dark">{dados.resumo[chave]}</p>
            <p className="text-sm text-fox-gray-dark opacity-70">{label}</p>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={dados.unidades}
        rowKey={(u) => u.id}
        emptyMessage="Nenhuma unidade de estoque encontrada."
      />
    </div>
  )
}
