import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre - FOX tecnologIA',
  description: 'Conheça a FOX tecnologIA, nossa missão e visão para o futuro.',
}

export default function Sobre() {
  return (
    <div>
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-fox-orange to-fox-orange-dark text-white">
        <div className="container-fox text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Sobre Nós</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Conheça a história e os valores da FOX tecnologIA
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-fox max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-fox-gray-dark mb-6">
            Quem Somos
          </h2>
          <p className="text-lg text-fox-gray-dark opacity-80 leading-relaxed">
            A FOX tecnologIA é uma empresa especializada em soluções tecnológicas inovadoras.
            Nascemos com o propósito de transformar ideias em produtos digitais que façam a diferença.
            Com uma equipe dedicada e apaixonada por tecnologia, buscamos entregar soluções que
            agregam valor real aos nossos clientes e parceiros.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="section-padding bg-fox-gray-light">
        <div className="container-fox">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-fox-orange mb-4">
                Nossa Missão
              </h3>
              <p className="text-fox-gray-dark opacity-80 leading-relaxed">
                Fornecer soluções tecnológicas inovadoras e de alta qualidade que capacitem
                empresas e indivíduos a alcançar seus objetivos através da transformação digital.
                Comprometemo-nos com excelência, inovação e atendimento ao cliente em cada projeto.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-fox-orange mb-4">
                Nossa Visão
              </h3>
              <p className="text-fox-gray-dark opacity-80 leading-relaxed">
                Ser referência em soluções tecnológicas inovadoras, reconhecida pela qualidade,
                confiabilidade e impacto positivo que gera. Visamos criar um futuro onde a
                tecnologia seja acessível, intuitiva e transformadora para todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-fox text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-fox-gray-dark mb-6">
            Vamos Trabalhar Juntos?
          </h2>
          <p className="text-lg text-fox-gray-dark opacity-80 mb-8">
            Conheça nossos produtos e soluções. Estamos prontos para ajudar seu negócio a crescer.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/#produtos" className="btn-primary">
              Ver Produtos
            </a>
            <a href="/contato" className="btn-secondary">
              Entre em Contato
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
