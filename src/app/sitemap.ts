import { MetadataRoute } from 'next'
import { COMPANY } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/sobre', '/contato']

  return routes.map((route) => ({
    url: `${COMPANY.website}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
