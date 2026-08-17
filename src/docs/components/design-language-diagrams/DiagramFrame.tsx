import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@chghealthcare/unified-design-system'

type Props = {
  titleId: string
  caption: string
  children: ReactNode
  className?: string
}

/** Shared shell for Design Language hub diagrams. */
export function DiagramFrame({ titleId, caption, children, className }: Props) {
  return (
    <figure
      className={cn(
        'not-prose m-0 flex w-full min-w-0 flex-col items-stretch gap-[length:var(--uds-gap-16)] rounded-[length:var(--uds-radius-12)] bg-[var(--uds-surface-secondary)] px-[length:var(--uds-spacing-24)] py-[length:var(--uds-spacing-24)] sm:px-[length:var(--uds-spacing-32)] sm:py-[length:var(--uds-spacing-32)]',
        className,
      )}
      aria-labelledby={titleId}
    >
      <figcaption id={titleId} className="sr-only">
        {caption}
      </figcaption>
      {children}
    </figure>
  )
}

export function DiagramChip({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={cn(
        'flex min-h-11 items-center justify-center rounded-[length:var(--uds-radius-8)] px-3 py-2 text-center',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
