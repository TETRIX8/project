import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/lib/content/services'
import { publications } from '@/lib/content/publications'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/publications`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/documents`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/contacts`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const publicationRoutes: MetadataRoute.Sitemap = publications.map((p) => ({
    url: `${base}/publications/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...publicationRoutes]
}
