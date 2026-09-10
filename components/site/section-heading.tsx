import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type Props = {
  index: string
  eyebrow: string
  title: string
  lead?: string
  align?: 'left' | 'split'
  className?: string
  as?: 'h2' | 'h3'
}

export function SectionHeading({ index, eyebrow, title, lead, align = 'split', className, as = 'h2' }: Props) {
  const Heading = as
  return (
    <div className={cn('grid gap-6 lg:gap-10', align === 'split' && 'lg:grid-cols-12 lg:items-end', className)}>
      <div className={cn('flex flex-col gap-5', align === 'split' && 'lg:col-span-7')}>
        <Reveal className="flex items-center gap-4 text-technical text-muted-foreground" y={8}>
          <span className="text-accent tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          <span>{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <Heading className="text-display text-3xl sm:text-5xl lg:text-6xl">{title}</Heading>
        </Reveal>
      </div>
      {lead ? (
        <Reveal
          delay={0.16}
          className={cn(
            'text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty',
            align === 'split' && 'lg:col-span-5 lg:pb-2',
          )}
        >
          <p>{lead}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
