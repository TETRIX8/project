import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site-config'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1d1e24',
        padding: 22,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '5px solid #b8703f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f3efe9',
          fontSize: 64,
          fontWeight: 600,
          letterSpacing: 4,
          fontFamily: 'serif',
        }}
      >
        {siteConfig.brand.monogram}
      </div>
    </div>,
    size,
  )
}
