import RequireAuth from '@/components/RequireAuth'
import ClienteLayout from '@/components/cliente/ClienteLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <ClienteLayout>{children}</ClienteLayout>
    </RequireAuth>
  )
}
