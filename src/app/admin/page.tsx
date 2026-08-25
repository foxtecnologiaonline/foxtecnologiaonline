'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import type { Devolucao, Produto, Venda } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import { AlertTriangle, Package, ShoppingCart, Undo2 } from 'lucide-react'

interface Kpis {
  produtosAtivos: number
  vendasConfirmadas: number
  filaRevisaoManual: number
}

const CARDS = [
  { key: 'produtosAtivos', label: 'Produtos ativos', icon: Package, href: '/admin/produtos' },
  { key: 'vendasConfirmadas', label: 'Vendas confirmadas', icon: ShoppingCart, href: '/admin/vendas' },
  { key: 'filaRevisaoManual', label: 'Devoluções em revisão', icon: Undo2, href: '/admin/devolucoes' },
] as const

export default function AdminDashboardPage() {
  const [kpis, setKpis] = useState<Kpis | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true

    Promise.all([
      api.get<Produto[]>('/produtos?admin=true'),
      api.get<Venda[]>('/admin/vendas'),
      api.get<Devolucao[]>('/admin/devolucoes/revisao-manual'),
    ])
      .then(([produtos, vendas, devolucoes]) => {
        if (!ativo) return
        setKpis({
          produtosAtivos: produtos.filter((p) => p.status === 'ativo').length,
          vendasConfirmadas: vendas.filter((v) => v.status === 'aprovada').length,
          filaRevisaoManual: devolucoes.length,
        })
      })
      .catch((err) => {
        if (ativo) setErro(mensagemDeErro(err))
      })

    return () => {
      ativo = false
    }
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-fox-gray-dark mb-6">Dashboard</h1>

      {!kpis && !erro && <Spinner label="Carregando indicadores..." />}

      {erro && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      )}

      {kpis && (
        <div className="grid sm:grid-cols-3 gap-6">
          {CARDS.map(({ key, label, icon: Icon, href }) => (
            <Link
              key={key}
              href={href}
              className="bg-white border border-fox-accent rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Icon className="text-fox-orange mb-3" size={28} />
              <p className="text-3xl font-bold text-fox-gray-dark">{kpis[key]}</p>
              <p className="text-sm text-fox-gray-dark opacity-70">{label}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
