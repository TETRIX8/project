import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { LogoMark } from './logo'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="theme-dark theme-deep bg-background text-foreground border-t border-border">
      <div className="container-x py-14 sm:py-20 flex flex-col gap-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <LogoMark className="size-10" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl">{siteConfig.brand.name}</span>
                <span className="text-technical text-muted-foreground mt-1.5">{siteConfig.brand.tagline}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
              {siteConfig.brand.legalName}. Комплексная реализация инвестиционных строительных проектов:
              градостроительный консалтинг, юридическое и организационное сопровождение, разработка
              градостроительной документации, редевелопмент территорий.
            </p>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-technical text-muted-foreground">Навигация</span>
            <nav aria-label="Навигация в подвале">
              <ul className="flex flex-col gap-2.5 text-sm">
                {[{ href: '/', label: 'Главная' }, ...siteConfig.nav].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-technical text-muted-foreground">Контакты</span>
            <address className="not-italic flex flex-col gap-3 text-sm">
              <a href={siteConfig.contact.phoneHref} className="font-serif text-2xl tabular-nums link-underline self-start">
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="link-underline self-start">
                {siteConfig.contact.email}
              </a>
              <p className="text-muted-foreground leading-relaxed">Офис: {siteConfig.contact.address}</p>
            </address>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm pt-2" aria-label="Мессенджеры и соцсети">
              <li>
                <a className="link-underline" href={siteConfig.social.telegram} target="_blank" rel="noreferrer">
                  Telegram
                </a>
              </li>
              <li>
                <a className="link-underline" href={siteConfig.social.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a className="link-underline" href={siteConfig.social.dzen} target="_blank" rel="noreferrer">
                  Дзен
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>© {year} {siteConfig.brand.legalName}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="link-underline">
              Политика обработки персональных данных
            </Link>
            <Link href="/documents" className="link-underline">
              Вступить в Ассоциацию
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
