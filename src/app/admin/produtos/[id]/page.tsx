'use client'

import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import { mensagemDeErro } from '@/lib/auth-context'
import type { ConteudoProduto, Produto, TipoConteudo } from '@/lib/types'
import ProdutoForm, { type ProdutoFormData } from '@/components/admin/ProdutoForm'
import Spinner from '@/components/ui/Spinner'
import { useToast } from '@/components/ui/Toast'
import { AlertTriangle, FileText, Key, Link2, Upload } from 'lucide-react'

const conteudoSchema = z.object({
  titulo: z.string().min(2, 'Informe o título'),
  tipo: z.enum(['arquivo', 'chave', 'link']),
  ordem: z.coerce.number().int().nonnegative(),
  arquivo: z.custom<FileList>().refine((files) => files?.length === 1, 'Selecione um arquivo'),
})

type ConteudoFormData = z.infer<typeof conteudoSchema>

const iconePorTipo: Record<TipoConteudo, typeof FileText> = {
  arquivo: FileText,
  chave: Key,
  link: Link2,
}

export default function EditarProdutoPage({ params }: { params: { id: string } }) {
  const { showToast } = useToast()
  const [produto, setProduto] = useState<Produto | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [enviandoProduto, setEnviandoProduto] = useState(false)
  const [enviandoConteudo, setEnviandoConteudo] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConteudoFormData>({ resolver: zodResolver(conteudoSchema) })

  const carregar = useCallback(async () => {
    try {
      const data = await api.get<Produto>(`/produtos/${params.id}`)
      setProduto(data)
    } catch (err) {
      setErro(mensagemDeErro(err))
    }
  }, [params.id])

  useEffect(() => {
    carregar()
  }, [carregar])

  const onSubmitProduto = async (data: ProdutoFormData) => {
    setEnviandoProduto(true)
    try {
      const atualizado = await api.patch<Produto>(`/produtos/${params.id}`, data)
      setProduto((prev) => ({ ...atualizado, conteudos: prev?.conteudos }))
      showToast('Produto atualizado com sucesso')
    } catch (err) {
      showToast(mensagemDeErro(err), 'erro')
    } finally {
      setEnviandoProduto(false)
    }
  }

  const onSubmitConteudo = async (data: ConteudoFormData) => {
    setEnviandoConteudo(true)
    try {
      const formData = new FormData()
      formData.append('arquivo', data.arquivo[0])
      formData.append('tipo', data.tipo)
      formData.append('titulo', data.titulo)
      formData.append('ordem', String(data.ordem))

      const conteudo = await api.postForm<ConteudoProduto>(`/produtos/${params.id}/conteudos`, formData)
      setProduto((prev) => (prev ? { ...prev, conteudos: [...(prev.conteudos ?? []), conteudo] } : prev))
      showToast('Conteúdo enviado com sucesso')
      reset()
    } catch (err) {
      showToast(mensagemDeErro(err), 'erro')
    } finally {
      setEnviandoConteudo(false)
    }
  }

  if (!produto && !erro) return <Spinner label="Carregando produto..." />

  if (erro && !produto) {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
        <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
        <p>{erro}</p>
      </div>
    )
  }

  if (!produto) return null

  return (
    <div>
      <h1 className="text-2xl font-bold text-fox-gray-dark mb-6">Editar produto</h1>

      <ProdutoForm
        defaultValues={produto}
        onSubmit={onSubmitProduto}
        enviando={enviandoProduto}
        labelBotao="Salvar alterações"
      />

      <hr className="my-10 border-fox-accent max-w-xl" />

      <h2 className="text-xl font-bold text-fox-gray-dark mb-4">Conteúdos</h2>

      {produto.conteudos && produto.conteudos.length > 0 ? (
        <ul className="space-y-2 max-w-xl mb-8">
          {[...produto.conteudos]
            .sort((a, b) => a.ordem - b.ordem)
            .map((conteudo) => {
              const Icon = iconePorTipo[conteudo.tipo]
              return (
                <li key={conteudo.id} className="flex items-center gap-3 bg-fox-gray-light rounded-lg px-4 py-3">
                  <Icon size={18} className="text-fox-orange flex-shrink-0" />
                  <span className="text-fox-gray-dark">{conteudo.titulo}</span>
                  <span className="text-xs text-fox-gray-dark opacity-60 ml-auto">ordem {conteudo.ordem}</span>
                </li>
              )
            })}
        </ul>
      ) : (
        <p className="text-fox-gray-dark opacity-70 mb-8">Nenhum conteúdo vinculado ainda.</p>
      )}

      <h3 className="text-lg font-bold text-fox-gray-dark mb-3">Enviar novo conteúdo</h3>
      <form onSubmit={handleSubmit(onSubmitConteudo)} className="space-y-4 max-w-xl">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-fox-gray-dark mb-1">
            Título
          </label>
          <input
            id="titulo"
            type="text"
            {...register('titulo')}
            className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
          />
          {errors.titulo && <p className="text-red-600 text-sm mt-1">{errors.titulo.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-fox-gray-dark mb-1">
              Tipo
            </label>
            <select
              id="tipo"
              {...register('tipo')}
              className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
            >
              <option value="arquivo">arquivo</option>
              <option value="chave">chave</option>
              <option value="link">link</option>
            </select>
          </div>

          <div>
            <label htmlFor="ordem" className="block text-sm font-medium text-fox-gray-dark mb-1">
              Ordem
            </label>
            <input
              id="ordem"
              type="number"
              min="0"
              defaultValue={0}
              {...register('ordem')}
              className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
            />
          </div>
        </div>

        <div>
          <label htmlFor="arquivo" className="block text-sm font-medium text-fox-gray-dark mb-1">
            Arquivo
          </label>
          <input
            id="arquivo"
            type="file"
            {...register('arquivo')}
            className="w-full border border-fox-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fox-orange"
          />
          {errors.arquivo && (
            <p className="text-red-600 text-sm mt-1">{errors.arquivo.message as string}</p>
          )}
        </div>

        <button type="submit" disabled={enviandoConteudo} className="btn-primary flex items-center gap-2 disabled:opacity-60">
          <Upload size={18} />
          {enviandoConteudo ? 'Enviando...' : 'Enviar conteúdo'}
        </button>
      </form>
    </div>
  )
}
