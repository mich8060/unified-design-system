import type { ReactNode } from 'react'
import { cn } from '@chghealthcare/unified-design-system'
import { DocsPageShell } from '../components/DocsPageShell'

type Props = {
  title: string
  kicker?: string
  description?: ReactNode
  children: ReactNode
  /** Merged onto the body stack wrapper. */
  className?: string
}

export function MarkdownishPage({
  title,
  kicker,
  description,
  children,
  className,
}: Props) {
  return (
    <DocsPageShell eyebrow={kicker} title={title} description={description}>
      <div
        className={cn(
          'flex min-w-0 flex-col gap-[length:var(--uds-gap-16)] text-[length:var(--uds-type-body-14-size)] leading-[var(--uds-type-body-14-line-height)] text-[var(--uds-text-secondary)] [&_h2]:m-0 [&_h2]:pt-[length:var(--uds-spacing-8)] [&_h2]:text-[length:var(--uds-type-body-20-size)] [&_h2]:font-semibold [&_h2]:leading-[var(--uds-type-body-20-line-height)] [&_h2]:text-[var(--uds-text-primary)] [&_strong]:text-[var(--uds-text-primary)] [&_:not(pre)_>_code]:rounded-[length:var(--uds-radius-4)] [&_:not(pre)_>_code]:bg-[var(--uds-surface-secondary)] [&_:not(pre)_>_code]:px-1.5 [&_:not(pre)_>_code]:py-0.5 [&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:p-0',
          className,
        )}
      >
        {children}
      </div>
    </DocsPageShell>
  )
}
