import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@chghealthcare/unified-design-system'
import { useShadcnDocsRegistry } from './registry'
import type { ShadcnUiSlug } from './shadcn-ui-registry'

const WELCOME_PREVIEW_MAX_UNSCALED_PX = 375

/** Alert dialog preview: post-scale target width is this value (375 + 50px). */
const WELCOME_PREVIEW_ALERT_DIALOG_MAX_UNSCALED_PX = WELCOME_PREVIEW_MAX_UNSCALED_PX + 50

function WelcomePreviewFit({
  children,
  className,
  maxUnscaledPx = WELCOME_PREVIEW_MAX_UNSCALED_PX,
}: {
  children: ReactNode
  className?: string
  /** When measured width exceeds this (px), scale down to fit. */
  maxUnscaledPx?: number
}) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const node = measureRef.current
    if (!node) return

    const measure = () => {
      const w = node.offsetWidth
      if (w > maxUnscaledPx) {
        setScale(maxUnscaledPx / w)
      } else {
        setScale(1)
      }
    }

    measure()
    const ro = new ResizeObserver(() => measure())
    ro.observe(node)
    return () => ro.disconnect()
  }, [children, maxUnscaledPx])

  return (
    <div
      ref={measureRef}
      className={className}
      inert
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  )
}

/** Total strip height in px (42×4px); no vertical padding on the strip. */
const WELCOME_PREVIEW_STRIP_HEIGHT_PX = 168

/**
 * **Welcome card preview** — the gray strip at the top of each component card
 * on the welcome page: live, non-interactive render of the first doc example.
 */
export function WelcomeCardPreview({ slug }: { slug: string }) {
  const { isShadcnUiSlug, getShadcnExamples } = useShadcnDocsRegistry()

  if (!isShadcnUiSlug(slug)) return null

  const sections = getShadcnExamples(slug as ShadcnUiSlug)
  const first = sections[0]
  const previewInner: ReactNode | undefined = first?.welcomePreviewInner ?? first?.previewInner

  return (
    <div
      data-welcome-card-preview
      className={cn(
        '-mx-4 mb-5 box-border flex min-w-0 w-[calc(100%+2rem)] max-w-none shrink-0 flex-col overflow-hidden rounded-t-[12px] border-t border-uds-border-primary bg-uds-surface-tertiary py-0 dark:bg-uds-surface-secondary',
        slug === 'accordion' ? 'px-3' : 'px-6',
      )}
      style={{ height: WELCOME_PREVIEW_STRIP_HEIGHT_PX }}
      aria-hidden
    >
      <div
        className={cn(
          'flex min-h-0 min-w-0 flex-1 flex-col',
          slug === 'calendar'
            ? 'items-center justify-start pt-12'
            : 'items-center justify-center',
          'overflow-hidden',
        )}
      >
        {previewInner ? (
          <WelcomePreviewFit
            maxUnscaledPx={slug === 'alert-dialog' ? WELCOME_PREVIEW_ALERT_DIALOG_MAX_UNSCALED_PX : undefined}
            className={cn(
              'pointer-events-none select-none [-webkit-user-select:none] [user-select:none]',
              slug === 'alert-dialog' && 'scale-[0.5]',
              slug === 'accordion'
                ? 'flex w-full min-w-0 max-w-full flex-col self-stretch items-stretch [&_[data-slot=accordion]]:!bg-white [&_[data-slot=accordion-trigger]]:!bg-white dark:[&_[data-slot=accordion]]:!bg-neutral-950 dark:[&_[data-slot=accordion-trigger]]:!bg-neutral-950'
                : slug === 'calendar'
                  ? 'flex w-full min-w-0 max-w-full justify-center'
                  : 'inline-flex w-max max-w-none',
              slug === 'aspect-ratio' &&
                '[&_[data-slot=aspect-ratio]]:box-border [&_[data-slot=aspect-ratio]]:!w-[200px] [&_[data-slot=aspect-ratio]]:!h-[112.5px] [&_[data-slot=aspect-ratio]]:!border-0 [&_[data-slot=aspect-ratio]]:!bg-[repeating-linear-gradient(45deg,#ececf1_0px,#ececf1_12px,#dadbe2_12px,#dadbe2_24px)] [&_[data-slot=aspect-ratio]]:!translate-x-[-100px] [&_[data-slot=aspect-ratio]]:!translate-y-[-60px]',
            )}
          >
            {previewInner}
          </WelcomePreviewFit>
        ) : (
          <div className="text-center font-mono text-[10px] text-neutral-400 dark:text-neutral-500">—</div>
        )}
      </div>
    </div>
  )
}
