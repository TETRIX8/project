import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50 mask-fade-b pointer-events-none" />
      <div className="relative container-x grid gap-12 lg:grid-cols-12 lg:items-end py-20">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <span className="text-technical text-muted-foreground flex items-center gap-4">
            <span className="text-accent">404</span>
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            <span>Страница не найдена</span>
          </span>
          <h1 className="text-display text-5xl sm:text-7xl lg:text-8xl text-balance">Такого участка на карте нет</h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-xl text-pretty">
            Возможно, адрес изменился после обновления сайта. Ниже — основные разделы.
          </p>
        </div>
        <nav aria-label="Разделы сайта" className="lg:col-span-4 flex flex-col divide-y divide-border border-y border-border">
          {[{ href: '/', label: 'Главная' }, ...siteConfig.nav].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between py-4 hover:text-accent transition-colors"
            >
              {item.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
