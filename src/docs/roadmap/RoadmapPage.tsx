import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@chghealthcare/unified-design-system'
import {
  docPageHeroBandClassName,
  docPageHeroColumnNarrowClassName,
  docPageHeroShellClassName,
  docPageHorizontalGutterClassName,
} from '../doc-page-hero-classes'
import {
  isRoadmapDocsHostMessage,
  postRoadmapExpandedState,
} from './roadmap-docs-bridge'
import { withBasePath } from '../base-path'

const ROADMAP_EMBED_SRC = withBasePath('/roadmap/index.html')

function resetDocsMainScrollTop() {
  const el = document.querySelector('[data-slot="appshell"] .appshell--main')
  if (el) {
    el.scrollTop = 0
  }
}

function RoadmapEmbed({
  iframeRef,
  className,
  title = 'Design System 2026 Roadmap',
  onLoad,
}: {
  iframeRef: React.RefObject<HTMLIFrameElement | null>
  className?: string
  title?: string
  onLoad?: () => void
}) {
  return (
    <iframe
      ref={iframeRef}
      title={title}
      src={ROADMAP_EMBED_SRC}
      onLoad={onLoad}
      className={cn('box-border block w-full max-w-full border-0', className)}
    />
  )
}

/** Interactive design-system roadmap (timeline + swimlanes). */
export function RoadmapPage() {
  const [expanded, setExpanded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const notifyEmbedExpanded = useCallback(() => {
    postRoadmapExpandedState(iframeRef.current, expanded)
  }, [expanded])

  useLayoutEffect(() => {
    resetDocsMainScrollTop()
    const id = requestAnimationFrame(() => {
      resetDocsMainScrollTop()
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    notifyEmbedExpanded()
  }, [notifyEmbedExpanded])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (!isRoadmapDocsHostMessage(event.data)) return
      if (event.data.type === 'uds-roadmap-expand') setExpanded(true)
      if (event.data.type === 'uds-roadmap-collapse') setExpanded(false)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    if (!expanded) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [expanded])

  return (
    <article className="min-w-0 overflow-x-hidden">
      <header className={docPageHeroBandClassName}>
        <div className={docPageHeroShellClassName}>
          <div className={docPageHeroColumnNarrowClassName}>
            <p className="text-sm font-medium text-white/75">Projects</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Roadmap
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/90">
              2026 design system delivery timeline — initiatives, capacity bands, and status across
              the year.
            </p>
          </div>
        </div>
      </header>

      <div className={docPageHorizontalGutterClassName}>
        <div className="mx-auto min-w-0 max-w-[min(100%,80rem)] py-10">
          <div
            className={cn(
              'not-prose min-w-0',
              expanded &&
                'fixed inset-0 z-[300] flex flex-col bg-neutral-100 dark:bg-neutral-950',
            )}
            role={expanded ? 'dialog' : undefined}
            aria-modal={expanded ? true : undefined}
            aria-label={expanded ? 'Roadmap full size view' : undefined}
          >
            <RoadmapEmbed
              iframeRef={iframeRef}
              onLoad={notifyEmbedExpanded}
              className={cn(
                expanded
                  ? 'min-h-0 flex-1'
                  : cn(
                      'rounded-[length:var(--uds-radius-12)] border border-neutral-200 shadow-sm',
                      'dark:border-neutral-800',
                      'h-[min(90vh,960px)] min-h-[520px]',
                    ),
              )}
            />
          </div>
        </div>
      </div>
    </article>
  )
}
