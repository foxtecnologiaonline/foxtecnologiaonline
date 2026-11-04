'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="fixed inset-x-0 top-3.5 z-50">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="relative flex h-[62px] items-center justify-between rounded-2xl border border-ink-700 bg-ink-900/70 pl-4 pr-2.5 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold">
            <Image src="/brand/fox-icon.png" alt="" width={34} height={40} className="h-[34px] w-auto" priority />
            <span>
              FOX <span className="font-semibold text-ink-300">tecnolog</span>
              <span className="text-fox-orange">IA</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors hover:bg-white/5 hover:text-ink-100 ${
                    active ? 'text-ink-100' : 'text-ink-300'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
            <Link href="/contato?assunto=cotacao" className="btn-primary ml-1 !px-4 !py-2.5">
              Pedir cotação
            </Link>
          </nav>

          <button
            className="grid h-11 w-11 place-items-center text-ink-100 md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          {open && (
            <nav
              className="absolute inset-x-0 top-[70px] rounded-2xl border border-ink-700 bg-ink-900 p-2.5 md:hidden"
              aria-label="Principal"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block rounded-lg px-3.5 py-3.5 font-medium hover:bg-white/5 ${
                    pathname === l.href ? 'text-fox-orange' : 'text-ink-200'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/contato?assunto=cotacao" className="btn-primary mt-1.5 w-full">
                Pedir cotação
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
