import ProductCard from '@/components/ProductCard'

// Descrições de Documentos.shop e Makeapp.me são placeholders: a sessão que
// gerou esta seção não teve acesso de rede a documentos.shop / makeapp.me
// para copiar o texto/logo exatos. Revisar e ajustar conforme os sites reais.
export default function ProdutosSection() {
  return (
    <section id="produtos" className="section-padding bg-fox-gray-light scroll-mt-16">
      <div className="container-fox">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-fox-gray-dark mb-4">
            Nossos <span className="text-fox-orange">Produtos</span>
          </h2>
          <p className="text-lg text-fox-gray-dark opacity-80">
            Apps que estamos criando para transformar sua visão em realidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* ZapScript.me */}
          <ProductCard
            title="ZapScript.me"
            description="Plataforma para transcrever e resumir os áudios que você recebe no WhatsApp de forma automática!"
            href="https://zapscript.me"
            badge="Disponível"
            logoSrc="/logo-zapscript.svg"
            accentColor="#10b981"
          />

          {/* Documentos.shop */}
          <ProductCard
            title="Documentos.shop"
            description="Plataforma para gerar, organizar e gerenciar seus documentos digitais de forma rápida e prática."
            href="https://documentos.shop"
            badge="Disponível"
            logoSrc="/logo-documentos.svg"
            accentColor="#2563eb"
          />

          {/* Makeapp.me */}
          <ProductCard
            title="Makeapp.me"
            description="Crie e publique seus próprios aplicativos de forma simples e rápida, sem precisar programar."
            href="https://makeapp.me"
            badge="Disponível"
            logoSrc="/logo-makeapp.svg"
            accentColor="#7c3aed"
          />
        </div>

        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-fox-gray-dark mb-3">
            Mais produtos em breve!
          </h3>
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
  )
}
