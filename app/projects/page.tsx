import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { SectionHeading } from '@/components/site/section-heading'
import { SiteImage } from '@/components/site/site-image'
import { Gallery } from '@/components/site/gallery'
import { CtaSection } from '@/components/site/cta-section'
import { ClipReveal, Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { images } from '@/lib/content/images'
import { publications } from '@/lib/content/publications'

export const metadata: Metadata = {
  title: 'Деятельность — форумы, соглашения, благотворительность',
  description:
    'Участие в международных форумах, соглашения о сотрудничестве, благотворительные инициативы и экспертная работа Ассоциации правовой помощи в градостроительной деятельности.',
  alternates: { canonical: '/projects' },
}

const activityTypes = ['event', 'agreement', 'book'] as const

export default function ProjectsPage() {
  const activities = publications.filter((p) => (activityTypes as readonly string[]).includes(p.type))
  const featured = activities.find((p) => p.slug === 'pmuf-2025') ?? activities[0]
  const rest = activities.filter((p) => p.slug !== featured.slug)

  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Деятельность"
        title="Деятельность Ассоциации"
        lead="Форумы, соглашения и инициативы, в которых участвует Ассоциация: от Петербургского международного юридического форума до поддержки детских домов."
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Деятельность' }]}
      />

      <section className="container-x py-16 sm:py-24 flex flex-col gap-16">
        <Link
          href={`/publications/${featured.slug}`}
          className="group grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <ClipReveal className="lg:col-span-8 aspect-[16/9] overflow-hidden">
            <SiteImage
              image={images[featured.image]}
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="h-full w-full"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </ClipReveal>
          <Reveal className="lg:col-span-4 flex flex-col gap-5">
            <span className="text-technical text-muted-foreground flex items-center gap-3">
              <span className="text-accent">Главное</span>
              {featured.dateLabel ? <span>· {featured.dateLabel}</span> : null}
            </span>
            <h2 className="text-display text-3xl sm:text-4xl leading-tight text-balance group-hover:text-accent transition-colors">
              {featured.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm link-underline w-fit">
              Подробнее
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </Reveal>
        </Link>

        <Stagger className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <StaggerItem key={p.slug} className="bg-background">
              <Link href={`/publications/${p.slug}`} className="group flex flex-col h-full hover:bg-secondary transition-colors">
                <div className="aspect-[4/3] overflow-hidden">
                  <SiteImage
                    image={images[p.image]}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <span className="text-technical text-muted-foreground">{p.dateLabel ?? 'Событие'}</span>
                  <h3 className="text-lg font-medium leading-snug text-balance group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 text-pretty">{p.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-secondary">
        <div className="container-x py-16 sm:py-24 flex flex-col gap-12">
          <SectionHeading
            index="04"
            eyebrow="Благотворительность"
            title="Социальные инициативы"
            lead="Ассоциация поддерживает новогодние праздники для детей с ограниченными возможностями здоровья и воспитанников детских домов. Благодарственные письма — ниже."
          />
          <Stagger className="grid gap-8 sm:grid-cols-2 lg:max-w-4xl">
            {(['letterBelieve', 'letterPetrovsk'] as const).map((key) => (
              <StaggerItem key={key} className="flex flex-col gap-4">
                <div className="aspect-[1181/1665] overflow-hidden border border-border bg-background">
                  <SiteImage image={images[key]} sizes="(min-width: 640px) 40vw, 100vw" className="h-full w-full" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{images[key].caption}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-x py-16 sm:py-24 flex flex-col gap-12">
        <SectionHeading index="05" eyebrow="Галерея" title="Фотоархив" align="left" />
        <Gallery />
      </section>

      <CtaSection index="06" />
    </>
  )
}
