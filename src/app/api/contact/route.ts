import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail, generateContactEmailHTML, generateReplyEmailHTML } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(5000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate data
    const validatedData = contactSchema.parse(body)

    // Send email to admin
    const adminEmail = process.env.ZOHO_EMAIL || 'contato@foxtecnologia.online'
    await sendEmail({
      to: adminEmail,
      subject: `[Novo Contato] ${validatedData.name}`,
      html: generateContactEmailHTML(validatedData),
    })

    // Send reply email to user
    await sendEmail({
      to: validatedData.email,
      subject: 'FOX tecnologIA - Recebemos seu contato',
      html: generateReplyEmailHTML(validatedData.name),
    })

    return NextResponse.json(
      { success: true, message: 'Mensagem enviada com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Dados inválidos' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Erro ao enviar mensagem' },
      { status: 500 }
    )
  }
}
