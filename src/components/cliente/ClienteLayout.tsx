'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { User, Package, LogOut } from 'lucide-react'

const links = [
  { href: '/minha-conta', label: 'Minha conta', icon: User },
  { href: '/minhas-compras', label: 'Minhas compras', icon: Package },
]

export default function ClienteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { usuario, logout } = useAuth()

  return (
    <div className="container-fox px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-56 flex-shrink-0">
          <div className="mb-4">
            <p className="text-sm text-fox-gray-dark opacity-60">Área do cliente</p>
            <p className="font-semibold text-fox-gray-dark truncate">{usuario?.nome}</p>
          </div>
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === href || pathname.startsWith(`${href}/`)
                    ? 'bg-fox-orange text-white'
                    : 'text-fox-gray-dark hover:bg-fox-gray-light'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-fox-gray-dark hover:bg-fox-gray-light whitespace-nowrap"
            >
              <LogOut size={18} />
              Sair
            </button>
          </nav>
        </aside>
        <div className="flex-grow min-w-0">{children}</div>
      </div>
    </div>
  )
}
