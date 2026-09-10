import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { SiteImage } from '@/components/site/site-image'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaSection } from '@/components/site/cta-section'
import { ClipReveal, Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Parallax } from '@/components/motion/parallax'
import { images } from '@/lib/content/images'
import { expert } from '@/lib/content/expert'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Об эксперте — Татьяна Бочкарева',
  description:
    'Татьяна Владимировна Бочкарева — юрист по градостроительному праву, эксперт-консультант по градостроительству, правозащитник. Образование, роли, компетенции.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Об эксперте"
        title={expert.fullName}
        lead={expert.summary}
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Об эксперте' }]}
      />

      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <ClipReveal className="aspect-[4/5] overflow-hidden">
                <Parallax strength={30} className="h-full w-full">
                  <SiteImage
                    image={images.portraitStanding}
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-full w-full"
                    imgClassName="scale-[1.08]"
                    position="50% 20%"
                  />
                </Parallax>
              </ClipReveal>
              <Reveal className="flex items-start justify-between gap-6 text-technical text-muted-foreground">
                <span>{expert.position}</span>
                <span className="text-accent shrink-0">Москва</span>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-16">
            <div className="flex flex-col gap-6">
              <Reveal className="text-technical text-muted-foreground flex items-center gap-4">
                <span className="text-accent">Роли</span>
                <span aria-hidden="true" className="h-px w-8 bg-border" />
                <span>Профессиональная деятельность</span>
              </Reveal>
              <Stagger className="flex flex-col divide-y divide-border border-y border-border">
                {expert.roles.map((role, i) => (
                  <StaggerItem key={role} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                    <span className="text-technical text-accent tabular-nums pt-1">0{i + 1}</span>
                    <p className="text-lg leading-relaxed text-pretty">{role}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="flex flex-col gap-6">
              <Reveal className="text-technical text-muted-foreground flex items-center gap-4">
                <span className="text-accent">Образование</span>
                <span aria-hidden="true" className="h-px w-8 bg-border" />
                <span>Базовое</span>
              </Reveal>
              <Stagger className="grid gap-px bg-border sm:grid-cols-3">
                {expert.education.map((e) => (
                  <StaggerItem key={e.institution} className="bg-background p-6 flex flex-col gap-3 min-h-52">
                    <span className="text-technical text-accent">{e.degree}</span>
                    <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{e.institution}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="flex flex-col gap-6">
              <Reveal className="text-technical text-muted-foreground flex items-center gap-4">
                <span className="text-accent">Образование</span>
                <span aria-hidden="true" className="h-px w-8 bg-border" />
                <span>Дополнительное</span>
              </Reveal>
              <Stagger className="flex flex-wrap gap-2">
                {expert.additionalEducation.map((item) => (
                  <StaggerItem
                    key={item}
                    className="border border-border px-4 py-2 text-sm leading-relaxed hover:border-accent transition-colors"
                  >
                    {item}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="flex flex-col gap-6">
              <Reveal className="text-technical text-muted-foreground flex items-center gap-4">
                <span className="text-accent">Компетенции</span>
                <span aria-hidden="true" className="h-px w-8 bg-border" />
                <span>Ключевые направления</span>
              </Reveal>
              <Stagger className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {expert.competencies.map((c) => (
                  <StaggerItem key={c} className="flex items-baseline gap-3 text-lg">
                    <span aria-hidden="true" className="size-1.5 bg-accent shrink-0 translate-y-[-2px]" />
                    <span className="text-pretty">{c}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-x py-20 sm:py-28 grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-8 flex flex-col gap-8">
            <span className="text-technical text-primary-foreground/60">Из интервью</span>
            <blockquote className="text-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
              «{expert.quote}»
            </blockquote>
            <div className="flex items-center gap-4">
              <SiteImage
                image={images.signatureWhite}
                fill={false}
                className="w-40 bg-transparent"
                imgClassName="object-contain"
                sizes="160px"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-4 flex flex-col gap-6 lg:pl-10 lg:border-l lg:border-primary-foreground/15">
            <p className="text-sm leading-relaxed text-primary-foreground/70 text-pretty">
              Подробный рассказ о задачах и функционале Ассоциации — в интервью Татьяны Бочкаревой.
            </p>
            <Link
              href="/publications/tasks-and-functionality"
              className="inline-flex items-center gap-2 text-sm link-underline w-fit"
            >
              Читать интервью
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-24 flex flex-col gap-12">
        <SectionHeading
          index="02"
          eyebrow="Ассоциация"
          title={siteConfig.brand.legalName}
          lead="Ассоциация объединяет юристов, экспертов-консультантов по градостроительству и специалистов смежных областей, оказывая правовую помощь застройщикам, инвесторам, девелоперам и гражданам."
        />
        <div className="grid gap-px bg-border md:grid-cols-3">
          {[
            { href: '/services', label: 'Направления работы', text: 'Шесть направлений — от анализа потенциала территории до ввода объекта в эксплуатацию.' },
            { href: '/documents', label: 'Документы для вступления', text: 'Положение о членстве и взносах, формы заявлений для физических и юридических лиц.' },
            { href: '/projects', label: 'Деятельность', text: 'Форумы, соглашения, благотворительные инициативы и участие в экспертных советах.' },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-background p-8 flex flex-col gap-6 min-h-56 hover:bg-secondary transition-colors"
            >
              <span className="text-lg font-medium flex items-center justify-between gap-4">
                {card.label}
                <ArrowUpRight
                  className="size-5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{card.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection index="03" />
    </>
  )
}
