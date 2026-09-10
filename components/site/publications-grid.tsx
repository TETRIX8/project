'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { images } from '@/lib/content/images'
import { publications, publicationTypes, type PublicationType } from '@/lib/content/publications'
import { SiteImage } from './site-image'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type Filter = PublicationType | 'all'

export function PublicationsGrid({
  limit,
  showFilters = true,
  extraFilters,
}: {
  limit?: number
  showFilters?: boolean
  /** Extra tabs rendered after the publication types (e.g. link to documents) */
  extraFilters?: { label: string; href: string }[]
}) {
  const [filter, setFilter] = useState<Filter>('all')

  const items = useMemo(() => {
    const list = filter === 'all' ? publications : publications.filter((p) => p.type === filter)
    return limit ? list.slice(0, limit) : list
  }, [filter, limit])

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Все' },
    ...(Object.keys(publicationTypes) as PublicationType[]).map((k) => ({ key: k, label: publicationTypes[k] })),
  ]

  return (
    <div className="flex flex-col gap-8">
      {showFilters ? (
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Фильтр публикаций">
          {filters.map((f) => {
            const selected = filter === f.key
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(f.key)}
                className={cn(
                  'h-9 px-4 text-xs tracking-wide uppercase rounded-sm border transition-colors',
                  selected
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40',
                )}
              >
                {f.label}
              </button>
            )
          })}
          {extraFilters?.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="h-9 px-4 inline-flex items-center gap-1.5 text-xs tracking-wide uppercase rounded-sm border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              {f.label}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      ) : null}

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm py-10 border border-dashed border-border text-center">
          Материалов в этой категории пока нет.
        </p>
      ) : (
        <Stagger key={filter} as="ul" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12" amount={0.1}>
          {items.map((p) => {
            const img = images[p.image]
            return (
              <StaggerItem key={p.slug} as="li">
                <article className="group flex flex-col gap-4 h-full">
                  <Link
                    href={`/publications/${p.slug}`}
                    className="block rounded-sm overflow-hidden"
                    aria-label={p.title}
                    tabIndex={-1}
                  >
                    <SiteImage
                      image={img}
                      className="aspect-[4/3]"
                      imgClassName="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      position={p.image.startsWith('portrait') ? '50% 20%' : undefined}
                    />
                  </Link>
                  <div className="flex items-center gap-3 text-technical text-muted-foreground">
                    <span className="text-accent">{publicationTypes[p.type]}</span>
                    {p.dateLabel ? (
                      <>
                        <span aria-hidden="true" className="h-px w-4 bg-border" />
                        <time dateTime={p.date}>{p.dateLabel}</time>
                      </>
                    ) : null}
                  </div>
                  <h3 className="font-serif text-2xl leading-tight text-balance">
                    <Link href={`/publications/${p.slug}`} className="link-underline">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{p.excerpt}</p>
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>
      )}
    </div>
  )
}
