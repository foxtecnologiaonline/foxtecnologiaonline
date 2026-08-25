'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth, mensagemDeErro } from '@/lib/auth-context'
import { UserPlus } from 'lucide-react'

const schema = z.object({
  nome: z.string().min(2, 'Informe seu nome completo'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
})

type FormData = z.infer<typeof schema>

export default function RegistroPage() {
  const { registrar } = useAuth()
  const router = useRouter()
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setErro(null)
    setEnviando(true)
    try {
      await registrar(data.nome, data.email, data.senha)
      router.push('/minha-conta')
    } catch (err) {
      setErro(mensagemDeErro(err))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="container-fox px-6 py-16 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-fox-gray-dark mb-2">Criar conta</h1>
        <p className="text-fox-gray-dark opacity-70">Cadastre-se para comprar e acompanhar seus pedidos</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
            {erro}
          </div>
        )}

        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-fox-gray-dark mb-1">
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
            {...register('nome')}
            className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
          />
          {errors.nome && <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-fox-gray-dark mb-1">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-fox-gray-dark mb-1">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            {...register('senha')}
            className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
          />
          {errors.senha && <p className="text-red-600 text-sm mt-1">{errors.senha.message}</p>}
        </div>

        <button type="submit" disabled={enviando} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
          <UserPlus size={18} />
          {enviando ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>

      <p className="text-center text-sm text-fox-gray-dark opacity-70 mt-6">
        Já tem conta?{' '}
        <Link href="/login" className="text-fox-orange font-semibold hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  )
}
