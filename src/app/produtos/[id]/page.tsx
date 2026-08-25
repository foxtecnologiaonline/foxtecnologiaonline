'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import { useAuth, mensagemDeErro } from '@/lib/auth-context'
import { formatarPreco } from '@/lib/format'
import type { CheckoutResponse, Produto } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import { AlertTriangle, FileText, Key, Link2, ShoppingCart } from 'lucide-react'

const emailSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

type EmailForm = z.infer<typeof emailSchema>

const iconePorTipo = {
  arquivo: FileText,
  chave: Key,
  link: Link2,
}

export default function ProdutoDetalhePage({ params }: { params: { id: string } }) {
  const { usuario } = useAuth()
  const router = useRouter()
  const [produto, setProduto] = useState<Produto | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [mostrarFormEmail, setMostrarFormEmail] = useState(false)
  const [comprando, setComprando] = useState(false)
  const [erroCompra, setErroCompra] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({ resolver: zodResolver(emailSchema) })

  useEffect(() => {
    let ativo = true
    api
      .get<Produto>(`/produtos/${params.id}`, { auth: false })
      .then((data) => {
        if (ativo) setProduto(data)
      })
      .catch((err) => {
        if (ativo) setErro(mensagemDeErro(err))
      })
    return () => {
      ativo = false
    }
  }, [params.id])

  const iniciarCheckout = async (email?: string) => {
    setErroCompra(null)
    setComprando(true)
    try {
      const data = await api.post<CheckoutResponse>(
        '/checkout',
        { produtoId: params.id, email },
        { auth: !!usuario }
      )
      router.push(`/checkout/${data.vendaId}`)
    } catch (err) {
      setErroCompra(mensagemDeErro(err))
    } finally {
      setComprando(false)
    }
  }

  const onComprarClick = () => {
    if (usuario) {
      iniciarCheckout()
    } else {
      setMostrarFormEmail(true)
    }
  }

  const onSubmitEmail = (data: EmailForm) => iniciarCheckout(data.email)

  if (!produto && !erro) return <Spinner label="Carregando produto..." />

  if (erro) {
    return (
      <div className="container-fox px-6 py-16 max-w-lg mx-auto">
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{erro}</p>
        </div>
      </div>
    )
  }

  if (!produto) return null

  return (
    <div className="container-fox px-6 py-16 max-w-3xl">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-fox-gray-light text-fox-gray-dark">
        {produto.categoria}
      </span>
      <h1 className="text-3xl md:text-4xl font-bold text-fox-gray-dark mb-4">{produto.nome}</h1>
      <p className="text-lg text-fox-gray-dark opacity-80 mb-6 whitespace-pre-line">
        {produto.descricao}
      </p>

      {produto.conteudos && produto.conteudos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-fox-gray-dark mb-3">O que está incluso</h2>
          <ul className="space-y-2">
            {[...produto.conteudos]
              .sort((a, b) => a.ordem - b.ordem)
              .map((conteudo) => {
                const Icon = iconePorTipo[conteudo.tipo]
                return (
                  <li
                    key={conteudo.id}
                    className="flex items-center gap-3 bg-fox-gray-light rounded-lg px-4 py-3"
                  >
                    <Icon size={18} className="text-fox-orange flex-shrink-0" />
                    <span className="text-fox-gray-dark">{conteudo.titulo}</span>
                  </li>
                )
              })}
          </ul>
        </div>
      )}

      <div className="bg-white border border-fox-accent rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-fox-gray-dark opacity-70">Preço</span>
          <span className="text-3xl font-bold text-fox-orange">{formatarPreco(produto.preco)}</span>
        </div>

        {erroCompra && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm mb-4">
            {erroCompra}
          </div>
        )}

        {!mostrarFormEmail && (
          <button
            onClick={onComprarClick}
            disabled={comprando}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <ShoppingCart size={18} />
            {comprando ? 'Processando...' : 'Comprar'}
          </button>
        )}

        {mostrarFormEmail && (
          <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-fox-gray-dark mb-1">
                Informe seu e-mail para continuar
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <button
              type="submit"
              disabled={comprando}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <ShoppingCart size={18} />
              {comprando ? 'Processando...' : 'Continuar para pagamento'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
