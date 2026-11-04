'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { contactSchema, type ContactData } from '@/lib/contactSchema'
import { REQUEST_TYPES, whatsappLink } from '@/lib/constants'

type RequestType = (typeof REQUEST_TYPES)[number]

export default function QuoteForm({ defaultType = REQUEST_TYPES[0] }: { defaultType?: RequestType }) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { requestType: defaultType },
  })

  const onSubmit = async (data: ContactData) => {
    setStatus('idle')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('ok')
      reset({ requestType: data.requestType })
    } catch {
      setStatus('error')
    }
  }

  const err = (msg?: string) => msg && <p className="mt-1.5 text-[13px] text-red-400">{msg}</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-3">
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register('website')} />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">Nome</label>
          <input id="name" className="field" placeholder="Seu nome *" autoComplete="name" {...register('name')} />
          {err(errors.name?.message)}
        </div>
        <div>
          <label htmlFor="organization" className="sr-only">Órgão ou empresa</label>
          <input id="organization" className="field" placeholder="Órgão / empresa" autoComplete="organization" {...register('organization')} />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="sr-only">E-mail</label>
          <input id="email" type="email" className="field" placeholder="E-mail *" autoComplete="email" {...register('email')} />
          {err(errors.email?.message)}
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Telefone</label>
          <input id="phone" type="tel" className="field" placeholder="Telefone / WhatsApp" autoComplete="tel" {...register('phone')} />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="cnpj" className="sr-only">CNPJ</label>
          <input id="cnpj" inputMode="numeric" className="field" placeholder="CNPJ (opcional)" {...register('cnpj')} />
          {err(errors.cnpj?.message)}
        </div>
        <div>
          <label htmlFor="requestType" className="sr-only">Tipo de solicitação</label>
          <select id="requestType" className="field" {...register('requestType')}>
            {REQUEST_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Mensagem</label>
        <textarea id="message" rows={5} className="field resize-y" placeholder="Itens, quantidades, prazo ou link do edital *" {...register('message')} />
        {err(errors.message?.message)}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        <Send size={18} />
        {isSubmitting ? 'Enviando…' : 'Enviar solicitação'}
      </button>

      <div aria-live="polite">
        {status === 'ok' && (
          <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            Recebemos sua solicitação! Você também vai receber uma confirmação por e-mail.
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            Não foi possível enviar agora.{' '}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Fale com a gente pelo WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    </form>
  )
}
