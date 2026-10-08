import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { ApplicationForm } from '@/components/site/application-form'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Предложить законодательную инициативу',
  description: 'Форма для направления законодательной инициативы в Ассоциацию правовой помощи в градостроительной деятельности.',
  alternates: { canonical: '/participation/initiative/apply' },
}

const tips = [
  'Укажите конкретную норму или акт, если знаете — это ускорит анализ.',
  'Опишите реальную ситуацию, в которой проблема проявилась.',
  'Сформулируйте, что именно нужно изменить и какой результат ожидается.',
]

export default function InitiativeApplyPage() {
  return (
    <>
      <PageHeader
        index="06.2"
        eyebrow="Законодательная инициатива"
        title="Предложить инициативу"
        lead="Заполните форму — предложение придёт напрямую Татьяне Бочкаревой."
        crumbs={[
          { href: '/', label: 'Главная' },
          { href: '/participation', label: 'Участие' },
          { href: '/participation/initiative', label: 'Законодательная инициатива' },
          { label: 'Форма' },
        ]}
      />
      <section className="container-x py-16 sm:py-24 grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-4 flex flex-col gap-6">
          <span className="text-technical text-muted-foreground">Как описать инициативу</span>
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {tips.map((t, i) => (
              <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5">
                <span className="text-accent tabular-nums text-technical pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <ApplicationForm formId="initiative" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
