import type { Metadata } from 'next'
import { DM_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { COMPANY, PRODUCTS } from '@/lib/constants'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const productsSummary = PRODUCTS.map((p) => p.name).join(', ')

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: 'FOX tecnologIA - Soluções em Tecnologia',
  description: `A FOX tecnologIA desenvolve soluções digitais inovadoras: ${productsSummary}. Conheça nossos produtos e serviços de tecnologia.`,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FOX tecnologIA - Soluções em Tecnologia',
    description: `Conheça ${productsSummary} — apps criados pela FOX tecnologIA.`,
    type: 'website',
    locale: 'pt_BR',
    siteName: COMPANY.name,
    url: '/',
  },
}

// JSON-LD: Organization + um SoftwareApplication por produto, para rich
// results de busca (schema.org). Sem dados não verificados (preço, SO,
// categoria) que os sites-fonte não confirmaram.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: COMPANY.name,
      url: COMPANY.website,
      logo: `${COMPANY.website}/logo.png`,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      description: COMPANY.description,
    },
    ...PRODUCTS.map((p) => ({
      '@type': 'SoftwareApplication',
      name: p.name,
      url: p.href,
      description: p.description,
      provider: {
        '@type': 'Organization',
        name: COMPANY.name,
      },
    })),
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white text-fox-gray-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
