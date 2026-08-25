'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarPreco } from '@/lib/format'
import type { Produto } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import { AlertTriangle, ArrowRight } from 'lucide-react'

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true
    api
      .get<Produto[]>('/produtos', { auth: false })
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

  return (
    <div className="container-fox px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-fox-gray-dark mb-4">
          Nossa <span className="text-fox-orange">Loja</span>
        </h1>
        <p className="text-lg text-fox-gray-dark opacity-80">
          Ativos digitais prontos para compra e download imediato
        </p>
      </div>

      {!produtos && !erro && <Spinner label="Carregando produtos..." />}

      {erro && (
        <div className="max-w-lg mx-auto flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      )}

      {produtos && produtos.length === 0 && (
        <p className="text-center text-fox-gray-dark opacity-70">
          Nenhum produto disponível no momento.
        </p>
      )}

      {produtos && produtos.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtos.map((produto) => (
            <Link
              key={produto.id}
              href={`/produtos/${produto.id}`}
              className="group bg-white rounded-xl border border-fox-accent shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-fox-orange"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit bg-fox-gray-light text-fox-gray-dark">
                {produto.categoria}
              </span>
              <h2 className="text-xl font-bold text-fox-gray-dark mb-2">{produto.nome}</h2>
              <p className="text-fox-gray-dark opacity-75 mb-6 flex-grow line-clamp-3">
                {produto.descricao}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-fox-orange">
                  {formatarPreco(produto.preco)}
                </span>
                <span className="flex items-center gap-1 text-fox-orange font-semibold group-hover:gap-2 transition-all">
                  Ver <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
