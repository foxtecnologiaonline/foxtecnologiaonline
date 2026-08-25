'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Spinner from '@/components/ui/Spinner'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { usuario, carregando } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!carregando && !usuario) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }, [carregando, usuario, router, pathname])

  if (carregando || !usuario) {
    return <Spinner label="Verificando sessão..." />
  }

  return <>{children}</>
}
