'use client'

import { useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarData } from '@/lib/format'
import type { Devolucao } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import { useToast } from '@/components/ui/Toast'
import { AlertTriangle, Check, X } from 'lucide-react'

export default function AdminDevolucoesPage() {
  const { showToast } = useToast()
  const [devolucoes, setDevolucoes] = useState<Devolucao[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [processando, setProcessando] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    try {
      const data = await api.get<Devolucao[]>('/admin/devolucoes/revisao-manual')
      setDevolucoes(data)
    } catch (err) {
      setErro(mensagemDeErro(err))
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  const decidir = async (id: string, decisao: 'aprovar' | 'rejeitar') => {
    setProcessando(id)
    try {
      await api.patch(`/admin/devolucoes/${id}/${decisao}`)
      showToast(decisao === 'aprovar' ? 'Devolução aprovada' : 'Devolução rejeitada')
      setDevolucoes((prev) => prev?.filter((d) => d.id !== id) ?? null)
    } catch (err) {
      showToast(mensagemDeErro(err), 'erro')
    } finally {
      setProcessando(null)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-fox-gray-dark mb-6">Fila de revisão manual</h1>

      {!devolucoes && !erro && <Spinner label="Carregando devoluções..." />}

      {erro && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      )}

      {devolucoes && devolucoes.length === 0 && (
        <p className="text-fox-gray-dark opacity-70">Nenhuma devolução aguardando revisão manual.</p>
      )}

      {devolucoes && devolucoes.length > 0 && (
        <div className="space-y-4">
          {devolucoes.map((devolucao) => (
            <div key={devolucao.id} className="bg-white border border-fox-accent rounded-xl p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-bold text-fox-gray-dark">
                    {devolucao.produto?.nome ?? `Venda ${devolucao.vendaId}`}
                  </p>
                  <p className="text-sm text-fox-gray-dark opacity-60">{formatarData(devolucao.criadaEm)}</p>
                </div>
              </div>
              <p className="text-fox-gray-dark mb-4">{devolucao.motivo}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => decidir(devolucao.id, 'aprovar')}
                  disabled={processando === devolucao.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-60"
                >
                  <Check size={18} />
                  Aprovar
                </button>
                <button
                  onClick={() => decidir(devolucao.id, 'rejeitar')}
                  disabled={processando === devolucao.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
                >
                  <X size={18} />
                  Rejeitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
