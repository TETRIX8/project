import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { participationDirections } from '@/lib/content/participation'

export const metadata: Metadata = {
  title: 'Участие — резидентство и законодательная инициатива',
  description:
    'Станьте резидентом Ассоциации правовой помощи в градостроительной деятельности или предложите свою законодательную инициативу.',
  alternates: { canonical: '/participation' },
}

export default function ParticipationPage() {
  return (
    <>
      <PageHeader
        index="06"
        eyebrow="Участие"
        title="Участие в работе Ассоциации"
        lead="Два формата участия: партнёрское резидентство для компаний отрасли и законодательная инициатива для всех, кто хочет улучшить градостроительное регулирование."
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Участие' }]}
      />

      <section className="container-x py-16 sm:py-24">
        <Stagger className="grid gap-px bg-border md:grid-cols-2">
          {participationDirections.map((d) => (
            <StaggerItem key={d.slug} className="bg-background">
              <Link
                href={`/participation/${d.slug}`}
                className="group flex flex-col gap-10 p-8 sm:p-10 h-full min-h-80 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center justify-between text-technical">
                  <span className="text-accent tabular-nums">{d.index}</span>
                  <ArrowUpRight
                    className="size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-4 mt-auto">
                  <h2 className="text-display text-3xl sm:text-4xl leading-tight text-balance">{d.title}</h2>
                  <p className="text-base leading-relaxed text-muted-foreground text-pretty max-w-md">{d.short}</p>
                  <span className="inline-flex items-center gap-2 text-sm mt-2 w-fit link-underline group-hover:text-accent">
                    Подробнее
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  )
}
