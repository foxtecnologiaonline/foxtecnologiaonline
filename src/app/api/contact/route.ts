import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, generateContactEmailHTML, generateReplyEmailHTML } from '@/lib/email'
import { contactSchema } from '@/lib/contactSchema'
import { COMPANY } from '@/lib/constants'

// Limite simples por IP (por instância): evita que o formulário seja usado
// para disparar e-mails de confirmação em massa para terceiros.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

const json = (status: number, message: string) =>
  NextResponse.json({ success: status < 400, message }, { status })

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (rateLimited(ip)) return json(429, 'Muitas solicitações. Tente novamente em alguns minutos.')

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json(400, 'Dados inválidos')
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) return json(400, 'Dados inválidos')
  const data = parsed.data

  // Honeypot preenchido: robô. Finge sucesso e descarta.
  if (data.website) return json(200, 'Mensagem enviada com sucesso')

  const who = data.organization ? `${data.organization} — ${data.name}` : data.name
  try {
    await sendEmail({
      to: process.env.ZOHO_EMAIL || COMPANY.email,
      subject: `[${data.requestType}] ${who}`,
      html: generateContactEmailHTML(data),
      replyTo: data.email,
    })
  } catch (error) {
    console.error('Contact form error (admin email):', error)
    return json(500, 'Erro ao enviar mensagem')
  }

  // Confirmação ao remetente é "melhor esforço": a solicitação já chegou à FOX,
  // então uma falha aqui não deve fazer o usuário reenviar (duplicando a cotação).
  try {
    await sendEmail({
      to: data.email,
      subject: 'FOX tecnologIA - Recebemos sua solicitação',
      html: generateReplyEmailHTML(data.name),
    })
  } catch (error) {
    console.error('Contact form error (confirmation email):', error)
  }

  return json(200, 'Mensagem enviada com sucesso')
}
