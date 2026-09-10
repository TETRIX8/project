'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

export function SiteHeader() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = 'hidden'
    const focusable = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )
    focusable()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const items = focusable()
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isDarkHero = pathname === '/' || pathname === '/contacts'
  const transparent = !scrolled && !open && isDarkHero

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
          transparent
            ? 'theme-dark bg-transparent border-b border-transparent text-foreground'
            : 'bg-background/85 backdrop-blur-md border-b border-border',
          open && 'theme-dark bg-background border-transparent',
        )}
      >
        <div className="container-x flex items-center justify-between h-16 sm:h-20">
          <Logo />

          <nav aria-label="Основная навигация" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'link-underline text-sm tracking-wide transition-colors whitespace-nowrap',
                    active ? 'link-underline-active' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={siteConfig.contact.phoneHref}
              className="hidden md:max-lg:inline-flex xl:inline-flex items-center gap-2 text-sm tabular-nums whitespace-nowrap link-underline"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
            <Link
              href="/contacts#form"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 text-sm whitespace-nowrap bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-sm"
            >
              Обсудить проект
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              className="lg:hidden inline-flex items-center justify-center size-10 -mr-2 rounded-sm"
            >
              <span className="relative block w-6 h-3.5" aria-hidden="true">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-out-expo)]',
                    open && 'translate-y-[7px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 bottom-0 h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-out-expo)]',
                    open && '-translate-y-[6px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            className="theme-dark fixed inset-0 z-40 bg-background text-foreground flex flex-col pt-16 sm:pt-20"
            initial={{ opacity: 0, y: reduce ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40 mask-fade-b pointer-events-none" />
            <div className="relative container-x flex-1 flex flex-col justify-between py-8 overflow-y-auto">
              <nav aria-label="Мобильная навигация">
                <ul className="flex flex-col">
                  {[{ href: '/', label: 'Главная' }, ...siteConfig.nav].map((item, i) => {
                    const active = pathname === item.href
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: reduce ? 0 : -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-border"
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className="flex items-baseline justify-between gap-4 py-4 group"
                        >
                          <span className="font-serif text-3xl sm:text-4xl leading-none group-hover:text-accent transition-colors">
                            {item.label}
                          </span>
                          <span className="text-technical text-muted-foreground tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              <div className="flex flex-col gap-6 pt-10">
                <div className="flex flex-col gap-2">
                  <span className="text-technical text-muted-foreground">Связаться</span>
                  <a href={siteConfig.contact.phoneHref} className="font-serif text-2xl tabular-nums link-underline self-start">
                    {siteConfig.contact.phone}
                  </a>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-muted-foreground link-underline self-start">
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <a className="link-underline" href={siteConfig.social.telegram} target="_blank" rel="noreferrer">Telegram</a>
                  <a className="link-underline" href={siteConfig.social.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                  <a className="link-underline" href={siteConfig.social.dzen} target="_blank" rel="noreferrer">Дзен</a>
                </div>
                <Link
                  href="/contacts#form"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-accent text-accent-foreground rounded-sm text-sm"
                >
                  Обсудить проект
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
