'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { images } from '@/lib/content/images'
import { SiteImage } from '@/components/site/site-image'
import { SplitWords } from '@/components/motion/reveal'
import { Parallax } from '@/components/motion/parallax'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section
      id="hero"
      data-section="01"
      className="theme-dark relative bg-background text-foreground min-h-svh flex flex-col overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60 mask-fade-b pointer-events-none" />

      <div className="relative container-x flex-1 grid lg:grid-cols-12 gap-10 lg:gap-8 pt-28 sm:pt-36 lg:pt-40 pb-12">
        <div className="lg:col-span-7 flex flex-col justify-between gap-12">
          <div className="flex flex-col gap-8">
            <motion.div
              className="flex items-center gap-4 text-technical text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-accent tabular-nums">01</span>
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              <span>{siteConfig.brand.tagline}</span>
            </motion.div>

            <h1 className="text-display text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-[4.25rem] xl:text-[5rem] max-w-[18ch]">
              <SplitWords text="Комплексная реализация инвестиционных строительных проектов" delay={0.15} />
            </h1>

            <motion.p
              className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl text-pretty"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            >
              Градостроительный консалтинг, юридическое и организационное сопровождение, разработка
              градостроительной документации и редевелопмент территорий — от анализа участка до ввода
              объекта в эксплуатацию.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            >
              <Link
                href="/contacts#form"
                className="inline-flex items-center justify-center gap-2 h-13 px-7 bg-accent text-accent-foreground rounded-sm text-sm hover:bg-accent/90 transition-colors"
              >
                Обсудить проект
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 h-13 px-7 border border-border text-foreground rounded-sm text-sm hover:border-foreground/60 transition-colors"
              >
                Изучить направления
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:flex items-end justify-between text-technical text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="flex items-center gap-4">
              <span className="relative block w-px h-14 bg-border overflow-hidden scroll-cue text-accent" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <ArrowDown className="size-3" aria-hidden="true" />
                Листайте
              </span>
            </div>
            <span>{siteConfig.brand.legalName}</span>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5 relative"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
        >
          <Parallax className="aspect-[4/5] sm:aspect-[5/6] lg:aspect-auto lg:h-full lg:min-h-[32rem] rounded-sm" strength={8}>
            <SiteImage image={images.portraitDesk} priority sizes="(min-width: 1024px) 40vw, 100vw" position="50% 20%" />
          </Parallax>
          <div className="absolute left-4 bottom-4 lg:left-6 lg:bottom-6 bg-background/95 backdrop-blur text-foreground border border-border px-4 py-3 flex flex-col gap-1 max-w-[min(85%,18rem)]">
            <span className="text-technical text-accent">Эксперт</span>
            <span className="font-serif text-xl leading-tight">Татьяна Владимировна Бочкарева</span>
            <span className="text-xs text-muted-foreground leading-snug">
              Юрист по градостроительному праву, эксперт-консультант по градостроительству
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
