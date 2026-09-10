import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { images } from '@/lib/content/images'
import { Hero } from '@/components/home/hero'
import { Trust } from '@/components/home/trust'
import { ServicesList } from '@/components/home/services-list'
import { Methodology } from '@/components/home/methodology'
import { ExpertSection } from '@/components/home/expert'
import { SectionIndicator } from '@/components/home/section-indicator'
import { SectionHeading } from '@/components/site/section-heading'
import { PublicationsGrid } from '@/components/site/publications-grid'
import { Gallery } from '@/components/site/gallery'
import { CtaSection } from '@/components/site/cta-section'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} — юридический и градостроительный консалтинг`,
  description:
    'Юридический консалтинг в градостроительстве: сопровождение инвестиционных строительных проектов, градостроительная документация, редевелопмент территорий, правовая помощь застройщикам и инвесторам. Москва.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `${siteConfig.brand.name} — юридический и градостроительный консалтинг`,
    description:
      'Комплексная реализация инвестиционных строительных проектов: градостроительный консалтинг, юридическое сопровождение, градостроительная документация, редевелопмент.',
    url: '/',
    images: [{ url: images.portraitDesk.src, width: images.portraitDesk.width, height: images.portraitDesk.height, alt: images.portraitDesk.alt }],
  },
}

export default function HomePage() {
  return (
    <main id="main" className="flex flex-col">
      <SectionIndicator total={8} />
      <Hero />
      <Trust />
      <ServicesList />
      <Methodology />
      <ExpertSection />

      <section id="publications" data-section="06" className="bg-background text-foreground border-b border-border">
        <div className="container-x py-20 sm:py-28 flex flex-col gap-14">
          <SectionHeading
            index="06"
            eyebrow="Публикации и профессиональная деятельность"
            title="Форумы, статьи, книги и соглашения"
            lead="Материалы о международных форумах, профессиональных инициативах и авторские статьи о градостроительном консалтинге."
          />
          <PublicationsGrid limit={6} extraFilters={[{ label: 'Документы и сертификаты', href: '/documents' }]} />
          <Reveal className="flex">
            <Link href="/publications" className="inline-flex items-center gap-2 text-sm link-underline">
              Все публикации
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="gallery" data-section="07" className="bg-background text-foreground border-b border-border">
        <div className="container-x py-20 sm:py-28 flex flex-col gap-14">
          <SectionHeading
            index="07"
            eyebrow="Изображения и документы"
            title="Мероприятия, благодарности, портреты"
            lead="Фотографии с форумов, благодарственные письма и портреты. Нажмите на изображение, чтобы открыть полноэкранный просмотр."
          />
          <Gallery />
          <Reveal className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
            <Link href="/projects" className="inline-flex items-center gap-2 link-underline text-foreground">
              Вся профессиональная деятельность
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection index="08" />
    </main>
  )
}
