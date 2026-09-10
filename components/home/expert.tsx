import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { expert } from '@/lib/content/expert'
import { images } from '@/lib/content/images'
import { SiteImage } from '@/components/site/site-image'
import { ClipReveal, Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Parallax } from '@/components/motion/parallax'

export function ExpertSection() {
  return (
    <section id="expert" data-section="05" className="theme-dark bg-background text-foreground border-b border-border overflow-hidden">
      <div className="container-x py-20 sm:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ClipReveal direction="up" className="rounded-sm">
            <Parallax className="aspect-[4/5]" strength={8}>
              <SiteImage image={images.portraitStanding} sizes="(min-width: 1024px) 40vw, 100vw" position="45% 20%" />
            </Parallax>
          </ClipReveal>
          <Reveal className="flex items-center justify-between text-technical text-muted-foreground" y={8}>
            <span>{expert.fullName}</span>
            <span className="tabular-nums">05 / Эксперт</span>
          </Reveal>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <Reveal className="flex items-center gap-4 text-technical text-muted-foreground" y={8}>
              <span className="text-accent tabular-nums">05</span>
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              <span>Об эксперте</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl">
                {expert.firstName} {expert.patronymic}
                <br />
                {expert.lastName}
              </h2>
            </Reveal>
            <Reveal delay={0.14} className="flex flex-col gap-2">
              <p className="text-accent text-sm tracking-wide">{expert.position}</p>
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{expert.summary}</p>
            </Reveal>
          </div>

          <Stagger as="ul" className="flex flex-col divide-y divide-border border-y border-border">
            {expert.roles.map((role) => (
              <StaggerItem key={role} as="li" className="py-4 flex gap-4 text-sm sm:text-base leading-relaxed">
                <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-accent" />
                <span>{role}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="grid sm:grid-cols-2 gap-8">
            <Reveal className="flex flex-col gap-4">
              <h3 className="text-technical text-muted-foreground">Образование</h3>
              <ul className="flex flex-col gap-4">
                {expert.education.map((e) => (
                  <li key={e.institution} className="flex flex-col gap-1">
                    <span className="text-sm leading-snug">{e.institution}</span>
                    <span className="text-xs text-accent">{e.degree}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-4">
              <h3 className="text-technical text-muted-foreground">Дополнительное профессиональное образование</h3>
              <ul className="flex flex-col gap-2">
                {expert.additionalEducation.map((e) => (
                  <li key={e} className="text-sm leading-snug flex gap-3">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {e}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="flex flex-col gap-6 pt-4">
            <blockquote className="font-serif italic text-2xl sm:text-3xl leading-snug text-balance border-l border-accent pl-6">
              «{expert.quote}»
            </blockquote>
            <div className="flex items-center justify-between gap-6">
              <Image
                src={images.signatureWhite.src}
                alt={images.signatureWhite.alt}
                width={140}
                height={84}
                className="h-16 w-auto opacity-80"
              />
              <Link href="/about" className="inline-flex items-center gap-2 text-sm link-underline">
                Подробнее об эксперте
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
