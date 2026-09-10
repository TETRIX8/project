'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { methodology } from '@/lib/content/services'
import { SectionHeading } from '@/components/site/section-heading'
import { Stagger, StaggerItem } from '@/components/motion/reveal'

export function Methodology() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="method" data-section="04" className="bg-background text-foreground border-b border-border">
      <div className="container-x py-20 sm:py-28 flex flex-col gap-14">
        <SectionHeading
          index="04"
          eyebrow="Методология"
          title="Путь проекта: от исходных данных до ввода в эксплуатацию"
          lead="Шесть этапов, на каждом из которых снижаются риски, соблюдаются нормативные требования и экономятся время и деньги заказчика."
        />

        <div ref={ref} className="relative">
          {/* Vertical rail on mobile, horizontal rail on desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[1.1rem] top-0 bottom-0 w-px bg-border lg:left-0 lg:right-0 lg:top-[1.1rem] lg:bottom-auto lg:w-auto lg:h-px"
          >
            <motion.span
              className="absolute inset-0 bg-accent origin-top lg:origin-left"
              style={reduce ? undefined : { scaleY: progress }}
            />
            <motion.span
              className="hidden lg:block absolute inset-0 bg-accent origin-left"
              style={reduce ? undefined : { scaleX: progress }}
            />
          </div>

          <Stagger as="ol" className="grid lg:grid-cols-6 gap-10 lg:gap-6" amount={0.15}>
            {methodology.map((step) => (
              <StaggerItem key={step.index} as="li" className="relative pl-12 lg:pl-0 flex flex-col gap-4">
                <span
                  className="absolute left-0 top-0 lg:static inline-flex size-9 items-center justify-center rounded-full bg-background border border-border text-technical tabular-nums text-accent"
                  aria-hidden="true"
                >
                  {step.index}
                </span>
                <span className="sr-only">Шаг {step.index}</span>
                <div className="flex flex-col gap-3 lg:pt-2">
                  <h3 className="font-serif text-2xl leading-tight text-balance">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
