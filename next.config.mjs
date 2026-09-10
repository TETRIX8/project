/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'static.tildacdn.com' }],
  },
  async redirects() {
    const legacyArticles = [
      'tasks-and-functionality',
      'kazynash',
      'pmuf-2025',
      'tatyana-bochkareva-podrobno-pro-gradostroitelnyj-konsalting',
      'book-about',
      'soghlashenie',
      '1-november-min-str-zkh',
      '4-november',
    ]
    return [
      { source: '/main', destination: '/', permanent: true },
      { source: '/public', destination: '/publications', permanent: true },
      { source: '/doks', destination: '/documents', permanent: true },
      { source: '/politika', destination: '/privacy', permanent: true },
      { source: '/page83586706.html', destination: '/', permanent: true },
      ...legacyArticles.map((slug) => ({
        source: `/${slug}`,
        destination: `/publications/${slug}`,
        permanent: true,
      })),
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy-Report-Only',
            value:
              "default-src 'self'; img-src 'self' data: https://static.tildacdn.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://va.vercel-scripts.com; frame-ancestors 'self'",
          },
        ],
      },
    ]
  },
}

export default nextConfig
