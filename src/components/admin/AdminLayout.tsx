'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  RefreshCw,
  Undo2,
  LogOut,
} from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/vendas', label: 'Vendas', icon: ShoppingCart },
  { href: '/admin/reabastecimentos', label: 'Reabastecimentos', icon: RefreshCw },
  { href: '/admin/devolucoes', label: 'Devoluções', icon: Undo2 },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { usuario, logout } = useAuth()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <div className="container-fox px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-56 flex-shrink-0">
          <div className="mb-4">
            <p className="text-sm text-fox-gray-dark opacity-60">Painel admin</p>
            <p className="font-semibold text-fox-gray-dark truncate">{usuario?.nome}</p>
          </div>
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {links.map(({ href, label, icon: Icon, exact }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive(href, exact)
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
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-fox-gray-dark hover:bg-fox-gray-light whitespace-nowrap mt-0 md:mt-4"
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
