import { BarChart3, Building2, Cloud, GraduationCap, LifeBuoy, Rocket, Sparkles, Grid2x2, Briefcase } from 'lucide-react'
import { CATEGORIES, MODALITIES, SERVICES, STEPS } from '@/lib/constants'
import { ProvisionalNote } from './ui'

const CATEGORY_ICONS: Record<string, typeof Sparkles> = {
  ia: Sparkles,
  produtividade: Briefcase,
  software: Grid2x2,
  gestao: BarChart3,
}
const SERVICE_ICONS = [Rocket, GraduationCap, LifeBuoy, Cloud]

function IconBox({ Icon }: { Icon: typeof Sparkles }) {
  return (
    <div className="mb-5 grid h-[46px] w-[46px] place-items-center rounded-xl border border-fox-orange/25 bg-fox-orange/10 text-fox-orange">
      <Icon size={22} />
    </div>
  )
}

/** Bento com as categorias de fornecimento + quadro de modalidades. */
export function CategoryBento({ detailed = false }: { detailed?: boolean }) {
  const [ia, ...rest] = CATEGORIES
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <div className="card relative overflow-hidden p-7 md:col-span-2 lg:col-span-4 lg:min-h-[300px] md:p-8 bg-[radial-gradient(circle_at_90%_10%,rgba(255,122,0,0.18),transparent_55%)]">
        <IconBox Icon={Sparkles} />
        <h3 className="mb-2.5 max-w-lg text-[clamp(24px,3vw,34px)] font-bold leading-tight">
          Licenças de IA para o seu órgão ou empresa
        </h3>
        <p className="max-w-lg text-ink-300">{ia.description}</p>
        <BrandList brands={ia.brands ?? []} />
      </div>

      <div className="card p-7 lg:col-span-2">
        <IconBox Icon={Building2} />
        <h3 className="mb-3 text-[22px] font-bold">Modalidades</h3>
        <ul className="space-y-2 text-sm text-ink-200">
          {MODALITIES.map((m) => (
            <li key={m.name} className="flex justify-between gap-3 border-b border-dashed border-ink-700 pb-2">
              {m.name}
              <span className="font-mono text-xs text-fox-orange">{m.tag}</span>
            </li>
          ))}
        </ul>
      </div>

      {rest.map((c) => (
        <div key={c.id} className="card flex flex-col p-7 lg:col-span-2">
          <IconBox Icon={CATEGORY_ICONS[c.id] ?? Grid2x2} />
          <h3 className="mb-2.5 text-[22px] font-bold">{c.title}</h3>
          <p className="text-[15px] text-ink-300">{c.description}</p>
          {c.brands && <BrandList brands={c.brands} />}
          {detailed && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.items.map((i) => (
                <li key={i} className="rounded-full border border-ink-700 bg-white/[0.02] px-3 py-1.5 text-[13px] text-ink-200">{i}</li>
              ))}
            </ul>
          )}
          {detailed && c.provisorio && <ProvisionalNote>marcas/escopo a confirmar</ProvisionalNote>}
        </div>
      ))}
    </div>
  )
}

function BrandList({ brands }: { brands: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {brands.map((b) => (
        <li key={b} className="rounded-full border border-ink-700 bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium text-ink-100">
          {b}
        </li>
      ))}
    </ul>
  )
}

export function ProcessFlow() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((s, i) => (
        <li key={s.title} className="rounded-[18px] border border-ink-700 bg-gradient-to-b from-white/[0.02] to-transparent p-6">
          <span className="font-mono text-[13px] text-fox-orange">0{i + 1} /</span>
          <h3 className="mb-1 mt-2 text-[17px] font-semibold">{s.title}</h3>
          <p className="text-sm text-ink-300">{s.description}</p>
        </li>
      ))}
    </ol>
  )
}

export function ServicesGrid() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => {
          const Icon = SERVICE_ICONS[i] ?? Rocket
          return (
            <div key={s.title} className="card p-6">
              <IconBox Icon={Icon} />
              <h3 className="mb-1.5 text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-ink-300">{s.description}</p>
            </div>
          )
        })}
      </div>
      <ProvisionalNote>confirmar quais serviços a FOX presta</ProvisionalNote>
    </div>
  )
}
