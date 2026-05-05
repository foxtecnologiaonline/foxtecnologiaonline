import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.ZOHO_SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
})

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to,
      subject,
      html,
    })

    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Falha ao enviar email')
  }
}

export function generateContactEmailHTML(data: {
  name: string
  email: string
  phone?: string
  message: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FF7A00; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background-color: #f5f5f5; padding: 20px; border-radius: 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #FF7A00; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nova Mensagem de Contato</h2>
            <p>Você recebeu uma nova mensagem do formulário de contato do site FOX tecnologIA</p>
          </div>

          <div class="content">
            <div class="field">
              <span class="label">Nome:</span>
              <p>${escapeHtml(data.name)}</p>
            </div>

            <div class="field">
              <span class="label">Email:</span>
              <p>${escapeHtml(data.email)}</p>
            </div>

            ${data.phone ? `
            <div class="field">
              <span class="label">Telefone/Celular:</span>
              <p>${escapeHtml(data.phone)}</p>
            </div>
            ` : ''}

            <div class="field">
              <span class="label">Mensagem:</span>
              <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
            </div>
          </div>

          <div class="footer">
            <p>Este email foi enviado automaticamente. Responda diretamente a ${escapeHtml(data.email)} para se comunicar com o remetente.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function generateReplyEmailHTML(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FF7A00; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
          .content { background-color: #f5f5f5; padding: 20px; border-radius: 8px; line-height: 1.6; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
          a { color: #FF7A00; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>FOX tecnologIA</h2>
            <p>Obrigado por nos contatar!</p>
          </div>

          <div class="content">
            <p>Olá ${escapeHtml(name)},</p>

            <p>Muito obrigado por sua mensagem! Recebemos seu contato com sucesso.</p>

            <p>Nossa equipe analisará sua mensagem e entrará em contato com você em breve, preferencialmente dentro de 24 horas.</p>

            <p>Se você tiver alguma dúvida urgente, não hesite em nos ligar para:</p>
            <p><strong>+55 (34) 99143-9633</strong></p>

            <p>Atenciosamente,<br>
            <strong>Equipe FOX tecnologIA</strong></p>
          </div>

          <div class="footer">
            <p><a href="https://www.foxtecnologia.online">www.foxtecnologia.online</a></p>
            <p>&copy; 2024 FOX tecnologIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
