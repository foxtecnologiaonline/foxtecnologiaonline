import RequireAdmin from '@/components/RequireAdmin'
import AdminLayout from '@/components/admin/AdminLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAdmin>
      <AdminLayout>{children}</AdminLayout>
    </RequireAdmin>
  )
}
