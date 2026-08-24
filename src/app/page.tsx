import Hero from '@/components/Hero'
import ProdutosSection from '@/components/ProdutosSection'

export default function Home() {
  return (
    <div>
      <Hero />

      {/* About Preview */}
      <section className="section-padding bg-white">
        <div className="container-fox text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-fox-gray-dark mb-6">
            Soluções <span className="text-fox-orange">Inovadoras</span>
          </h2>
          <p className="text-lg text-fox-gray-dark opacity-80 mb-8">
            A FOX tecnologIA é uma empresa especializada em soluções tecnológicas modernas e inovadoras,
            com foco em transformar visões em realidade através de produtos e serviços de alta qualidade.
          </p>
          <div className="flex justify-center">
            <a href="/sobre" className="btn-primary">
              Saiba Mais Sobre Nós
            </a>
          </div>
        </div>
      </section>

      <ProdutosSection />

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-fox text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-fox-gray-dark mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-lg text-fox-gray-dark opacity-80 mb-8">
            Entre em contato conosco e saiba como podemos ajudar sua empresa a crescer
            com soluções tecnológicas inovadoras.
          </p>
          <a href="/contato" className="btn-primary inline-block">
            Entre em Contato
          </a>
        </div>
      </section>
    </div>
  )
}
