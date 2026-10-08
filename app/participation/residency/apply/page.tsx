import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { ApplicationForm } from '@/components/site/application-form'
import { Reveal } from '@/components/motion/reveal'
import { residencySteps } from '@/lib/content/participation'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Заявка на резидентство',
  description: 'Форма заявки на участие в программе резидентства Ассоциации правовой помощи в градостроительной деятельности.',
  alternates: { canonical: '/participation/residency/apply' },
}

export default function ResidencyApplyPage() {
  return (
    <>
      <PageHeader
        index="06.1"
        eyebrow="Резидентство"
        title="Заявка на резидентство"
        lead="Расскажите о компании и задачах — заявка придёт напрямую Татьяне Бочкаревой."
        crumbs={[
          { href: '/', label: 'Главная' },
          { href: '/participation', label: 'Участие' },
          { href: '/participation/residency', label: 'Резидентство' },
          { label: 'Заявка' },
        ]}
      />
      <section className="container-x py-16 sm:py-24 grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-4 flex flex-col gap-8">
          <span className="text-technical text-muted-foreground">Как присоединиться</span>
          <ol className="flex flex-col divide-y divide-border border-y border-border">
            {residencySteps.map((s, i) => (
              <li key={s} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5">
                <span className="text-accent tabular-nums text-technical pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
          <a href={siteConfig.participation.presentationUrl} target="_blank" rel="noopener noreferrer" className="text-sm link-underline w-fit">
            Открыть презентацию о резидентстве
          </a>
        </Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <ApplicationForm formId="residency" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
