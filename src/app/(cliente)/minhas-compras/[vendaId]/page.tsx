'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import { formatarData } from '@/lib/format'
import type { Compra, Devolucao } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import StatusBadge from '@/components/ui/StatusBadge'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { AlertTriangle, Download, ExternalLink, Undo2 } from 'lucide-react'

const schema = z.object({
  motivo: z.string().min(10, 'Descreva o motivo com pelo menos 10 caracteres'),
})

type FormData = z.infer<typeof schema>

export default function CompraDetalhePage({ params }: { params: { vendaId: string } }) {
  const router = useRouter()
  const { showToast } = useToast()
  const [compra, setCompra] = useState<Compra | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    let ativo = true
    api
      .get<Compra>(`/minhas-compras/${params.vendaId}`)
      .then((data) => {
        if (ativo) setCompra(data)
      })
      .catch((err) => {
        if (ativo) setErro(mensagemDeErro(err))
      })
    return () => {
      ativo = false
    }
  }, [params.vendaId])

  const onSubmit = async (data: FormData) => {
    setEnviando(true)
    try {
      const devolucao = await api.post<Devolucao>('/devolucoes', {
        vendaId: params.vendaId,
        motivo: data.motivo,
      })
      showToast('Devolução solicitada com sucesso')
      router.push(`/devolucoes/${devolucao.id}`)
    } catch (err) {
      showToast(mensagemDeErro(err), 'erro')
    } finally {
      setEnviando(false)
    }
  }

  if (!compra && !erro) return <Spinner label="Carregando compra..." />

  if (erro && !compra) {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
        <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
        <p>{erro}</p>
      </div>
    )
  }

  if (!compra) return null

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-fox-gray-dark">{compra.produto.nome}</h1>
          <p className="text-sm text-fox-gray-dark opacity-60">{formatarData(compra.data)}</p>
        </div>
        <StatusBadge status={compra.status} />
      </div>

      {compra.codigo && (
        <p className="text-sm text-fox-gray-dark opacity-70 mb-4">
          Código/chave: <code className="bg-fox-gray-light px-1.5 py-0.5 rounded">{compra.codigo}</code>
        </p>
      )}

      {compra.conteudos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-fox-gray-dark mb-3">Conteúdos</h2>
          <ul className="space-y-2">
            {compra.conteudos.map((conteudo) => (
              <li key={conteudo.id} className="flex items-center justify-between gap-3 bg-fox-gray-light rounded-lg px-4 py-3">
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
        </div>
      )}

      <button onClick={() => setModalAberto(true)} className="btn-secondary flex items-center gap-2">
        <Undo2 size={18} />
        Solicitar devolução
      </button>

      {modalAberto && (
        <Modal title="Solicitar devolução" onClose={() => setModalAberto(false)}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="motivo" className="block text-sm font-medium text-fox-gray-dark mb-1">
                Motivo
              </label>
              <textarea
                id="motivo"
                rows={4}
                {...register('motivo')}
                className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
              />
              {errors.motivo && <p className="text-red-600 text-sm mt-1">{errors.motivo.message}</p>}
            </div>
            <button type="submit" disabled={enviando} className="btn-primary w-full disabled:opacity-60">
              {enviando ? 'Enviando...' : 'Enviar solicitação'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}
