import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site-config'

export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#1c1b1a',
        color: '#f3efe9',
        fontFamily: 'sans-serif',
        backgroundImage:
          'linear-gradient(rgba(243,239,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(243,239,233,0.06) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            width: 56,
            height: 56,
            border: '2px solid #b8703f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            letterSpacing: 2,
            color: '#b8703f',
          }}
        >
          {siteConfig.brand.monogram}
        </div>
        <div style={{ fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.7 }}>
          {siteConfig.brand.name}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 500, maxWidth: 960 }}>{siteConfig.brand.loaderPhrase}</div>
        <div style={{ fontSize: 28, opacity: 0.7 }}>{siteConfig.brand.tagline}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, opacity: 0.6, letterSpacing: 2 }}>
        <span>{siteConfig.brand.legalName.toUpperCase()}</span>
        <span>{siteConfig.url.replace('https://', '')}</span>
      </div>
    </div>,
    size,
  )
}
