import type { Metadata } from 'next'
import { PageHero } from '@/components/ui'
import { ProductShowcase } from '@/components/Products'
import ContactBlock from '@/components/ContactBlock'
import { PRODUCTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Produtos — apps com inteligência artificial',
  description: `Conheça ${PRODUCTS.map((p) => p.name).join(', ')}: produtos digitais com IA criados pela FOX tecnologIA.`,
  alternates: { canonical: '/produtos' },
}

export default function ProdutosPage() {
  return (
    <>
      <PageHero
        label="Produtos FOX"
        title={<>Feitos por nós. <span className="grad-text">Movidos a IA.</span></>}
        subtitle="Apps próprios que tiram tarefas chatas do seu caminho — e mostram, na prática, a experiência em IA que levamos aos nossos clientes."
      />
      <section className="pb-[72px] md:pb-[110px]">
        <div className="container-fox"><ProductShowcase /></div>
      </section>
      <section className="section border-t border-ink-700">
        <div className="container-fox">
          <ContactBlock
            defaultType="Produtos FOX"
            title={<>Dúvidas sobre algum <span className="grad-text">produto?</span></>}
            subtitle="Fale com a gente sobre planos, uso em empresas ou parcerias."
          />
        </div>
      </section>
    </>
  )
}
