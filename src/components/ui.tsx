import type { ReactNode } from 'react'

export function SectionHeading({
  label,
  title,
  subtitle,
  as: Tag = 'h2',
}: {
  label: string
  title: ReactNode
  subtitle?: ReactNode
  as?: 'h1' | 'h2'
}) {
  return (
    <div>
      <span className="label-chip mb-5">{label}</span>
      <Tag className="mb-4 text-[clamp(32px,4.6vw,54px)] font-bold leading-[1.1]">{title}</Tag>
      {subtitle && <p className="max-w-2xl text-lg text-ink-300">{subtitle}</p>}
    </div>
  )
}

/** Cabeçalho das páginas internas, com o mesmo brilho do hero da home. */
export function PageHero({ label, title, subtitle, children }: {
  label: string
  title: ReactNode
  subtitle: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-20 md:pt-48">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-32 -top-48 h-[520px] w-[520px] rounded-full bg-[#FF5A00] opacity-30 blur-[90px]" />
      <div className="container-fox relative">
        <SectionHeading as="h1" label={label} title={title} subtitle={subtitle} />
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}

export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items]
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-ink-700 bg-ink-900 py-[18px]">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-lg font-semibold text-ink-400">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="text-fox-orange">✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ProvisionalNote({ children }: { children: ReactNode }) {
  // Só aparece em desenvolvimento — sinaliza textos aguardando confirmação.
  if (process.env.NODE_ENV === 'production') return null
  return (
    <p className="mt-3 rounded-lg border border-dashed border-fox-amber/40 bg-fox-amber/5 px-3 py-2 font-mono text-[11px] text-fox-amber">
      PROVISÓRIO · {children}
    </p>
  )
}
