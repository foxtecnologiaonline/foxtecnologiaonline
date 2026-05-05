import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative gradient-fox min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-fox-gray-light to-white opacity-20"></div>

      <div className="container-fox px-6 py-20 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Soluções em
                <br />
                <span className="text-gradient-fox block">tecnologIA</span>
              </h1>
              <p className="text-xl text-white opacity-90 max-w-lg">
                Inovação e tecnologia para transformar sua visão em realidade
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link href="/produtos" className="btn-primary">
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
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
