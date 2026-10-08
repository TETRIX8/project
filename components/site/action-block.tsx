import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: string
  text?: string
  href: string
  cta: string
  external?: boolean
  meta?: string
  tone?: 'light' | 'dark'
  className?: string
}

/** Large call-to-action row: title + description on the left, a single button on the right. */
export function ActionBlock({ eyebrow, title, text, href, cta, external, meta, tone = 'light', className }: Props) {
  const dark = tone === 'dark'
  const buttonClass = cn(
    'inline-flex items-center justify-center gap-2 h-12 px-6 text-sm whitespace-nowrap rounded-sm transition-colors',
    'bg-accent text-accent-foreground hover:bg-accent/90',
  )
  const content = (
    <>
      {cta}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </>
  )
  return (
    <div
      className={cn(
        'grid gap-8 p-8 sm:p-10 md:grid-cols-[1fr_auto] md:items-end',
        dark ? 'bg-primary text-primary-foreground' : 'bg-secondary',
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <span className={cn('text-technical', dark ? 'text-primary-foreground/60' : 'text-muted-foreground')}>{eyebrow}</span>
        <h2 className="text-display text-3xl sm:text-4xl leading-tight text-balance">{title}</h2>
        {text ? (
          <p className={cn('text-sm leading-relaxed max-w-xl text-pretty', dark ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
            {text}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col items-start md:items-end gap-2">
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass}>
            {content}
          </a>
        ) : (
          <Link href={href} className={buttonClass}>
            {content}
          </Link>
        )}
        {meta ? (
          <span className={cn('text-xs', dark ? 'text-primary-foreground/60' : 'text-muted-foreground')}>{meta}</span>
        ) : null}
      </div>
    </div>
  )
}
