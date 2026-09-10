import { Scale, Landmark, Building2, FileText } from 'lucide-react'
import { expert } from '@/lib/content/expert'
import { advantages } from '@/lib/content/services'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'

const pillars = [
  {
    icon: Scale,
    title: 'Специализация',
    text: 'Градостроительное и земельное право. Правовая помощь застройщикам, инвесторам, девелоперам.',
  },
  {
    icon: Landmark,
    title: 'Экспертный статус',
    text: expert.roles[1],
  },
  {
    icon: FileText,
    title: 'Юридическое сопровождение',
    text: 'Правовая поддержка на всех этапах реализации проекта, включая взаимодействие с государственными органами.',
  },
  {
    icon: Building2,
    title: 'Градостроительные и инвестиционные проекты',
    text: 'Анализ градостроительного потенциала, градостроительная документация, редевелопмент территорий.',
  },
]

export function Trust() {
  return (
    <section id="trust" data-section="02" className="relative bg-background text-foreground border-b border-border">
      <div className="container-x py-20 sm:py-28 flex flex-col gap-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-4 flex items-center gap-4 text-technical text-muted-foreground" y={8}>
            <span className="text-accent tabular-nums">02</span>
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            <span>Основания доверия</span>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <p className="font-serif text-2xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-balance">
              Градостроительство — сложный процесс с правовой точки зрения: множество сторон, постоянно
              меняющееся законодательство и высокая стоимость ошибки. Основная задача Ассоциации — оказание
              правовой помощи застройщикам, инвесторам и девелоперам.
            </p>
          </Reveal>
        </div>

        <Stagger as="ul" className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
          {pillars.map((p) => (
            <StaggerItem key={p.title} as="li" className="border-b border-r border-border p-6 sm:p-7 flex flex-col gap-6 min-h-56">
              <p.icon className="size-5 text-accent" aria-hidden="true" strokeWidth={1.5} />
              <div className="flex flex-col gap-2 mt-auto">
                <h3 className="text-base font-medium leading-snug">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger as="ul" className="grid sm:grid-cols-3 gap-8">
          {advantages.map((a, i) => (
            <StaggerItem key={a.title} as="li" className="flex flex-col gap-3">
              <span className="text-technical text-muted-foreground tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-serif text-2xl">{a.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
