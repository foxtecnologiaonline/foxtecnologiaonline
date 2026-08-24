import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-white flex items-center justify-center overflow-hidden">
      <div className="container-fox px-6 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                <span className="text-fox-gray-dark">Soluções em</span>
                <br />
                <span className="text-fox-orange-dark block">tecnologIA</span>
              </h1>
              <p className="text-xl text-fox-gray-dark opacity-80 max-w-lg">
                Inovação e tecnologia para transformar sua visão em realidade
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link href="/#produtos" className="btn-primary">
                Conhecer Produtos
              </Link>
              <Link href="/contato" className="btn-secondary">
                Entre em Contato
              </Link>
            </div>
          </div>

          {/* Right side - Logo */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-80 h-80">
              <Image
                src="/logo.png"
                alt="FOX tecnologIA"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
