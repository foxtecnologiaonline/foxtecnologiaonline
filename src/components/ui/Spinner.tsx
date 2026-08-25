import { Loader2 } from 'lucide-react'

export default function Spinner({ label = 'Carregando...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-fox-gray-dark opacity-70">
      <Loader2 className="animate-spin" size={32} />
      <span>{label}</span>
    </div>
  )
}
