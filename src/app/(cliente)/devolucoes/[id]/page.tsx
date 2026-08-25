'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarData } from '@/lib/format'
import type { Devolucao, StatusDevolucao } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import StatusBadge from '@/components/ui/StatusBadge'
import { AlertTriangle, CheckCircle2, Clock, XCircle } from 'lucide-react'

const EXPLICACOES: Record<StatusDevolucao, { icon: typeof Clock; texto: string; cor: string }> = {
  pendente: {
    icon: Clock,
    texto: 'Sua solicitação está em análise. Você será notificado assim que houver uma decisão.',
    cor: 'text-yellow-600',
  },
  aprovada_automatica: {
    icon: CheckCircle2,
    texto: 'Sua devolução foi aprovada automaticamente, dentro dos critérios da política de devolução.',
    cor: 'text-green-600',
  },
  aprovada_manual: {
    icon: CheckCircle2,
    texto: 'Sua devolução foi analisada e aprovada manualmente pela nossa equipe.',
    cor: 'text-green-600',
  },
  rejeitada: {
    icon: XCircle,
    texto: 'Sua solicitação de devolução foi analisada e não pôde ser aprovada.',
    cor: 'text-red-600',
  },
}

export default function DevolucaoDetalhePage({ params }: { params: { id: string } }) {
  const [devolucao, setDevolucao] = useState<Devolucao | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true
    api
      .get<Devolucao>(`/devolucoes/${params.id}`)
      .then((data) => {
        if (ativo) setDevolucao(data)
      })
      .catch((err) => {
        if (ativo) setErro(mensagemDeErro(err))
      })
    return () => {
      ativo = false
    }
  }, [params.id])

  if (!devolucao && !erro) return <Spinner label="Carregando devolução..." />

  if (erro && !devolucao) {
    return (
      <div className="container-fox px-6 py-16 max-w-lg mx-auto">
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      </div>
    )
  }

  if (!devolucao) return null

  const { icon: Icon, texto, cor } = EXPLICACOES[devolucao.status]

  return (
    <div className="container-fox px-6 py-16 max-w-lg">
      <h1 className="text-2xl font-bold text-fox-gray-dark mb-6">Status da devolução</h1>

      <div className="bg-white border border-fox-accent rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-fox-gray-dark opacity-70">Status</span>
          <StatusBadge status={devolucao.status} />
        </div>
        {devolucao.produto && (
          <div className="flex items-center justify-between">
            <span className="text-fox-gray-dark opacity-70">Produto</span>
            <span className="font-medium text-fox-gray-dark">{devolucao.produto.nome}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-fox-gray-dark opacity-70">Solicitada em</span>
          <span className="font-medium text-fox-gray-dark">{formatarData(devolucao.criadaEm)}</span>
        </div>
        <div>
          <span className="text-fox-gray-dark opacity-70 text-sm">Motivo informado</span>
          <p className="text-fox-gray-dark mt-1">{devolucao.motivo}</p>
        </div>

        <div className={`flex items-start gap-3 rounded-lg p-4 bg-fox-gray-light ${cor}`}>
          <Icon size={20} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm">{texto}</p>
        </div>
      </div>
    </div>
  )
}
