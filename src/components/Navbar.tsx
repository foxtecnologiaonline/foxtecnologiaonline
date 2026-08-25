'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [produtosInView, setProdutosInView] = useState(false)
  const pathname = usePathname()
  const { usuario } = useAuth()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/#produtos', label: 'Produtos' },
    { href: '/produtos', label: 'Loja' },
    { href: '/contato', label: 'Contato' },
    usuario
      ? { href: usuario.tipo === 'admin' ? '/admin' : '/minha-conta', label: 'Minha conta' }
      : { href: '/login', label: 'Entrar' },
  ]

  // Scroll-spy: só a home tem a seção #produtos, então observamos sua
  // visibilidade para alternar o destaque entre "Home" e "Produtos" no navbar.
  useEffect(() => {
    if (pathname !== '/') return

    const target = document.getElementById('produtos')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setProdutosInView(entry.isIntersecting),
      { rootMargin: '-72px 0px -60% 0px' }
    )
    observer.observe(target)

    return () => observer.disconnect()
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/#produtos') return pathname === '/' && produtosInView
    if (href === '/') return pathname === '/' && !produtosInView
    return pathname === href
  }

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container-fox px-6 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <Image
            src="/logo.png"
            alt="FOX tecnologIA"
            width={40}
            height={40}
            sizes="40px"
            className="rounded flex-shrink-0"
            priority
          />
          <span className="text-base sm:text-lg font-bold whitespace-nowrap">
            <span className="text-fox-gray-dark">FOX </span><span className="text-fox-orange">tecnolog</span><span className="text-fox-orange-dark font-extrabold">IA</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`transition-colors font-medium ${
                isActive(link.href)
                  ? 'text-fox-orange'
                  : 'text-fox-gray-dark hover:text-fox-orange'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-fox-gray-dark"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-t border-fox-accent md:hidden">
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`transition-colors font-medium ${
                    isActive(link.href)
                      ? 'text-fox-orange'
                      : 'text-fox-gray-dark hover:text-fox-orange'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
