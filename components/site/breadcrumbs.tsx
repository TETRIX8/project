import Link from 'next/link'
import { Fragment } from 'react'

export type Crumb = { href?: string; label: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="text-technical text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="link-underline">
            Главная
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li aria-hidden="true" className="opacity-50">
                /
              </li>
              <li aria-current={last ? 'page' : undefined} className={last ? 'text-foreground' : undefined}>
                {item.href && !last ? (
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                ) : (
                  <span className="line-clamp-1 max-w-[60vw] sm:max-w-none">{item.label}</span>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
