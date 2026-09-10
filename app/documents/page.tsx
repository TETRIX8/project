import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { CtaSection } from '@/components/site/cta-section'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { membershipDocuments } from '@/lib/content/documents'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Документы для вступления в Ассоциацию',
  description:
    'Положение о членстве и взносах, заявления о входе и выходе для физических и юридических лиц — документы Ассоциации правовой помощи в градостроительной деятельности.',
  alternates: { canonical: '/documents' },
}

export default function DocumentsPage() {
  const regulations = membershipDocuments.filter((d) => d.kind === 'Положение')
  const forms = membershipDocuments.filter((d) => d.kind === 'Заявление')

  return (
    <>
      <PageHeader
        index="05"
        eyebrow="Документы"
        title="Документы для вступления"
        lead="Положение о членстве и формы заявлений. Заполненные документы направляйте на электронную почту Ассоциации."
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Документы' }]}
      />

      <section className="container-x py-16 sm:py-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <Reveal className="flex flex-col gap-3">
            <span className="text-technical text-muted-foreground">Как вступить</span>
            <ol className="flex flex-col gap-4 text-sm leading-relaxed">
              <li className="grid grid-cols-[2rem_1fr] gap-2">
                <span className="text-accent tabular-nums">01</span>
                <span>Ознакомьтесь с Положением о членстве и взносах.</span>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-2">
                <span className="text-accent tabular-nums">02</span>
                <span>Скачайте и заполните заявление для физического или юридического лица.</span>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-2">
                <span className="text-accent tabular-nums">03</span>
                <span>
                  Направьте заявление на{' '}
                  <a href={`mailto:${siteConfig.contact.email}`} className="link-underline">
                    {siteConfig.contact.email}
                  </a>
                  .
                </span>
              </li>
            </ol>
          </Reveal>
          <Reveal className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Документы открываются на Google Диске. Если ссылка не открывается — напишите нам, мы отправим файл на
            почту.
          </Reveal>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <Reveal className="text-technical text-muted-foreground flex items-center gap-4">
              <span className="text-accent">Положения</span>
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              <span>{regulations.length}</span>
            </Reveal>
            <Stagger className="flex flex-col divide-y divide-border border-y border-border">
              {regulations.map((d) => (
                <StaggerItem key={d.href}>
                  <DocumentRow doc={d} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="flex flex-col gap-6">
            <Reveal className="text-technical text-muted-foreground flex items-center gap-4">
              <span className="text-accent">Заявления</span>
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              <span>{forms.length}</span>
            </Reveal>
            <Stagger className="flex flex-col divide-y divide-border border-y border-border">
              {forms.map((d) => (
                <StaggerItem key={d.href}>
                  <DocumentRow doc={d} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <CtaSection index="06" />
    </>
  )
}

function DocumentRow({ doc }: { doc: (typeof membershipDocuments)[number] }) {
  return (
    <Link
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 hover:text-accent transition-colors"
    >
      <FileText className="size-5 text-muted-foreground group-hover:text-accent transition-colors" aria-hidden="true" />
      <span className="flex flex-col gap-1">
        <span className="font-medium leading-snug text-balance">{doc.title}</span>
        <span className="text-sm leading-relaxed text-muted-foreground text-pretty">{doc.description}</span>
      </span>
      <span className="text-technical flex items-center gap-2 text-muted-foreground group-hover:text-accent">
        <span className="hidden sm:inline">Открыть</span>
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}
