import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { siteConfig } from '@/lib/site-config'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { Loader } from '@/components/site/loader'
import { BackToTop } from '@/components/site/back-to-top'
import { JsonLd } from '@/components/site/json-ld'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s — ${siteConfig.brand.shortName}`,
  },
  description:
    'Юридический и градостроительный консалтинг: сопровождение инвестиционных строительных проектов, градостроительная документация, редевелопмент территорий, правовая помощь застройщикам и инвесторам.',
  applicationName: siteConfig.brand.name,
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: siteConfig.brand.name,
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1d1e24',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${cormorant.variable} bg-graphite`}>
      <body className="antialiased min-h-svh flex flex-col overflow-x-clip">
        <Loader />
        <SiteHeader />
        <div className="flex-1 flex flex-col">{children}</div>
        <SiteFooter />
        <BackToTop />
        <JsonLd />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
