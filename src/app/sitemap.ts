import { MetadataRoute } from 'next'
import { COMPANY } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/licitacoes', '/produtos', '/sobre', '/contato']
  return routes.map((route) => ({
    url: `${COMPANY.website}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route === '/licitacoes' || route === '/produtos' ? 0.9 : 0.7,
  }))
}
