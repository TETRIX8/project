'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site-config'

const SESSION_KEY = 'gp:loaded'
const DURATION_MS = 1500

/**
 * Full-screen brand loader. Runs once per session (sessionStorage), never
 * blocks longer than ~1.6s, and collapses to a quick fade with reduced motion.
 */
export function Loader() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      seen = false
    }
    if (seen) return

    setVisible(true)
    document.documentElement.style.overflow = 'hidden'
    const total = reduce ? 500 : DURATION_MS
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {}
        setTimeout(() => {
          setVisible(false)
          document.documentElement.style.overflow = ''
        }, 150)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.style.overflow = ''
    }
  }, [reduce])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label="Загрузка сайта"
          className="theme-dark fixed inset-0 z-[100] bg-background text-foreground flex flex-col"
          initial={{ y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduce ? 0.2 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60 mask-fade-b" />
          <div className="relative flex-1 container-x flex flex-col justify-between py-6 sm:py-8">
            <div className="flex items-start justify-between text-technical text-muted-foreground">
              <span>{siteConfig.brand.legalName}</span>
              <span className="tabular-nums">{String(progress).padStart(3, '0')}%</span>
            </div>

            <div className="flex flex-col gap-8 items-start">
              <div className="flex items-baseline gap-5">
                <Monogram />
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-2xl sm:text-3xl leading-none">
                    {siteConfig.brand.name}
                  </span>
                  <span className="text-technical text-muted-foreground">{siteConfig.brand.tagline}</span>
                </div>
              </div>
              <motion.p
                className="font-serif italic text-2xl sm:text-4xl lg:text-5xl leading-tight text-balance max-w-2xl"
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {siteConfig.brand.loaderPhrase}
              </motion.p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="h-px w-full bg-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between text-technical text-muted-foreground">
                <span>00 — Загрузка</span>
                <span>Москва</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Monogram() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true" className="shrink-0">
      <motion.rect
        x="1"
        y="1"
        width="42"
        height="42"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M12 32V12h9a6 6 0 0 1 0 12h-9M21 24a6 6 0 0 1 0 12h-9"
        stroke="currentColor"
        strokeWidth="1.25"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
      />
      <motion.rect x="29" y="12" width="4" height="20" fill="var(--copper)" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1 }} transition={{ duration: 0.8, delay: 0.7 }} />
    </svg>
  )
}
