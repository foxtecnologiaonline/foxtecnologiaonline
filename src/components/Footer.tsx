import Image from 'next/image'
import Link from 'next/link'
import { COMPANY, NAV_LINKS, PRODUCTS, whatsappLink } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-950 pb-10 pt-16 text-sm text-ink-300">
      <div className="container-fox">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/brand/fox-logo-light.png"
              alt="FOX tecnologIA"
              width={160}
              height={81}
              className="mb-4 h-14 w-auto"
            />
            <p className="max-w-xs">{COMPANY.slogan}</p>
          </div>
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-ink-100">Navegação</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ink-100">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-ink-100">Produtos</h3>
            <ul className="space-y-2">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink-100">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-ink-100">Contato</h3>
            <ul className="space-y-2">
              <li><a href={`mailto:${COMPANY.email}`} className="hover:text-ink-100">{COMPANY.email}</a></li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-ink-100">
                  {COMPANY.phone} · WhatsApp
                </a>
              </li>
              <li>{COMPANY.coverage}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-ink-700 pt-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName} · CNPJ {COMPANY.cnpj}
          </p>
          <p>
            Marcas citadas pertencem aos seus respectivos titulares. A menção não indica parceria oficial.
          </p>
        </div>
      </div>
    </footer>
  )
}
