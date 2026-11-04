import { Mail, MessageCircle, MapPin } from 'lucide-react'
import { COMPANY, REQUEST_TYPES, whatsappLink } from '@/lib/constants'
import QuoteForm from './QuoteForm'

export default function ContactBlock({
  title,
  subtitle = 'Envie o edital, o termo de referência ou a lista de itens. Retornamos com análise e proposta.',
  defaultType,
  headingAs: Heading = 'h2',
}: {
  title: React.ReactNode
  subtitle?: string
  defaultType?: (typeof REQUEST_TYPES)[number]
  headingAs?: 'h1' | 'h2'
}) {
  return (
    <div className="grid gap-12 rounded-[30px] border border-ink-700 bg-ink-800 bg-[radial-gradient(circle_at_0%_0%,rgba(255,122,0,0.22),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(255,181,71,0.12),transparent_50%)] px-5 py-8 sm:p-10 md:grid-cols-2 md:p-16">
      <div>
        <span className="label-chip mb-5">Contato</span>
        <Heading className="mb-4 text-[clamp(30px,4vw,48px)] font-bold leading-[1.1]">{title}</Heading>
        <p className="text-[17px] text-ink-300">{subtitle}</p>
        <ul className="mt-8 grid gap-3 text-[15px] text-ink-200">
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-ink-100">
              <MessageCircle size={18} className="text-fox-orange" /> {COMPANY.phone} · WhatsApp
            </a>
          </li>
          <li>
            <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2.5 hover:text-ink-100">
              <Mail size={18} className="text-fox-orange" /> {COMPANY.email}
            </a>
          </li>
          <li className="inline-flex items-center gap-2.5">
            <MapPin size={18} className="text-fox-orange" /> {COMPANY.coverage}
          </li>
        </ul>
        <a href={whatsappLink('Olá! Gostaria de uma cotação.')} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8">
          <MessageCircle size={18} /> Chamar no WhatsApp
        </a>
      </div>
      <QuoteForm defaultType={defaultType} />
    </div>
  )
}
