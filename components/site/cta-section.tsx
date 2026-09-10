import { siteConfig } from '@/lib/site-config'
import { ContactForm } from './contact-form'
import { Reveal } from '@/components/motion/reveal'

export function CtaSection({ index = '08', id = 'form' }: { index?: string; id?: string }) {
  return (
    <section id={id} data-section={index} className="theme-dark theme-deep bg-background text-foreground relative overflow-hidden scroll-mt-20">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40 mask-fade-b pointer-events-none" />
      <div className="relative container-x py-20 sm:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5 flex flex-col gap-8">
          <Reveal className="flex items-center gap-4 text-technical text-muted-foreground" y={8}>
            <span className="text-accent tabular-nums">{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            <span>Обратная связь</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl">
              Обсудим задачу и определим следующий шаг
            </h2>
          </Reveal>
          <Reveal delay={0.14} className="flex flex-col gap-6 text-sm">
            <p className="text-muted-foreground leading-relaxed max-w-md text-pretty">
              Свяжитесь с нами сегодня для консультации. Опишите участок, объект или стадию проекта — мы вернёмся с
              предложением по формату работы.
            </p>
            <div className="flex flex-col gap-3">
              <a href={siteConfig.contact.phoneHref} className="font-serif text-3xl tabular-nums link-underline self-start">
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="link-underline self-start text-muted-foreground">
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a className="link-underline" href={siteConfig.social.telegram} target="_blank" rel="noreferrer">Telegram</a>
              <a className="link-underline" href={siteConfig.social.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              <a className="link-underline" href={siteConfig.social.dzen} target="_blank" rel="noreferrer">Дзен</a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-span-7 lg:pl-8 lg:border-l border-border">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
