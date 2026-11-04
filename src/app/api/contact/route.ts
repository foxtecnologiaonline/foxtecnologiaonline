import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail, generateContactEmailHTML, generateReplyEmailHTML } from '@/lib/email'
import { contactSchema } from '@/lib/contactSchema'
import { COMPANY } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const data = contactSchema.parse(await request.json())

    // Honeypot preenchido: finge sucesso e descarta.
    if (data.website) return NextResponse.json({ success: true })

    const adminEmail = process.env.ZOHO_EMAIL || COMPANY.email
    const who = data.organization ? `${data.organization} — ${data.name}` : data.name
    await sendEmail({
      to: adminEmail,
      subject: `[${data.requestType}] ${who}`,
      html: generateContactEmailHTML(data),
      replyTo: data.email,
    })

    await sendEmail({
      to: data.email,
      subject: 'FOX tecnologIA - Recebemos sua solicitação',
      html: generateReplyEmailHTML(data.name),
    })

    return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso' })
  } catch (error) {
    console.error('Contact form error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Dados inválidos' }, { status: 400 })
    }
    return NextResponse.json({ success: false, message: 'Erro ao enviar mensagem' }, { status: 500 })
  }
}
