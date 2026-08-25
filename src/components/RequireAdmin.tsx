'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Spinner from '@/components/ui/Spinner'

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { usuario, carregando } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (carregando) return
    if (!usuario) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
    } else if (usuario.tipo !== 'admin') {
      router.replace('/login')
    }
  }, [carregando, usuario, router, pathname])

  if (carregando || !usuario || usuario.tipo !== 'admin') {
    return <Spinner label="Verificando permissões..." />
  }

  return <>{children}</>
}
