'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError('')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem')
      }

      setSubmitSuccess(true)
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Erro ao enviar mensagem'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          ✗ {submitError}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-fox-gray-dark font-medium mb-2">
          Nome *
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="Seu nome completo"
          className="w-full px-4 py-2 border border-fox-accent rounded-lg focus:outline-none focus:border-fox-orange focus:ring-2 focus:ring-fox-orange focus:ring-opacity-20"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-fox-gray-dark font-medium mb-2">
          Email *
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="seu.email@exemplo.com"
          className="w-full px-4 py-2 border border-fox-accent rounded-lg focus:outline-none focus:border-fox-orange focus:ring-2 focus:ring-fox-orange focus:ring-opacity-20"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-fox-gray-dark font-medium mb-2">
          Celular/Telefone
        </label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="(34) 99143-9633"
          className="w-full px-4 py-2 border border-fox-accent rounded-lg focus:outline-none focus:border-fox-orange focus:ring-2 focus:ring-fox-orange focus:ring-opacity-20"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-fox-gray-dark font-medium mb-2">
          Mensagem *
        </label>
        <textarea
          {...register('message')}
          placeholder="Sua mensagem..."
          rows={5}
          className="w-full px-4 py-2 border border-fox-accent rounded-lg focus:outline-none focus:border-fox-orange focus:ring-2 focus:ring-fox-orange focus:ring-opacity-20 resize-none"
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Send size={20} />
        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
      </button>

      <p className="text-sm text-fox-gray-dark opacity-60">
        * Campos obrigatórios
      </p>
    </form>
  )
}
