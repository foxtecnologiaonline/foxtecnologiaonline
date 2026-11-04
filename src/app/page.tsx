import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import { Marquee, SectionHeading } from '@/components/ui'
import { CategoryBento, ProcessFlow } from '@/components/Licitacoes'
import { ProductGrid } from '@/components/Products'
import ContactBlock from '@/components/ContactBlock'

const MARQUEE = [
  'Licenças de software',
  'IA generativa corporativa',
  'ERP e gestão pública',
  'Gestão documental',
  'Segurança da informação',
  'Nuvem e infraestrutura',
  'Treinamento em IA',
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-36 md:pb-24 md:pt-44">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-32 -top-48 h-[560px] w-[560px] rounded-full bg-[#FF5A00] opacity-35 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-fox-amber opacity-15 blur-[90px]" />
        <div className="container-fox relative text-center">
          <span className="label-chip mb-5">{COMPANY.tagline}</span>
          <h1 className="mx-auto mb-6 max-w-[980px] text-[clamp(38px,7vw,84px)] font-extrabold leading-[1.05]">
            Licenças, IA e sistemas de gestão para <span className="grad-text">quem precisa fazer mais.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-[clamp(17px,2vw,20px)] text-ink-300">
            Fornecemos tecnologia para órgãos públicos e empresas em todo o Brasil — e criamos nossos
            próprios produtos com inteligência artificial.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/licitacoes" className="btn-primary">
              Soluções para licitações <ArrowRight size={18} />
            </Link>
            <Link href="/produtos" className="btn-ghost">Ver produtos FOX</Link>
          </div>

          <div aria-hidden="true" className="mx-auto mt-16 max-w-[720px] overflow-hidden rounded-2xl border border-ink-700 bg-ink-800/80 text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex gap-[7px] border-b border-ink-700 px-4 py-3">
              {[0, 1, 2].map((i) => <span key={i} className="h-[11px] w-[11px] rounded-full bg-[#2B303C]" />)}
            </div>
            <pre className="whitespace-pre-wrap px-5 py-5 font-mono text-[13px] leading-[1.9] text-ink-200 sm:text-sm">
              <span className="text-ink-400"># nova solicitação recebida</span>{'\n'}
              <span className="text-fox-orange">fox</span> cotar --modalidade <span className="text-[#7EE2A8]">&quot;pregão eletrônico&quot;</span> --itens <span className="text-[#7EE2A8]">&quot;licenças IA + ERP&quot;</span>{'\n'}
              <span className="text-ink-400">✓ especificações analisadas</span>{'\n'}
              <span className="text-ink-400">✓ proposta e habilitação prontas</span>{'\n'}
              <span className="text-fox-orange">→</span> entrega, ativação e suporte{' '}
              <span className="inline-block h-4 w-2 animate-blink bg-fox-orange align-[-3px]" />
            </pre>
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE} />

      <section className="section">
        <div className="container-fox">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              label="FOX Gov · Licitações"
              title={<>Compras de tecnologia,<br /><span className="grad-text">sem atrito.</span></>}
              subtitle="Revenda de licenças, IA e sistemas de gestão com proposta técnica, documentação e pós-venda — para o setor público e privado."
            />
            <Link href="/licitacoes" className="btn-ghost shrink-0">
              Ver tudo sobre licitações <ArrowRight size={18} />
            </Link>
          </div>
          <CategoryBento />
          <div className="mt-4"><ProcessFlow /></div>
        </div>
      </section>

      <section className="section border-y border-ink-700 bg-ink-900">
        <div className="container-fox">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              label="Produtos FOX"
              title={<>Feitos por nós. <span className="grad-text">Movidos a IA.</span></>}
              subtitle="Apps próprios que mostram, na prática, o que a inteligência artificial pode fazer pelo seu dia a dia."
            />
            <Link href="/produtos" className="btn-ghost shrink-0">
              Conhecer os produtos <ArrowRight size={18} />
            </Link>
          </div>
          <ProductGrid />
        </div>
      </section>

      <section className="section" id="contato">
        <div className="container-fox">
          <ContactBlock title={<>Tem um edital aberto? <span className="grad-text">Fale com a gente.</span></>} />
        </div>
      </section>
    </>
  )
}
