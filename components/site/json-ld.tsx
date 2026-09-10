import { siteConfig } from '@/lib/site-config'
import { expert } from '@/lib/content/expert'
import { images } from '@/lib/content/images'

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.brand.legalName,
        alternateName: siteConfig.brand.name,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. 2-я Брестская, д. 6, офис 1310, МФК «Резиденция Тверская»',
          addressLocality: 'Москва',
          addressCountry: 'RU',
        },
        sameAs: [siteConfig.social.telegram, siteConfig.social.dzen],
        founder: { '@id': `${siteConfig.url}/about#person` },
      },
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/about#person`,
        name: expert.fullName,
        givenName: expert.firstName,
        familyName: expert.lastName,
        jobTitle: expert.position,
        description: expert.summary,
        image: images.portraitDesk.src,
        url: `${siteConfig.url}/about`,
        worksFor: { '@id': `${siteConfig.url}/#organization` },
        alumniOf: expert.education.map((e) => ({
          '@type': 'EducationalOrganization',
          name: e.institution,
        })),
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be emitted as a raw string for search engines.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
