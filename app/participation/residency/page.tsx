import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { ActionBlock } from '@/components/site/action-block'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { residencyBenefits, residencyPackages } from '@/lib/content/participation'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Резидентство для партнёров',
  description:
    'Программа резидентства Ассоциации правовой помощи в градостроительной деятельности: правовая поддержка, диалог с регуляторами, закрытые мероприятия. Три уровня участия.',
  alternates: { canonical: '/participation/residency' },
}

export default function ResidencyPage() {
  return (
    <>
      <PageHeader
        index="06.1"
        eyebrow="Участие"
        title="Резидентство для партнёров"
        lead="Программа участия для девелоперов, архитектурных бюро, проектных институтов и инвесторов."
        crumbs={[{ href: '/', label: 'Главная' }, { href: '/participation', label: 'Участие' }, { label: 'Резидентство' }]}
      />

      <section className="container-x py-16 sm:py-24 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 flex flex-col gap-6">
          <p className="text-display text-2xl sm:text-3xl leading-snug text-balance">
            Резиденты получают постоянную правовую поддержку Ассоциации и прямой диалог с регуляторами на федеральном
            и региональном уровнях.
          </p>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            Ассоциация объединяет юристов, специализирующихся на градостроительном и земельном праве, и представляет
            интересы девелоперского сообщества в диалоге с государством. Участие доступно в трёх форматах — от базовой
            правовой осведомлённости до стратегического партнёрства.
          </p>
        </Reveal>
        <div className="lg:col-span-7 flex flex-col gap-10">
          <Stagger className="flex flex-col divide-y divide-border border-y border-border">
            {residencyBenefits.map((b) => (
              <StaggerItem key={b} className="grid grid-cols-[1.5rem_1fr] gap-4 py-5">
                <Check className="size-5 text-accent mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{b}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="grid gap-px bg-border sm:grid-cols-3">
            {residencyPackages.map((p) => (
              <StaggerItem key={p.name} className="bg-background p-6 flex flex-col gap-3">
                <span className="text-technical text-muted-foreground">Пакет</span>
                <span className="font-serif text-2xl">{p.name}</span>
                <span className="text-accent tabular-nums">{p.price}</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{p.audience}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24 flex flex-col gap-px">
        <Reveal>
          <ActionBlock
            eyebrow="Презентация"
            title="Презентация о резидентстве"
            text="Программы участия 2026–2027: состав пакетов, форматы взаимодействия и порядок присоединения к Ассоциации."
            href={siteConfig.participation.presentationUrl}
            external
            cta="Открыть презентацию"
            meta="PDF, 0,7 МБ"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <ActionBlock
            tone="dark"
            eyebrow="Заявка"
            title="Стать резидентом"
            text="Заполните заявку — мы свяжемся с вами, проведём бесплатную консультацию и подберём оптимальный пакет."
            href="/participation/residency/apply"
            cta="Подать заявку"
          />
        </Reveal>
      </section>
    </>
  )
}
