import type { Metadata } from 'next'
import { Inter, Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFab from '@/components/WhatsAppFab'
import { COMPANY, PRODUCTS } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
  display: 'swap',
})

const title = 'FOX tecnologIA — Licenças, IA e sistemas de gestão'

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: { default: title, template: '%s · FOX tecnologIA' },
  description: COMPANY.description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description: COMPANY.slogan,
    type: 'website',
    locale: 'pt_BR',
    siteName: COMPANY.name,
    url: '/',
  },
}

export const viewport = { themeColor: '#08090C' }

// JSON-LD: Organization + um SoftwareApplication por produto (schema.org).
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      taxID: COMPANY.cnpj,
      url: COMPANY.website,
      logo: `${COMPANY.website}/logo.png`,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      description: COMPANY.description,
      areaServed: 'BR',
    },
    ...PRODUCTS.map((p) => ({
      '@type': 'SoftwareApplication',
      name: p.name,
      url: p.href,
      description: p.description,
      provider: { '@type': 'Organization', name: COMPANY.name },
    })),
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  )
}
