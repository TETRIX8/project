'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SiteImage } from '@/lib/content/images'

type Props = {
  image: SiteImage
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
  /** Object-position override, e.g. "50% 20%" */
  position?: string
}

/**
 * Wraps next/image with a skeleton placeholder, a fade-in on load and a
 * graceful fallback when the remote file fails. Always reserves space via
 * width/height or a fill container to avoid layout shift.
 */
export function SiteImage({ image, className, imgClassName, sizes, priority, fill = true, position }: Props) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-secondary',
        fill && 'w-full h-full',
        state === 'loading' && 'skeleton',
        className,
      )}
      style={fill ? undefined : { aspectRatio: `${image.width} / ${image.height}` }}
    >
      {state === 'error' ? (
        <div
          role="img"
          aria-label={image.alt}
          className="absolute inset-0 flex items-end p-4 bg-grid text-technical text-muted-foreground"
        >
          Изображение недоступно
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill={fill}
          width={fill ? undefined : image.width}
          height={fill ? undefined : image.height}
          sizes={sizes ?? '(min-width: 1024px) 50vw, 100vw'}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={cn(
            'object-cover transition-opacity duration-700 ease-out',
            state === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
          style={position ? { objectPosition: position } : undefined}
        />
      )}
    </div>
  )
}
