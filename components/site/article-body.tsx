import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Block } from '@/lib/content/publications'
import { Reveal } from '@/components/motion/reveal'

/** Renders structured article blocks with editorial typography. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-8 text-lg leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <Reveal key={i} as="p" className="text-pretty" y={12}>
                {block.text}
              </Reveal>
            )
          case 'h2':
            return (
              <Reveal key={i} as="h2" className="text-display text-3xl sm:text-4xl mt-6 text-balance" y={12}>
                {block.text}
              </Reveal>
            )
          case 'h3':
            return (
              <Reveal key={i} as="h3" className="text-2xl font-medium mt-4 text-balance" y={12}>
                {block.text}
              </Reveal>
            )
          case 'quote':
            return (
              <Reveal key={i} as="figure" className="border-l-2 border-accent pl-6 py-2 flex flex-col gap-4" y={12}>
                <blockquote className="text-display text-2xl sm:text-3xl leading-snug text-balance">«{block.text}»</blockquote>
                {block.author ? <figcaption className="text-technical text-muted-foreground">{block.author}</figcaption> : null}
              </Reveal>
            )
          case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul'
            return (
              <Reveal key={i} as={Tag} className="flex flex-col gap-3" y={12}>
                {block.items.map((item, j) => (
                  <li key={j} className="grid grid-cols-[2.5rem_1fr] gap-2">
                    <span className="text-technical text-accent tabular-nums pt-2">
                      {block.ordered ? String(j + 1).padStart(2, '0') : '—'}
                    </span>
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </Reveal>
            )
          }
          case 'dialog':
            return (
              <Reveal key={i} className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6" y={12}>
                <span className="text-technical text-accent pt-2">{block.speaker}</span>
                <p className="text-pretty">{block.text}</p>
              </Reveal>
            )
          case 'terms':
            return (
              <Reveal key={i} as="dl" className="flex flex-col divide-y divide-border border-y border-border" y={12}>
                {block.items.map((t) => (
                  <div key={t.term} className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                    <dt className="font-medium text-base leading-snug text-balance">{t.term}</dt>
                    <dd className="text-base leading-relaxed text-muted-foreground text-pretty">{t.text}</dd>
                  </div>
                ))}
              </Reveal>
            )
          case 'links':
            return (
              <Reveal key={i} className="flex flex-col gap-3 bg-secondary p-6" y={12}>
                <span className="text-technical text-muted-foreground">Ссылки</span>
                <ul className="flex flex-col gap-2">
                  {block.items.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-base link-underline"
                      >
                        {l.label}
                        <ArrowUpRight className="size-4 text-accent" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
