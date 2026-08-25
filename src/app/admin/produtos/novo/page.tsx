'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import type { Produto } from '@/lib/types'
import ProdutoForm, { type ProdutoFormData } from '@/components/admin/ProdutoForm'
import { useToast } from '@/components/ui/Toast'

export default function NovoProdutoPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const onSubmit = async (data: ProdutoFormData) => {
    setEnviando(true)
    setErro(null)
    try {
      const produto = await api.post<Produto>('/produtos', data)
      showToast('Produto criado com sucesso')
      router.push(`/admin/produtos/${produto.id}`)
    } catch (err) {
      setErro(mensagemDeErro(err))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-fox-gray-dark mb-6">Novo produto</h1>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm mb-4 max-w-xl">
          {erro}
        </div>
      )}

      <ProdutoForm onSubmit={onSubmit} enviando={enviando} labelBotao="Criar produto" />
    </div>
  )
}
