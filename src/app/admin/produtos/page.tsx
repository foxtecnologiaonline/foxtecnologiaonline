'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarPreco } from '@/lib/format'
import type { Produto } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import StatusBadge from '@/components/ui/StatusBadge'
import DataTable, { type Column } from '@/components/ui/DataTable'
import { AlertTriangle, Boxes, Pencil, Plus } from 'lucide-react'

export default function AdminProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true
    api
      .get<Produto[]>('/produtos?admin=true')
      .then((data) => {
        if (ativo) setProdutos(data)
      })
      .catch((err) => {
        if (ativo) setErro(mensagemDeErro(err))
      })
    return () => {
      ativo = false
    }
  }, [])

  const columns: Column<Produto>[] = [
    { key: 'nome', header: 'Nome', render: (p) => <span className="font-medium">{p.nome}</span> },
    { key: 'categoria', header: 'Categoria', render: (p) => p.categoria },
    { key: 'preco', header: 'Preço', render: (p) => formatarPreco(p.preco) },
    { key: 'status', header: 'Status', render: (p) => <StatusBadge status={p.status} /> },
    {
      key: 'acoes',
      header: 'Ações',
      render: (p) => (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/produtos/${p.id}`}
            className="flex items-center gap-1 text-fox-orange font-semibold hover:underline w-fit"
          >
            <Pencil size={16} />
            Editar
          </Link>
          <Link
            href={`/admin/estoque/${p.id}`}
            className="flex items-center gap-1 text-fox-gray-dark font-semibold hover:underline w-fit"
          >
            <Boxes size={16} />
            Estoque
          </Link>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-fox-gray-dark">Produtos</h1>
        <Link href="/admin/produtos/novo" className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Novo produto
        </Link>
      </div>

      {!produtos && !erro && <Spinner label="Carregando produtos..." />}

      {erro && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      )}

      {produtos && (
        <DataTable
          columns={columns}
          rows={produtos}
          rowKey={(p) => p.id}
          emptyMessage="Nenhum produto cadastrado ainda."
        />
      )}
    </div>
  )
}
