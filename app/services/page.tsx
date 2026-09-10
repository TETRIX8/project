import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaSection } from '@/components/site/cta-section'
import { Methodology } from '@/components/home/methodology'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { services, advantages } from '@/lib/content/services'

export const metadata: Metadata = {
  title: 'Направления работы — градостроительный консалтинг и правовое сопровождение',
  description:
    'Градостроительный консалтинг, юридическое сопровождение проектов, анализ потенциала территорий, изменение ПЗЗ и ВРИ, согласования, ввод в эксплуатацию.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Направления"
        title="Направления работы"
        lead="Шесть направлений, которые закрывают полный цикл градостроительного проекта — от анализа территории до ввода объекта в эксплуатацию."
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Направления' }]}
      />

      <section className="container-x py-16 sm:py-24">
        <Stagger className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.slug} className="bg-background">
              <Link
                href={`/services/${s.slug}`}
                className="group flex flex-col gap-8 p-8 h-full min-h-72 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center justify-between text-technical">
                  <span className="text-accent tabular-nums">{s.index}</span>
                  <ArrowUpRight
                    className="size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-4 mt-auto">
                  <h2 className="text-display text-2xl sm:text-3xl leading-tight text-balance">{s.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{s.short}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
          <StaggerItem className="bg-primary text-primary-foreground md:col-span-2 xl:col-span-2">
            <div className="flex flex-col justify-between gap-10 p-8 h-full min-h-72">
              <span className="text-technical text-primary-foreground/60">Не нашли своё направление?</span>
              <div className="flex flex-col gap-6">
                <p className="text-display text-2xl sm:text-3xl leading-tight text-balance max-w-2xl">
                  Опишите задачу — подберём формат сопровождения под ваш проект.
                </p>
                <Link
                  href="/contacts#form"
                  className="inline-flex items-center gap-2 h-11 px-5 w-fit bg-accent text-accent-foreground hover:bg-accent/90 transition-colors text-sm"
                >
                  Обсудить задачу
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      <section className="bg-secondary">
        <div className="container-x py-16 sm:py-24 flex flex-col gap-12">
          <SectionHeading index="03" eyebrow="Почему мы" title="Наши преимущества" />
          <Stagger className="grid gap-10 md:grid-cols-3">
            {advantages.map((a) => (
              <StaggerItem key={a.title} className="flex flex-col gap-4 border-t border-foreground/20 pt-6">
                <h3 className="text-xl font-medium">{a.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{a.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Methodology index="04" />

      <CtaSection index="05" />
    </>
  )
}
