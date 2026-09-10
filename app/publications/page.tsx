import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { PublicationsGrid } from '@/components/site/publications-grid'
import { CtaSection } from '@/components/site/cta-section'

export const metadata: Metadata = {
  title: 'Публикации — статьи, форумы, интервью',
  description:
    'Статьи о градостроительном консалтинге, интервью, отчёты с форумов, соглашения и поздравления от Ассоциации правовой помощи в градостроительной деятельности.',
  alternates: { canonical: '/publications' },
}

export default function PublicationsPage() {
  return (
    <>
      <PageHeader
        index="04"
        eyebrow="Публикации"
        title="Публикации"
        lead="Статьи, интервью и отчёты о мероприятиях. Все материалы — от первого лица, без пересказов."
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Публикации' }]}
      />
      <section className="container-x py-16 sm:py-24">
        <PublicationsGrid extraFilters={[{ label: 'Документы', href: '/documents' }]} />
      </section>
      <CtaSection index="05" />
    </>
  )
}
