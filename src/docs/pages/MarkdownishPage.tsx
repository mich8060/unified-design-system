import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@chghealthcare/unified-design-system'
import {
  docPageHeroBandClassName,
  docPageHeroColumnNarrowClassName,
  docPageHeroShellClassName,
  docPageHorizontalGutterClassName,
} from '../doc-page-hero-classes'

type Props = {
  title: string
  kicker?: string
  children: ReactNode
  /** Merged onto the body `article` (e.g. widen prose with `max-w-[1280px]`). */
  className?: string
  /**
   * Footer link under the article. Default: foundations index. Pass `null` to omit, or `{ to, label }` for a custom link.
   */
  footerLink?: { to: string; label: string } | null
}

export function MarkdownishPage({ title, kicker, children, className, footerLink }: Props) {
  const link =
    footerLink === null
      ? null
      : footerLink ?? { to: '/docs/foundations/display', label: 'Browse foundations →' }

  return (
    <div className="min-w-0 overflow-x-hidden">
      <header className={docPageHeroBandClassName}>
        <div className={docPageHeroShellClassName}>
          <div className={docPageHeroColumnNarrowClassName}>
            {kicker ? (
              <p className="text-sm font-medium text-white/75">{kicker}</p>
            ) : null}
            <h1
              className={cn(
                'text-3xl font-bold tracking-tight text-white md:text-4xl',
                kicker ? 'mt-1' : null,
              )}
            >
              {title}
            </h1>
          </div>
        </div>
      </header>

      <div className={docPageHorizontalGutterClassName}>
        <article className={cn(docPageHeroColumnNarrowClassName, 'py-10', className)}>
          <div className="space-y-4 text-neutral-600 dark:text-neutral-300">{children}</div>
          {link ? (
            <p className="mt-10 text-sm">
              <Link to={link.to} className="docs-link font-medium">
                {link.label}
              </Link>
            </p>
          ) : null}
        </article>
      </div>
    </div>
  )
}
