'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, getToken, setToken, ApiError } from './api'
import type { AuthResponse, Usuario } from './types'

interface AuthContextValue {
  usuario: Usuario | null
  carregando: boolean
  login: (email: string, senha: string) => Promise<void>
  registrar: (nome: string, email: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const USER_KEY = 'fox_usuario'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const token = getToken()
    const storedUser = localStorage.getItem(USER_KEY)
    if (token && storedUser) {
      try {
        setUsuario(JSON.parse(storedUser) as Usuario)
      } catch {
        setToken(null)
        localStorage.removeItem(USER_KEY)
      }
    }
    setCarregando(false)
  }, [])

  const persistirSessao = useCallback((data: AuthResponse) => {
    setToken(data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data.usuario))
    setUsuario(data.usuario)
  }, [])

  const login = useCallback(
    async (email: string, senha: string) => {
      const data = await api.post<AuthResponse>('/auth/login', { email, senha }, { auth: false })
      persistirSessao(data)
    },
    [persistirSessao]
  )

  const registrar = useCallback(
    async (nome: string, email: string, senha: string) => {
      const data = await api.post<AuthResponse>(
        '/auth/register',
        { nome, email, senha, tipo: 'cliente' },
        { auth: false }
      )
      persistirSessao(data)
    },
    [persistirSessao]
  )

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem(USER_KEY)
    setUsuario(null)
  }, [])

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}

export function mensagemDeErro(err: unknown): string {
  if (err instanceof ApiError) return err.message
  if (err instanceof Error) return err.message
  return 'Erro inesperado'
}
