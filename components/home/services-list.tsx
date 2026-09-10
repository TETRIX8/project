'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { services } from '@/lib/content/services'
import { images } from '@/lib/content/images'
import { SiteImage } from '@/components/site/site-image'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

/**
 * Editorial accordion: hover on desktop previews the image and short text;
 * tap on mobile expands the row. Only one row open at a time.
 */
export function ServicesList() {
  const [active, setActive] = useState<number>(0)
  const [open, setOpen] = useState<number | null>(null)
  const reduce = useReducedMotion()
  const preview = services[active] ?? services[0]

  return (
    <section id="services" data-section="03" className="theme-dark bg-background text-foreground border-b border-border">
      <div className="container-x py-20 sm:py-28 flex flex-col gap-14">
        <SectionHeading
          index="03"
          eyebrow="Направления"
          title="Услуги в сфере реализации инвестиционных строительных проектов"
          lead="Полный комплекс услуг на разных этапах жизненного цикла объекта — от планирования до ввода в эксплуатацию."
        />

        <div className="grid lg:grid-cols-12 gap-10">
          <ul className="lg:col-span-7 border-t border-border" onMouseLeave={() => setActive(open ?? 0)}>
            {services.map((s, i) => {
              const isOpen = open === i
              const isActive = active === i
              return (
                <li key={s.slug} className="border-b border-border">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${s.slug}`}
                    className="group w-full grid grid-cols-[3rem_1fr_2rem] items-start gap-3 sm:gap-6 py-5 sm:py-6 text-left"
                  >
                    <span
                      className={cn(
                        'text-technical tabular-nums pt-1.5 transition-colors',
                        isActive ? 'text-accent' : 'text-muted-foreground',
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        'font-serif text-2xl sm:text-3xl lg:text-[2.1rem] leading-tight transition-[transform,color] duration-300 ease-[var(--ease-out-expo)] text-balance',
                        isActive ? 'translate-x-1 text-foreground' : 'text-foreground/80',
                      )}
                    >
                      {s.title}
                    </span>
                    <span
                      className={cn(
                        'inline-flex size-8 items-center justify-center border border-border rounded-sm transition-all duration-300',
                        isOpen ? 'rotate-45 border-accent text-accent' : 'group-hover:border-foreground/50',
                      )}
                      aria-hidden="true"
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`service-panel-${s.slug}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[3rem_1fr_2rem] gap-3 sm:gap-6 pb-7">
                          <span aria-hidden="true" />
                          <div className="flex flex-col gap-5">
                            <div className="lg:hidden">
                              <SiteImage image={images[s.image]} className="aspect-[16/9] rounded-sm" sizes="100vw" />
                            </div>
                            <p className="text-base leading-relaxed text-muted-foreground max-w-prose">{s.short}</p>
                            <ul className="flex flex-col gap-2">
                              {s.points.slice(0, 4).map((pt) => (
                                <li key={pt} className="flex gap-3 text-sm leading-relaxed">
                                  <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                                  {pt}
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={`/services#${s.slug}`}
                              className="inline-flex items-center gap-2 text-sm link-underline self-start"
                            >
                              Подробнее о направлении
                              <ArrowUpRight className="size-4" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          <Reveal className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28 flex flex-col gap-5">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-secondary">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={preview.image + preview.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SiteImage image={images[preview.image]} className="h-full w-full" sizes="40vw" />
                  </motion.div>
                </AnimatePresence>
                <span className="absolute top-4 left-4 text-technical text-milk mix-blend-difference tabular-nums">
                  {preview.index} / {String(services.length).padStart(2, '0')}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={preview.slug}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2"
                >
                  <h3 className="font-medium">{preview.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{preview.short}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal className="flex">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm link-underline">
            Все направления и детали
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
