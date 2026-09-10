'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { SiteImage } from '@/lib/content/images'
import { cn } from '@/lib/utils'

type Props = {
  items: SiteImage[]
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
}

/**
 * Accessible fullscreen viewer: focus trap, Escape to close, arrow keys to
 * navigate, animated open/close. Renders nothing when index is null.
 */
export function Lightbox({ items, index, onClose, onChange }: Props) {
  const reduce = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const open = index !== null
  const current = open ? items[index] : null

  const prev = useCallback(() => {
    if (index === null) return
    onChange((index - 1 + items.length) % items.length)
  }, [index, items.length, onChange])
  const next = useCallback(() => {
    if (index === null) return
    onChange((index + 1) % items.length)
  }, [index, items.length, onChange])

  useEffect(() => {
    setLoaded(false)
  }, [index])

  useEffect(() => {
    if (!open) return
    returnFocusRef.current = document.activeElement as HTMLElement
    document.documentElement.style.overflow = 'hidden'
    const focusables = () =>
      Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [])
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Tab') {
        const list = focusables()
        if (!list.length) return
        const first = list[0]
        const last = list[list.length - 1]
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
      returnFocusRef.current?.focus()
    }
  }, [open, onClose, prev, next])

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? current.alt}
          className="theme-dark fixed inset-0 z-[90] bg-graphite-deep/95 backdrop-blur-sm text-foreground flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <div className="container-x flex items-center justify-between h-16 shrink-0">
            <span className="text-technical text-muted-foreground tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть просмотр"
              className="inline-flex size-10 items-center justify-center rounded-sm hover:bg-secondary transition-colors"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-16">
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Предыдущее изображение"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 inline-flex size-11 items-center justify-center rounded-sm bg-background/40 hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Следующее изображение"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 inline-flex size-11 items-center justify-center rounded-sm bg-background/40 hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            ) : null}

            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                className="relative w-full h-full max-h-[70vh] sm:max-h-[78vh]"
                initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {!loaded ? <div className="absolute inset-0 skeleton" aria-hidden="true" /> : null}
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  onLoad={() => setLoaded(true)}
                  className={cn('object-contain transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0')}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="container-x py-5 shrink-0 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 text-sm">
            <p className="text-foreground text-pretty">{current.caption ?? current.alt}</p>
            {current.source ? (
              <p className="text-technical text-muted-foreground">Источник: {current.source}</p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
