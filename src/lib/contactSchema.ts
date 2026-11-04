import { z } from 'zod'
import { REQUEST_TYPES } from './constants'

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal('').transform(() => undefined))

export const contactSchema = z.object({
  name: z.string().trim().min(3, 'Informe seu nome (mín. 3 caracteres)').max(100),
  organization: optionalText(150),
  cnpj: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.replace(/\D/g, '').length === 14, 'CNPJ deve ter 14 dígitos'),
  email: z.string().trim().email('E-mail inválido'),
  phone: optionalText(30),
  requestType: z.enum(REQUEST_TYPES),
  message: z.string().trim().min(10, 'Conte um pouco mais (mín. 10 caracteres)').max(5000),
  // Honeypot anti-spam: humanos não preenchem.
  website: z.string().max(0).optional(),
})

export type ContactData = z.infer<typeof contactSchema>
