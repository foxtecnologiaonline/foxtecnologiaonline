import { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Produtos - FOX tecnologIA',
  description: 'Conheça nossos produtos e soluções tecnológicas inovadoras.',
}

export default function Produtos() {
  return (
    <div>
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-fox-orange to-fox-orange-dark text-white">
        <div className="container-fox text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Produtos</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Soluções inovadoras em desenvolvimento para transformar sua visão
          </p>
        </div>
      </section>

      {/* Products Grid */}
      {/*
        Descrições de Documentos.shop e Makeapp.me são placeholders: a sessão que
        gerou esta página não teve acesso de rede a documentos.shop / makeapp.me
        para copiar o texto/logo exatos. Revisar e ajustar conforme os sites reais.
      */}
      <section className="section-padding bg-white">
        <div className="container-fox">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* ZapScript.me */}
            <ProductCard
              title="ZapScript.me"
              description="Plataforma para transcrever e resumir os áudios que você recebe no WhatsApp de forma automática!"
              href="https://zapscript.me"
              badge="Disponível"
              logoSrc="/logo-zapscript.svg"
            />

            {/* Documentos.shop */}
            <ProductCard
              title="Documentos.shop"
              description="Plataforma para gerar, organizar e gerenciar seus documentos digitais de forma rápida e prática."
              href="https://documentos.shop"
              badge="Disponível"
              logoSrc="/logo-documentos.svg"
            />

            {/* Makeapp.me */}
            <ProductCard
              title="Makeapp.me"
              description="Crie e publique seus próprios aplicativos de forma simples e rápida, sem precisar programar."
              href="https://makeapp.me"
              badge="Disponível"
              logoSrc="/logo-makeapp.svg"
            />
          </div>

          <div className="bg-fox-gray-light rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-fox-gray-dark mb-3">
              Mais produtos em breve!
            </h2>
            <p className="text-fox-gray-dark opacity-75 mb-6">
              Estamos desenvolvendo novas soluções para atender suas necessidades.
              <br />
              Acompanhe nosso progresso e fique atento para os lançamentos.
            </p>
            <a href="/contato" className="btn-primary inline-block">
              Receba Notícias de Novos Produtos
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-fox-gray-light">
        <div className="container-fox text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-fox-gray-dark mb-6">
            Alguma Dúvida?
          </h2>
          <p className="text-lg text-fox-gray-dark opacity-80 mb-8">
            Entre em contato conosco para saber mais sobre nossos produtos e como podemos ajudá-lo.
          </p>
          <a href="/contato" className="btn-primary">
            Entre em Contato
          </a>
        </div>
      </section>
    </div>
  )
}
