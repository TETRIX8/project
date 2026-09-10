'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { useMemo, type ComponentPropsWithoutRef, type ElementType } from 'react'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

type AnyMotion = typeof motion.div

const motionCache = new Map<ElementType, AnyMotion>()

/** motion.create() must not run on every render — cache one component per tag. */
function useMotionTag(tag: ElementType): AnyMotion {
  return useMemo(() => {
    let cached = motionCache.get(tag)
    if (!cached) {
      cached = motion.create(tag as keyof React.JSX.IntrinsicElements) as unknown as AnyMotion
      motionCache.set(tag, cached)
    }
    return cached
  }, [tag])
}

type RevealProps<T extends ElementType> = {
  as?: T
  delay?: number
  duration?: number
  y?: number
  once?: boolean
  amount?: number
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>

/** Fades and lifts children into view on scroll. Falls back to a plain fade with reduced motion. */
export function Reveal<T extends ElementType = 'div'>({
  as,
  delay = 0,
  duration = 0.7,
  y = 24,
  once = true,
  amount = 0.2,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const reduce = useReducedMotion()
  const Component = useMotionTag((as ?? 'div') as ElementType)
  return (
    <Component
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduce ? 0.2 : duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export function Stagger({
  className,
  children,
  amount = 0.2,
  as = 'div',
}: {
  className?: string
  children: React.ReactNode
  amount?: number
  as?: 'div' | 'ul' | 'ol' | 'section'
}) {
  const Component = useMotionTag(as)
  return (
    <Component
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  className,
  children,
  as = 'div',
  y = 20,
}: {
  className?: string
  children: React.ReactNode
  as?: 'div' | 'li' | 'p' | 'span' | 'h1' | 'h2' | 'h3'
  y?: number
}) {
  const reduce = useReducedMotion()
  const Component = useMotionTag(as)
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.65, ease: EASE } },
  }
  return (
    <Component variants={variants} className={className}>
      {children}
    </Component>
  )
}

/** Reveals an image by expanding its clip-path. */
export function ClipReveal({
  className,
  children,
  delay = 0,
  direction = 'up',
}: {
  className?: string
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left'
}) {
  const reduce = useReducedMotion()
  const hidden = direction === 'up' ? 'inset(100% 0 0 0)' : 'inset(0 100% 0 0)'
  // The observed wrapper stays unclipped: a fully clipped element has zero
  // area and IntersectionObserver would never report it as visible.
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: reduce ? { opacity: 0 } : { clipPath: hidden },
          show: reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0)' },
        }}
        transition={{ duration: reduce ? 0.3 : 1, delay, ease: EASE }}
        className="h-full w-full will-change-[clip-path]"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Splits a headline into words and staggers them in. */
export function SplitWords({
  text,
  className,
  delay = 0,
  as = 'span',
}: {
  text: string
  className?: string
  delay?: number
  as?: 'span' | 'h1' | 'h2'
}) {
  const reduce = useReducedMotion()
  const Component = motion.create(as)
  const words = text.split(' ')
  return (
    <Component
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 },
              show: { y: 0, opacity: 1, transition: { duration: reduce ? 0.2 : 0.8, ease: EASE } },
            }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span aria-hidden="true">&nbsp;</span> : null}
        </span>
      ))}
    </Component>
  )
}
