'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarData } from '@/lib/format'
import type { Compra } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import StatusBadge from '@/components/ui/StatusBadge'
import { AlertTriangle, Download, ExternalLink } from 'lucide-react'

export default function MinhasComprasPage() {
  const [compras, setCompras] = useState<Compra[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true
    api
      .get<Compra[]>('/minhas-compras')
      .then((data) => {
        if (ativo) setCompras(data)
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
      <h1 className="text-2xl font-bold text-fox-gray-dark mb-6">Minhas compras</h1>

      {!compras && !erro && <Spinner label="Carregando compras..." />}

      {erro && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      )}

      {compras && compras.length === 0 && (
        <p className="text-fox-gray-dark opacity-70">Você ainda não fez nenhuma compra.</p>
      )}

      {compras && compras.length > 0 && (
        <div className="space-y-4">
          {compras.map((compra) => (
            <div key={compra.vendaId} className="bg-white border border-fox-accent rounded-xl p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <Link
                    href={`/minhas-compras/${compra.vendaId}`}
                    className="font-bold text-fox-gray-dark hover:text-fox-orange"
                  >
                    {compra.produto.nome}
                  </Link>
                  <p className="text-sm text-fox-gray-dark opacity-60">{formatarData(compra.data)}</p>
                  {compra.codigo && (
                    <p className="text-sm text-fox-gray-dark opacity-70 mt-1">
                      Código/chave: <code className="bg-fox-gray-light px-1.5 py-0.5 rounded">{compra.codigo}</code>
                    </p>
                  )}
                </div>
                <StatusBadge status={compra.status} />
              </div>

              {compra.conteudos.length > 0 && (
                <ul className="space-y-2">
                  {compra.conteudos.map((conteudo) => (
                    <li key={conteudo.id} className="flex items-center justify-between gap-3 bg-fox-gray-light rounded-lg px-4 py-2">
                      <span className="text-sm text-fox-gray-dark">{conteudo.titulo}</span>
                      <a
                        href={conteudo.urlAssinada}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-fox-orange text-sm font-semibold hover:underline"
                      >
                        {conteudo.tipo === 'link' ? <ExternalLink size={16} /> : <Download size={16} />}
                        {conteudo.tipo === 'link' ? 'Acessar' : 'Baixar'}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
