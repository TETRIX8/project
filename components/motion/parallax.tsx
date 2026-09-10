'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

/** Soft vertical parallax for large images. Children should be absolutely positioned/inset-0. */
export function Parallax({
  className,
  children,
  strength = 12,
}: {
  className?: string
  children: React.ReactNode
  /** Percentage of travel across the viewport */
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={reduce ? undefined : { y }}
        className={cn('absolute', reduce ? 'inset-0' : '-inset-y-[15%] inset-x-0')}
      >
        {children}
      </motion.div>
    </div>
  )
}
