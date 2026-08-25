'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { Package, Undo2 } from 'lucide-react'

export default function MinhaContaPage() {
  const { usuario } = useAuth()

  return (
    <div>
      <h1 className="text-2xl font-bold text-fox-gray-dark mb-6">Minha conta</h1>

      <div className="bg-white border border-fox-accent rounded-xl p-6 shadow-sm mb-8">
        <dl className="grid sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-fox-gray-dark opacity-60">Nome</dt>
            <dd className="font-medium text-fox-gray-dark">{usuario?.nome}</dd>
          </div>
          <div>
            <dt className="text-sm text-fox-gray-dark opacity-60">E-mail</dt>
            <dd className="font-medium text-fox-gray-dark">{usuario?.email}</dd>
          </div>
        </dl>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/minhas-compras"
          className="flex items-center gap-3 bg-white border border-fox-accent rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <Package className="text-fox-orange" size={28} />
          <div>
            <p className="font-semibold text-fox-gray-dark">Minhas compras</p>
            <p className="text-sm text-fox-gray-dark opacity-70">Downloads, chaves e status</p>
          </div>
        </Link>

        <Link
          href="/minhas-compras"
          className="flex items-center gap-3 bg-white border border-fox-accent rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <Undo2 className="text-fox-orange" size={28} />
          <div>
            <p className="font-semibold text-fox-gray-dark">Devoluções</p>
            <p className="text-sm text-fox-gray-dark opacity-70">Solicite a partir de uma compra</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
