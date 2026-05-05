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
      <section className="section-padding bg-white">
        <div className="container-fox">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* ZapScript.me */}
            <ProductCard
              title="ZapScript.me"
              description="Plataforma para transcrever e resumir os áudios que você recebe no WhatsAPP de forma automática!"
              href="https://zapscript.me"
              badge="Disponível"
              logoSrc="/logo-zapscript.svg"
            />

            {/* Coming Soon 1 */}
            <ProductCard
              title="Produto 2"
              description="Nova solução tecnológica em desenvolvimento. Fique atento para novidades sobre este incrível projeto."
              comingSoon
            />

            {/* Coming Soon 2 */}
            <ProductCard
              title="Produto 3"
              description="Inovação em progresso. Estamos trabalhando duro para trazer novas soluções para você em breve."
              comingSoon
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
