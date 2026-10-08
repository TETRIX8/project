import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { ActionBlock } from '@/components/site/action-block'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { initiativeSteps } from '@/lib/content/participation'

export const metadata: Metadata = {
  title: 'Законодательная инициатива',
  description:
    'Предложите свою законодательную инициативу по совершенствованию градостроительного и земельного законодательства.',
  alternates: { canonical: '/participation/initiative' },
}

export default function InitiativePage() {
  return (
    <>
      <PageHeader
        index="06.2"
        eyebrow="Участие"
        title="Законодательная инициатива"
        lead="Предложите изменение в градостроительное или земельное законодательство — эксперты Ассоциации изучат вашу инициативу."
        crumbs={[{ href: '/', label: 'Главная' }, { href: '/participation', label: 'Участие' }, { label: 'Законодательная инициатива' }]}
      />

      <section className="container-x py-16 sm:py-24 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 flex flex-col gap-6">
          <p className="text-display text-2xl sm:text-3xl leading-snug text-balance">
            Столкнулись с пробелом, противоречием или устаревшей нормой? Расскажите нам.
          </p>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            Любой гражданин, компания или общественная организация может предложить свою инициативу. Ассоциация
            участвует в разработке федеральных и региональных нормативных актов, проводит правовую экспертизу
            законопроектов и работает в экспертных советах при органах власти — это позволяет донести обоснованные
            предложения до тех, кто принимает решения.
          </p>
        </Reveal>
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="text-technical text-muted-foreground">Как это работает</span>
          <Stagger className="flex flex-col divide-y divide-border border-y border-border">
            {initiativeSteps.map((s, i) => (
              <StaggerItem key={s} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                <span className="text-accent tabular-nums text-technical pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <span className="leading-relaxed">{s}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <Reveal>
          <ActionBlock
            tone="dark"
            eyebrow="Форма"
            title="Предложить законодательную инициативу"
            text="Опишите проблему и предлагаемое решение — предложение придёт напрямую Татьяне Бочкаревой."
            href="/participation/initiative/apply"
            cta="Заполнить форму"
          />
        </Reveal>
      </section>
    </>
  )
}
