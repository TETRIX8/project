import { Breadcrumbs, type Crumb } from './breadcrumbs'
import { Reveal, SplitWords } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type Props = {
  index: string
  eyebrow: string
  title: string
  lead?: string
  crumbs: Crumb[]
  className?: string
  children?: React.ReactNode
}

/** Shared editorial header for inner pages: breadcrumbs, section index, display title and lead. */
export function PageHeader({ index, eyebrow, title, lead, crumbs, className, children }: Props) {
  return (
    <section className={cn('relative pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-border', className)}>
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50 mask-fade-b pointer-events-none" />
      <div className="relative container-x flex flex-col gap-10">
        <Breadcrumbs items={crumbs} />
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8 flex flex-col gap-5">
            <Reveal className="flex items-center gap-4 text-technical text-muted-foreground" y={8}>
              <span className="text-accent tabular-nums">{index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              <span>{eyebrow}</span>
            </Reveal>
            <h1 className="text-display text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              <SplitWords text={title} />
            </h1>
          </div>
          {lead ? (
            <Reveal delay={0.25} className="lg:col-span-4 text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>{lead}</p>
            </Reveal>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}
