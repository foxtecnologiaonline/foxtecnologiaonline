'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarData } from '@/lib/format'
import type { Reabastecimento } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import DataTable, { type Column } from '@/components/ui/DataTable'
import { AlertTriangle } from 'lucide-react'

export default function AdminReabastecimentosPage() {
  const [reabastecimentos, setReabastecimentos] = useState<Reabastecimento[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true
    api
      .get<Reabastecimento[]>('/admin/reabastecimentos')
      .then((data) => {
        if (ativo) setReabastecimentos(data)
      })
      .catch((err) => {
        if (ativo) setErro(mensagemDeErro(err))
      })
    return () => {
      ativo = false
    }
  }, [])

  const columns: Column<Reabastecimento>[] = [
    { key: 'produto', header: 'Produto', render: (r) => r.produto?.nome ?? r.produtoId },
    { key: 'quantidadeGerada', header: 'Qtd. gerada', render: (r) => r.quantidadeGerada },
    { key: 'estoqueAntes', header: 'Estoque antes', render: (r) => r.estoqueAntes },
    { key: 'data', header: 'Data', render: (r) => formatarData(r.criadoEm) },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-fox-gray-dark mb-6">Reabastecimentos</h1>

      {!reabastecimentos && !erro && <Spinner label="Carregando reabastecimentos..." />}

      {erro && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      )}

      {reabastecimentos && (
        <DataTable
          columns={columns}
          rows={reabastecimentos}
          rowKey={(r) => r.id}
          emptyMessage="Nenhum reabastecimento registrado ainda."
        />
      )}
    </div>
  )
}
