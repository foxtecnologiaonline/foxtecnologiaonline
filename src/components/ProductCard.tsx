import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ProductCardProps {
  title: string
  description: string
  href?: string
  badge?: string
  icon?: React.ReactNode
  comingSoon?: boolean
}

export default function ProductCard({
  title,
  description,
  href,
  badge,
  icon,
  comingSoon = false,
}: ProductCardProps) {
  const content = (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 h-full flex flex-col ${
      comingSoon ? 'opacity-60' : 'hover:-translate-y-1'
    }`}>
      {icon && (
        <div className="mb-4 text-fox-orange">
          {icon}
        </div>
      )}

      <h3 className="text-2xl font-bold text-fox-gray-dark mb-2">
        {title}
      </h3>

      {badge && (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 w-fit ${
          badge === 'Disponível'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {badge}
        </span>
      )}

      <p className="text-fox-gray-dark opacity-75 mb-6 flex-grow">
        {description}
      </p>

      {!comingSoon && href && (
        <div className="flex items-center gap-2 text-fox-orange font-semibold hover:gap-3 transition-all">
          Saiba mais
          <ArrowRight size={20} />
        </div>
      )}

      {comingSoon && (
        <div className="text-fox-orange font-semibold">
          Em breve...
        </div>
      )}
    </div>
  )

  if (comingSoon) {
    return content
  }

  return href ? (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </Link>
  ) : (
    content
  )
}
