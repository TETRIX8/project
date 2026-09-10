'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

/** Tracks [data-section] elements and shows the current index in the page margin. */
export function SectionIndicator({ total }: { total: number }) {
  const [current, setCurrent] = useState('01')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) {
          const idx = hit.target.getAttribute('data-section')
          if (idx) setCurrent(idx)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.1, 0.5] },
    )
    sections.forEach((s) => observer.observe(s))
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 text-technical text-muted-foreground mix-blend-difference text-milk"
        >
          <span className="relative h-5 overflow-hidden tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={current}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="block"
              >
                {current}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="h-10 w-px bg-current opacity-40" />
          <span className="tabular-nums">{String(total).padStart(2, '0')}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
