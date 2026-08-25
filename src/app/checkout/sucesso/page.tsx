import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function CheckoutSucessoPage() {
  return (
    <div className="container-fox px-6 py-24 max-w-lg mx-auto text-center">
      <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-fox-gray-dark mb-4">Pagamento confirmado!</h1>
      <p className="text-fox-gray-dark opacity-80 mb-8">
        Sua compra foi processada com sucesso. Você já pode acessar seus produtos na área de
        compras.
      </p>
      <Link href="/minhas-compras" className="btn-primary inline-block">
        Ver minhas compras
      </Link>
    </div>
  )
}
