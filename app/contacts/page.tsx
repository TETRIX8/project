import type { Metadata } from 'next'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { ContactForm } from '@/components/site/contact-form'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Контакты — записаться на консультацию',
  description:
    'Свяжитесь с Татьяной Бочкаревой: телефон, Telegram, WhatsApp, электронная почта. Офис в Москве, МФК «Резиденция Тверская».',
  alternates: { canonical: '/contacts' },
}

export default function ContactsPage() {
  const { contact, social } = siteConfig
  return (
    <>
      <PageHeader
        index="06"
        eyebrow="Контакты"
        title="Обсудим вашу задачу"
        lead="Опишите ситуацию — мы вернёмся с первичной оценкой и предложением по формату работы. Или свяжитесь напрямую любым удобным способом."
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Контакты' }]}
      />

      <section className="container-x py-16 sm:py-24 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5 flex flex-col gap-12">
          <Stagger className="flex flex-col divide-y divide-border border-y border-border">
            <StaggerItem>
              <a href={contact.phoneHref} className="group grid grid-cols-[2rem_1fr] gap-4 py-6 hover:text-accent transition-colors">
                <Phone className="size-5 text-muted-foreground group-hover:text-accent" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  <span className="text-technical text-muted-foreground">Телефон</span>
                  <span className="text-xl tabular-nums">{contact.phone}</span>
                </span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a href={`mailto:${contact.email}`} className="group grid grid-cols-[2rem_1fr] gap-4 py-6 hover:text-accent transition-colors">
                <Mail className="size-5 text-muted-foreground group-hover:text-accent" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  <span className="text-technical text-muted-foreground">Электронная почта</span>
                  <span className="text-xl break-all">{contact.email}</span>
                </span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <div className="grid grid-cols-[2rem_1fr] gap-4 py-6">
                <MapPin className="size-5 text-muted-foreground" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  <span className="text-technical text-muted-foreground">Офис</span>
                  <address className="not-italic text-lg leading-relaxed text-pretty">{contact.address}</address>
                </span>
              </div>
            </StaggerItem>
          </Stagger>

          <Reveal className="flex flex-col gap-4">
            <span className="text-technical text-muted-foreground">Мессенджеры</span>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Telegram', href: social.telegram },
                { label: 'WhatsApp', href: social.whatsapp },
                { label: 'Дзен', href: social.dzen },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-4 h-11 text-sm hover:border-accent hover:text-accent transition-colors"
                >
                  {s.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="bg-secondary p-6 flex flex-col gap-3">
            <span className="text-technical text-muted-foreground">Как добраться</span>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              МФК «Резиденция Тверская» находится рядом со станциями метро «Маяковская» и «Белорусская». Встречи —
              по предварительной договорённости.
            </p>
            <a
              href={`https://yandex.ru/maps/?text=${encodeURIComponent(contact.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm link-underline w-fit"
            >
              Открыть на карте
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div id="form" className="lg:col-span-7 scroll-mt-28">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
