'use client'

import { useMemo, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { images } from '@/lib/content/images'
import { galleryCategories, galleryItems, type GalleryCategory } from '@/lib/content/gallery'
import { Lightbox } from './lightbox'
import { SiteImage } from './site-image'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type Filter = GalleryCategory | 'all'

export function Gallery({ showFilters = true, limit }: { showFilters?: boolean; limit?: number }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [active, setActive] = useState<number | null>(null)

  const items = useMemo(() => {
    const list = filter === 'all' ? galleryItems : galleryItems.filter((g) => g.category === filter)
    return (limit ? list.slice(0, limit) : list).map((g) => ({ ...g, data: images[g.image] }))
  }, [filter, limit])

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Все' },
    ...(Object.keys(galleryCategories) as GalleryCategory[]).map((k) => ({ key: k, label: galleryCategories[k] })),
  ]

  return (
    <div className="flex flex-col gap-8">
      {showFilters ? (
        <div role="tablist" aria-label="Фильтр галереи" className="flex flex-wrap gap-2">
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
        </div>
      ) : null}

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm py-10 border border-dashed border-border text-center">
          В этой категории пока нет материалов.
        </p>
      ) : (
        <Stagger key={filter} as="ul" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" amount={0.1}>
          {items.map((item, i) => {
            const portrait = item.data.height > item.data.width
            return (
              <StaggerItem key={item.image} as="li" className={cn(portrait && 'row-span-2')}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative block w-full h-full text-left rounded-sm overflow-hidden focus-visible:outline-offset-2"
                  aria-label={`Открыть: ${item.data.caption ?? item.data.alt}`}
                >
                  <SiteImage
                    image={item.data}
                    className={cn('h-full w-full', portrait ? 'aspect-[3/4] md:aspect-auto md:h-full' : 'aspect-[4/3]')}
                    imgClassName="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-graphite-deep/80 via-graphite-deep/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between gap-3 text-milk opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-500">
                    <span className="text-xs leading-snug line-clamp-2">{item.data.caption ?? item.data.alt}</span>
                    <Maximize2 className="size-4 shrink-0" aria-hidden="true" />
                  </span>
                  <span className="absolute top-3 left-3 text-technical text-milk/90 mix-blend-difference tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              </StaggerItem>
            )
          })}
        </Stagger>
      )}

      <Lightbox items={items.map((i) => i.data)} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </div>
  )
}
