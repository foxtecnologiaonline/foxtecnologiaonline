'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { StatusProduto } from '@/lib/types'

export const produtoSchema = z.object({
  nome: z.string().min(2, 'Informe o nome do produto'),
  descricao: z.string().min(10, 'Descreva o produto com pelo menos 10 caracteres'),
  preco: z.coerce.number().positive('O preço deve ser maior que zero'),
  categoria: z.string().min(2, 'Informe a categoria'),
  status: z.enum(['ativo', 'inativo', 'rascunho']),
  estoqueLotePadrao: z.coerce.number().int().nonnegative().optional(),
  limiarReabastecimento: z.coerce.number().int().nonnegative().optional(),
})

export type ProdutoFormData = z.infer<typeof produtoSchema>

const STATUS_OPTIONS: StatusProduto[] = ['ativo', 'inativo', 'rascunho']

interface ProdutoFormProps {
  defaultValues?: Partial<ProdutoFormData>
  onSubmit: (data: ProdutoFormData) => Promise<void>
  enviando: boolean
  labelBotao: string
}

export default function ProdutoForm({ defaultValues, onSubmit, enviando, labelBotao }: ProdutoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: { status: 'rascunho', ...defaultValues },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-fox-gray-dark mb-1">
          Nome
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
        <label htmlFor="descricao" className="block text-sm font-medium text-fox-gray-dark mb-1">
          Descrição
        </label>
        <textarea
          id="descricao"
          rows={4}
          {...register('descricao')}
          className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
        />
        {errors.descricao && <p className="text-red-600 text-sm mt-1">{errors.descricao.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preco" className="block text-sm font-medium text-fox-gray-dark mb-1">
            Preço (R$)
          </label>
          <input
            id="preco"
            type="number"
            step="0.01"
            min="0"
            {...register('preco')}
            className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
          />
          {errors.preco && <p className="text-red-600 text-sm mt-1">{errors.preco.message}</p>}
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-fox-gray-dark mb-1">
            Categoria
          </label>
          <input
            id="categoria"
            type="text"
            {...register('categoria')}
            className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
          />
          {errors.categoria && <p className="text-red-600 text-sm mt-1">{errors.categoria.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-fox-gray-dark mb-1">
          Status
        </label>
        <select
          id="status"
          {...register('status')}
          className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="estoqueLotePadrao" className="block text-sm font-medium text-fox-gray-dark mb-1">
            Estoque por lote padrão
          </label>
          <input
            id="estoqueLotePadrao"
            type="number"
            min="0"
            {...register('estoqueLotePadrao')}
            className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
          />
        </div>

        <div>
          <label htmlFor="limiarReabastecimento" className="block text-sm font-medium text-fox-gray-dark mb-1">
            Limiar de reabastecimento
          </label>
          <input
            id="limiarReabastecimento"
            type="number"
            min="0"
            {...register('limiarReabastecimento')}
            className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
          />
        </div>
      </div>

      <button type="submit" disabled={enviando} className="btn-primary disabled:opacity-60">
        {enviando ? 'Salvando...' : labelBotao}
      </button>
    </form>
  )
}
