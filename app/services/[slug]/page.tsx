import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { SiteImage } from '@/components/site/site-image'
import { CtaSection } from '@/components/site/cta-section'
import { ClipReveal, Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Parallax } from '@/components/motion/parallax'
import { images } from '@/lib/content/images'
import { services } from '@/lib/content/services'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params
  const idx = services.findIndex((s) => s.slug === slug)
  if (idx === -1) notFound()
  const service = services[idx]
  const prev = services[(idx - 1 + services.length) % services.length]
  const next = services[(idx + 1) % services.length]

  return (
    <>
      <PageHeader
        index={service.index}
        eyebrow="Направление"
        title={service.title}
        lead={service.short}
        crumbs={[{ href: '/', label: 'Главная' }, { href: '/services', label: 'Направления' }, { label: service.title }]}
      />

      <section className="container-x py-16 sm:py-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ClipReveal className="aspect-[4/3] lg:aspect-[3/4] overflow-hidden lg:sticky lg:top-28">
            <Parallax strength={30} className="h-full w-full">
              <SiteImage
                image={images[service.image]}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full"
                imgClassName="scale-[1.08]"
              />
            </Parallax>
          </ClipReveal>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-12">
          <Reveal>
            <p className="text-xl sm:text-2xl leading-relaxed text-pretty">{service.description}</p>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal className="text-technical text-muted-foreground flex items-center gap-4">
              <span className="text-accent">Состав работ</span>
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              <span>Что входит</span>
            </Reveal>
            <Stagger className="flex flex-col divide-y divide-border border-y border-border">
              {service.points.map((p, i) => (
                <StaggerItem key={p} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="text-technical text-accent tabular-nums pt-1">0{i + 1}</span>
                  <p className="leading-relaxed text-pretty">{p}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal className="bg-secondary p-8 flex flex-col gap-4">
            <span className="text-technical text-muted-foreground">Формат работы</span>
            <p className="leading-relaxed text-muted-foreground text-pretty">
              Первичная консультация — по телефону, в Telegram или WhatsApp. После обсуждения задачи готовим
              предложение с составом работ и порядком взаимодействия.
            </p>
            <Link href="/contacts#form" className="inline-flex items-center gap-2 text-sm link-underline w-fit">
              Обсудить задачу
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <nav aria-label="Другие направления" className="border-y border-border">
        <div className="container-x grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <Link href={`/services/${prev.slug}`} className="group py-8 sm:pr-8 flex flex-col gap-3 hover:text-accent transition-colors">
            <span className="text-technical text-muted-foreground flex items-center gap-2">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              Предыдущее · {prev.index}
            </span>
            <span className="text-lg font-medium text-balance">{prev.title}</span>
          </Link>
          <Link href={`/services/${next.slug}`} className="group py-8 sm:pl-8 flex flex-col gap-3 sm:items-end sm:text-right hover:text-accent transition-colors">
            <span className="text-technical text-muted-foreground flex items-center gap-2">
              Следующее · {next.index}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="text-lg font-medium text-balance">{next.title}</span>
          </Link>
        </div>
      </nav>

      <CtaSection index="07" />
    </>
  )
}
