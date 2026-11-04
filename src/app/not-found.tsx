import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = { title: 'Página não encontrada' }

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-24 pt-44 text-center">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="container-fox relative">
        <span className="label-chip mb-5">Erro 404</span>
        <h1 className="mb-4 text-[clamp(32px,5vw,56px)] font-bold">
          Página <span className="grad-text">não encontrada.</span>
        </h1>
        <p className="mx-auto mb-9 max-w-lg text-lg text-ink-300">
          O endereço pode ter mudado. Escolha um caminho abaixo.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Ir para a home <ArrowRight size={18} /></Link>
          <Link href="/licitacoes" className="btn-ghost">Licitações</Link>
          <Link href="/produtos" className="btn-ghost">Produtos</Link>
        </div>
      </div>
    </section>
  )
}
