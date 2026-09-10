import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { SiteImage } from '@/components/site/site-image'
import { CtaSection } from '@/components/site/cta-section'
import { ArticleBody } from '@/components/site/article-body'
import { ClipReveal, Reveal, SplitWords } from '@/components/motion/reveal'
import { images } from '@/lib/content/images'
import { getPublication, publications, publicationTypes } from '@/lib/content/publications'
import { siteConfig } from '@/lib/site-config'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const pub = getPublication(slug)
  if (!pub) return {}
  const img = images[pub.image]
  return {
    title: pub.title,
    description: pub.excerpt,
    alternates: { canonical: `/publications/${pub.slug}` },
    openGraph: {
      type: 'article',
      title: pub.title,
      description: pub.excerpt,
      publishedTime: pub.date,
      images: [{ url: img.src, width: img.width, height: img.height, alt: img.alt }],
    },
  }
}

export default async function PublicationPage({ params }: { params: Params }) {
  const { slug } = await params
  const idx = publications.findIndex((p) => p.slug === slug)
  if (idx === -1) notFound()
  const pub = publications[idx]
  const img = images[pub.image]
  const prev = publications[(idx - 1 + publications.length) % publications.length]
  const next = publications[(idx + 1) % publications.length]
  const portrait = img.height > img.width

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pub.title,
    description: pub.excerpt,
    datePublished: pub.date,
    image: img.src,
    author: { '@type': 'Person', name: 'Татьяна Владимировна Бочкарева' },
    publisher: { '@type': 'Organization', name: siteConfig.brand.legalName, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/publications/${pub.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="pt-28 sm:pt-36">
        <header className="container-x flex flex-col gap-10 pb-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Главная' },
              { href: '/publications', label: 'Публикации' },
              { label: pub.title },
            ]}
          />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-9 flex flex-col gap-6">
              <Reveal className="flex items-center gap-4 text-technical text-muted-foreground" y={8}>
                <span className="text-accent">{publicationTypes[pub.type]}</span>
                {pub.dateLabel ? (
                  <>
                    <span aria-hidden="true" className="h-px w-8 bg-border" />
                    <time dateTime={pub.date}>{pub.dateLabel}</time>
                  </>
                ) : null}
              </Reveal>
              <h1 className="text-display text-[2.25rem] sm:text-5xl lg:text-6xl xl:text-7xl text-balance">
                <SplitWords text={pub.title} />
              </h1>
              <Reveal delay={0.3}>
                <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-3xl text-pretty">
                  {pub.excerpt}
                </p>
              </Reveal>
            </div>
          </div>
        </header>

        <ClipReveal className="container-x">
          <div className={portrait ? 'grid gap-6 lg:grid-cols-12 items-end' : ''}>
            <div
              className={
                portrait
                  ? 'lg:col-span-5 aspect-[3/4] overflow-hidden bg-secondary'
                  : 'aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-secondary'
              }
            >
              <SiteImage
                image={img}
                priority
                sizes={portrait ? '(min-width: 1024px) 40vw, 100vw' : '100vw'}
                className="h-full w-full"
              />
            </div>
            {portrait && img.caption ? (
              <p className="lg:col-span-4 text-sm leading-relaxed text-muted-foreground text-pretty">{img.caption}</p>
            ) : null}
          </div>
          {!portrait && img.caption ? (
            <p className="mt-3 text-technical text-muted-foreground">
              {img.caption}
              {img.source ? ` · Источник: ${img.source}` : ''}
            </p>
          ) : null}
        </ClipReveal>

        <div className="container-x py-16 sm:py-20 grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-6 text-sm">
              <div className="flex flex-col gap-2">
                <span className="text-technical text-muted-foreground">Автор</span>
                <span>Татьяна Бочкарева</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-technical text-muted-foreground">Раздел</span>
                <span>{publicationTypes[pub.type]}</span>
              </div>
              <Link
                href={siteConfig.social.dzen}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 link-underline w-fit"
              >
                Канал в Дзен
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </aside>
          <div className="lg:col-span-8 xl:col-span-7">
            <ArticleBody blocks={pub.body} />
          </div>
        </div>

        <nav aria-label="Другие публикации" className="border-y border-border">
          <div className="container-x grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <Link href={`/publications/${prev.slug}`} className="group py-8 sm:pr-8 flex flex-col gap-3 hover:text-accent transition-colors">
              <span className="text-technical text-muted-foreground flex items-center gap-2">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                Предыдущая
              </span>
              <span className="text-lg font-medium text-balance">{prev.title}</span>
            </Link>
            <Link href={`/publications/${next.slug}`} className="group py-8 sm:pl-8 flex flex-col gap-3 sm:items-end sm:text-right hover:text-accent transition-colors">
              <span className="text-technical text-muted-foreground flex items-center gap-2">
                Следующая
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="text-lg font-medium text-balance">{next.title}</span>
            </Link>
          </div>
        </nav>
      </article>

      <CtaSection index="05" />
    </>
  )
}
