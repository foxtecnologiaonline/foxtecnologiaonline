'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarPreco } from '@/lib/format'
import type { Venda } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import StatusBadge from '@/components/ui/StatusBadge'
import { AlertTriangle, ExternalLink, FlaskConical, RefreshCw } from 'lucide-react'

export default function CheckoutPage({ params }: { params: { vendaId: string } }) {
  const router = useRouter()
  const [venda, setVenda] = useState<Venda | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [atualizando, setAtualizando] = useState(false)
  const [simulando, setSimulando] = useState(false)

  const carregar = useCallback(async () => {
    try {
      const data = await api.get<Venda>(`/checkout/${params.vendaId}`, { auth: false })
      setVenda(data)
      setErro(null)
      if (data.status === 'aprovada') {
        router.push('/checkout/sucesso')
      }
      return data
    } catch (err) {
      setErro(mensagemDeErro(err))
      return null
    }
  }, [params.vendaId, router])

  useEffect(() => {
    carregar()
  }, [carregar])

  const onAtualizar = async () => {
    setAtualizando(true)
    await carregar()
    setAtualizando(false)
  }

  const onSimularPagamento = async () => {
    setSimulando(true)
    try {
      await api.post(`/checkout/webhook`, { vendaId: params.vendaId, status: 'aprovada' }, { auth: false })
      await carregar()
    } catch (err) {
      setErro(mensagemDeErro(err))
    } finally {
      setSimulando(false)
    }
  }

  if (!venda && !erro) return <Spinner label="Carregando pedido..." />

  if (erro && !venda) {
    return (
      <div className="container-fox px-6 py-16 max-w-lg mx-auto">
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      </div>
    )
  }

  if (!venda) return null

  return (
    <div className="container-fox px-6 py-16 max-w-lg">
      <h1 className="text-3xl font-bold text-fox-gray-dark mb-6">Finalizar compra</h1>

      <div className="bg-white border border-fox-accent rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-fox-gray-dark opacity-70">Status do pedido</span>
          <StatusBadge status={venda.status} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-fox-gray-dark opacity-70">Valor</span>
          <span className="text-2xl font-bold text-fox-orange">{formatarPreco(venda.valor)}</span>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
            {erro}
          </div>
        )}

        {venda.status !== 'aprovada' && (
          <div className="space-y-3 pt-2">
            <p className="text-sm text-fox-gray-dark opacity-70">
              Conclua o pagamento pelo link abaixo. Assim que for confirmado, esta página é
              atualizada automaticamente.
            </p>

            {venda.checkoutUrl && (
              <a
                href={venda.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Ir para pagamento
              </a>
            )}

            <button
              onClick={onAtualizar}
              disabled={atualizando}
              className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <RefreshCw size={18} className={atualizando ? 'animate-spin' : ''} />
              Verificar status
            </button>

            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={onSimularPagamento}
                disabled={simulando}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-yellow-500 text-yellow-700 rounded-lg font-semibold py-3 hover:bg-yellow-50 disabled:opacity-60"
              >
                <FlaskConical size={18} />
                {simulando ? 'Simulando...' : 'Simular pagamento aprovado (dev)'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
