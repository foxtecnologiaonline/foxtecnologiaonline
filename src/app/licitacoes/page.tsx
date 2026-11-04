import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileCheck2, Landmark, ShieldCheck } from 'lucide-react'
import { COMPANY, MODALITIES } from '@/lib/constants'
import { PageHero, SectionHeading } from '@/components/ui'
import { CategoryBento, ProcessFlow, ServicesGrid } from '@/components/Licitacoes'
import ContactBlock from '@/components/ContactBlock'

export const metadata: Metadata = {
  title: 'Licitações — licenças de software, IA e sistemas de gestão',
  description:
    'Fornecimento de licenças de software e IA (Microsoft 365, Google Workspace, ChatGPT, Claude, Gemini, Copilot), sistemas de gestão e serviços para órgãos públicos e empresas em todo o Brasil. Pregão, dispensa, adesão a ata e cotação.',
  alternates: { canonical: '/licitacoes' },
}

const FAQ = [
  {
    q: 'Quais modalidades de compra vocês atendem?',
    a: `${MODALITIES.map((m) => m.name).join(', ')}. Processos públicos seguem a Lei 14.133/2021.`,
  },
  {
    q: 'Vocês enviam orçamento para pesquisa de preços?',
    a: 'Sim. Envie a especificação dos itens e emitimos um orçamento formal, com CNPJ e validade, para compor o seu processo.',
  },
  {
    q: 'Atendem empresas privadas também?',
    a: 'Sim. Atendemos órgãos públicos e empresas privadas com o mesmo cuidado, em todo o Brasil.',
  },
  {
    q: 'Como recebo os documentos de habilitação?',
    a: 'Certidões e demais documentos de habilitação são enviados mediante solicitação, junto com a proposta.',
  },
]

export default function LicitacoesPage() {
  return (
    <>
      <PageHero
        label="FOX Gov · Licitações"
        title={<>Tecnologia para o setor público e privado, <span className="grad-text">do edital à ativação.</span></>}
        subtitle="Revenda de licenças de software e IA, sistemas de gestão e serviços — com proposta técnica, documentação de habilitação e pós-venda. Atendimento em todo o Brasil."
      >
        <Link href="#cotacao" className="btn-primary">Enviar edital ou TR <ArrowRight size={18} /></Link>
        <a href="#catalogo" className="btn-ghost">Ver o que fornecemos</a>
      </PageHero>

      <section className="border-y border-ink-700 bg-ink-900 py-8">
        <div className="container-fox grid gap-6 text-sm text-ink-200 sm:grid-cols-3">
          <p className="flex items-center gap-3"><Landmark size={20} className="shrink-0 text-fox-orange" /> Processos conforme a Lei 14.133/2021</p>
          <p className="flex items-center gap-3"><FileCheck2 size={20} className="shrink-0 text-fox-orange" /> {COMPANY.legalName} · CNPJ {COMPANY.cnpj}</p>
          <p className="flex items-center gap-3"><ShieldCheck size={20} className="shrink-0 text-fox-orange" /> {COMPANY.coverage}</p>
        </div>
      </section>

      <section className="section scroll-mt-24" id="catalogo">
        <div className="container-fox">
          <div className="mb-14">
            <SectionHeading
              label="Catálogo"
              title={<>O que <span className="grad-text">fornecemos</span></>}
              subtitle="Licenciamento adequado às especificações do seu edital ou da sua empresa."
            />
          </div>
          <CategoryBento detailed />
          <p className="mt-6 text-xs text-ink-400">
            Marcas citadas pertencem aos seus respectivos titulares. A menção não indica parceria oficial com os fabricantes.
          </p>
        </div>
      </section>

      <section className="section border-y border-ink-700 bg-ink-900">
        <div className="container-fox">
          <div className="mb-14">
            <SectionHeading label="Como funciona" title={<>Do edital à entrega, <span className="grad-text">em 4 passos.</span></>} />
          </div>
          <ProcessFlow />
        </div>
      </section>

      <section className="section">
        <div className="container-fox">
          <div className="mb-14">
            <SectionHeading
              label="Serviços"
              title={<>Além da licença, <span className="grad-text">o resultado.</span></>}
              subtitle="Tudo o que vem depois da compra para a solução funcionar de verdade."
            />
          </div>
          <ServicesGrid />
        </div>
      </section>

      <section className="section border-y border-ink-700 bg-ink-900">
        <div className="container-fox grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading label="Dúvidas frequentes" title="Perguntas sobre compras" />
          <div className="divide-y divide-ink-700 border-y border-ink-700">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                  {f.q}
                  <span className="text-2xl text-fox-orange transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-ink-300">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section scroll-mt-24" id="cotacao">
        <div className="container-fox">
          <ContactBlock
            defaultType="Pregão eletrônico"
            title={<>Tem um edital aberto? <span className="grad-text">Envie para a FOX.</span></>}
          />
        </div>
      </section>
    </>
  )
}
