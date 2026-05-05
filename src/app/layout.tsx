import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'FOX tecnologIA - Soluções em Tecnologia',
  description: 'Soluções inovadoras em tecnologia. Conheça nossos produtos e serviços.',
  openGraph: {
    title: 'FOX tecnologIA - Soluções em Tecnologia',
    description: 'Soluções inovadoras em tecnologia',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-fox-gray-dark">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
