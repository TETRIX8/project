import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <rect x="1" y="1" width="42" height="42" stroke="currentColor" strokeWidth="1" />
      <path
        d="M12 32V12h9a6 6 0 0 1 0 12h-9M21 24a6 6 0 0 1 0 12h-9"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <rect x="29" y="12" width="4" height="20" className="fill-accent" />
    </svg>
  )
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-3 rounded-sm', className)}
      aria-label={`${siteConfig.brand.name} — на главную`}
    >
      <LogoMark className="transition-transform duration-300 group-hover:-translate-y-px" />
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-lg sm:text-xl tracking-tight whitespace-nowrap">
            {siteConfig.brand.name}
          </span>
          <span className="text-technical text-muted-foreground mt-1.5 hidden sm:max-lg:block 2xl:block whitespace-nowrap">
            {siteConfig.brand.tagline}
          </span>
        </span>
      ) : null}
    </Link>
  )
}
