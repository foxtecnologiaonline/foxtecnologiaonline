import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { PRODUCTS, type Product } from '@/lib/constants'
import { ProvisionalNote } from './ui'

const WAVE = [8, 16, 22, 12, 18, 9, 20, 14, 22, 10, 16, 7, 18, 12]

function Mockup({ id }: { id: string }) {
  switch (id) {
    case 'zapscript':
      return (
        <div className="w-[250px] rounded-[28px] border border-[#2A2F3B] bg-[#0C0E12] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          <div className="mb-2.5 flex items-center gap-[3px] rounded-[14px_14px_14px_4px] bg-[#1B2A22] p-3">
            {WAVE.map((h, i) => (
              <i key={i} className="w-[3px] rounded-sm bg-[#34D399]" style={{ height: h }} />
            ))}
            <span className="ml-2 text-[11px] text-[#86EFAC]">2:47</span>
          </div>
          <div className="rounded-xl border border-[#2A2F3B] bg-ink-800 p-3 text-[12.5px] text-ink-200">
            <b className="mb-1 block font-mono text-[11px] font-medium text-[#34D399]">RESUMO</b>
            Reunião remarcada para quinta às 15h. Levar o relatório de vendas atualizado.
          </div>
        </div>
      )
    case 'documentos':
      return (
        <div className="relative h-[220px] w-[240px]">
          <div className="absolute left-0 top-2 h-[210px] w-[170px] -rotate-[8deg] rounded-xl bg-[#C7D5F2] shadow-2xl" />
          <div className="absolute left-9 top-0 h-[210px] w-[170px] rotate-[3deg] space-y-[9px] rounded-xl bg-[#E9EEF8] p-[18px] shadow-2xl">
            <span className="block h-3 w-3/5 rounded bg-[#2563EB]" />
            {['100%', '100%', '70%', '100%', '50%', '85%'].map((w, i) => (
              <span key={i} className="block h-[7px] rounded bg-[#B9C6E2]" style={{ width: w }} />
            ))}
          </div>
        </div>
      )
    case 'mykollect':
      return (
        <div className="relative grid h-[250px] w-[250px] place-items-center rounded-3xl border border-[#2A2F3B] bg-gradient-to-br from-[#173328] to-[#0C1712]">
          <div className="grid h-[150px] w-[150px] place-items-center rounded-[18px] border-2 border-dashed border-[#A7F3D0]/55 text-[54px]">🪙</div>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-[#2A2F3B] bg-ink-950/85 px-3 py-2.5 text-[12.5px]">
            Item identificado <b className="font-mono text-[11px] font-medium text-[#6EE7B7]">CONFIRMAR ✓</b>
          </div>
        </div>
      )
    case 'makeapp':
      return (
        <div className="flex items-end gap-4">
          <div className="hidden w-[108px] space-y-2 rounded-2xl border border-[#2A2F3B] bg-ink-800 p-2.5 sm:block">
            {['Botão', 'Lista', 'Imagem', 'Formulário'].map((b) => (
              <div key={b} className="rounded-lg border border-[#3B3360] bg-[#1E1A33] px-2 py-1.5 text-[11px] text-[#C4B5FD]">+ {b}</div>
            ))}
          </div>
          <div className="w-[170px] rounded-[26px] border border-[#2A2F3B] bg-[#0C0E12] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
            <div className="mb-2 h-16 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]" />
            <div className="mb-1.5 h-2 w-3/4 rounded bg-[#2A2F3B]" />
            <div className="mb-3 h-2 w-1/2 rounded bg-[#2A2F3B]" />
            <div className="space-y-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-ink-800 p-1.5">
                  <span className="h-5 w-5 rounded-md bg-[#3B3360]" />
                  <span className="h-1.5 flex-1 rounded bg-[#2A2F3B]" />
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-[#A78BFA] py-1.5 text-center text-[11px] font-semibold text-[#1E1A33]">Publicar app</div>
          </div>
        </div>
      )
    default:
      return null
  }
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const reversed = index % 2 === 1
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ['--accent' as string]: product.accent }}
      className="group grid overflow-hidden rounded-[26px] border border-ink-700 bg-ink-800 transition-colors duration-300 hover:border-[color:var(--accent)] md:grid-cols-2"
    >
      <div className="flex flex-col justify-center p-6 sm:p-8 md:p-11">
        <div className="mb-4 flex items-center gap-3">
          <Image src={product.logoSrc} alt="" width={36} height={36} className="rounded-lg" />
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[color:var(--accent)]">
            0{index + 1} · {product.kicker}
          </span>
        </div>
        <h3 className="mb-3 text-[clamp(28px,3.4vw,40px)] font-bold">{product.name}</h3>
        <p className="mb-6 max-w-md text-[17px] text-ink-300">{product.description}</p>
        <span className="inline-flex items-center gap-1.5 font-semibold text-[color:var(--accent)]">
          {product.domain}
          <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
        {product.provisorio && <ProvisionalNote>descrição aguardando texto oficial</ProvisionalNote>}
      </div>
      <div
        className={`grid min-h-[240px] place-items-center p-8 md:min-h-[300px] ${reversed ? 'md:order-first' : ''}`}
        style={{ background: `radial-gradient(circle at 50% 50%, ${product.accent}47, transparent 70%)` }}
        aria-hidden="true"
      >
        <Mockup id={product.id} />
      </div>
    </a>
  )
}

export function ProductShowcase() {
  return (
    <div className="grid gap-5">
      {PRODUCTS.map((p, i) => (
        <ProductRow key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}

/** Versão compacta para a home. */
export function ProductGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PRODUCTS.map((p) => (
        <a
          key={p.id}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ['--accent' as string]: p.accent }}
          className="card group flex flex-col p-6 hover:!border-[color:var(--accent)]"
        >
          <Image src={p.logoSrc} alt="" width={48} height={48} className="mb-5 rounded-xl" />
          <span className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[color:var(--accent)]">{p.kicker}</span>
          <h3 className="mb-2 text-xl font-bold">{p.name}</h3>
          <p className="mb-5 text-sm text-ink-300">{p.description}</p>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--accent)]">
            {p.domain} <ArrowUpRight size={16} />
          </span>
        </a>
      ))}
    </div>
  )
}
