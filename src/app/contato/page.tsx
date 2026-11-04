import type { Metadata } from 'next'
import ContactBlock from '@/components/ContactBlock'

export const metadata: Metadata = {
  title: 'Contato e cotações',
  description: 'Solicite uma cotação ou proposta: licenças de software, IA e sistemas de gestão para órgãos públicos e empresas.',
  alternates: { canonical: '/contato' },
}

export default function ContatoPage({ searchParams }: { searchParams: { assunto?: string } }) {
  const defaultType = searchParams.assunto === 'produtos' ? 'Produtos FOX' : 'Cotação / pesquisa de preços'
  return (
    <section className="relative overflow-hidden pb-[72px] pt-32 md:pb-[110px] md:pt-40">
      <div className="pointer-events-none absolute -right-32 -top-48 h-[520px] w-[520px] rounded-full bg-[#FF5A00] opacity-25 blur-[90px]" />
      <div className="container-fox relative">
        <ContactBlock
          defaultType={defaultType}
          title={<>Vamos <span className="grad-text">conversar?</span></>}
          subtitle="Peça uma cotação, envie um edital ou tire dúvidas sobre nossos produtos. Respondemos por e-mail ou WhatsApp."
        />
      </div>
    </section>
  )
}
