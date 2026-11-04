import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import { PageHero } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a FOX tecnologIA: fornecimento de tecnologia para governo e empresas e desenvolvimento de produtos com IA.',
  alternates: { canonical: '/sobre' },
}

const PILLARS = [
  { title: 'Transparência', text: 'Propostas claras, sem letras miúdas.' },
  { title: 'Agilidade', text: 'Resposta rápida a cotações e prazos de edital.' },
  { title: 'IA na prática', text: 'Usamos no dia a dia a tecnologia que entregamos.' },
  { title: 'Pós-venda', text: 'Suporte e acompanhamento depois da compra.' },
]

export default function SobrePage() {
  return (
    <>
      <PageHero
        label="Sobre a FOX"
        title={<>{COMPANY.tagline}, <span className="grad-text">em duas frentes.</span></>}
        subtitle="A FOX tecnologIA fornece licenças, IA e sistemas de gestão para quem precisa comprar tecnologia com segurança — e desenvolve produtos próprios com inteligência artificial. Essa experiência prática com IA é o que levamos para cada cliente."
      >
        <Link href="/licitacoes" className="btn-primary">Licitações <ArrowRight size={18} /></Link>
        <Link href="/produtos" className="btn-ghost">Produtos</Link>
      </PageHero>
      <section className="pb-[72px] md:pb-[110px]">
        <div className="container-fox grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="card p-7">
              <h2 className="mb-2 text-xl font-bold">{p.title}</h2>
              <p className="text-ink-300">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="container-fox mt-10 text-sm text-ink-400">
          {COMPANY.legalName} · CNPJ {COMPANY.cnpj} · {COMPANY.coverage}
        </div>
      </section>
    </>
  )
}
