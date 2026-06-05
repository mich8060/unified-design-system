import { useLayoutEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { cn } from '@chghealthcare/unified-design-system'
import {
  docPageBodyColumnClassName,
  docPageBodyStackClassName,
} from '../doc-page-content-classes'
import {
  docPageHeroBandClassName,
  docPageHeroColumnNarrowClassName,
  docPageHeroShellClassName,
  docPageHorizontalGutterClassName,
} from '../doc-page-hero-classes'
import { ExecutiveOnePager } from './ExecutiveOnePager'
import { ReadoutMonthSelect } from './ReadoutMonthSelect'
import {
  getReadoutMonth,
  isReadoutMonthId,
  LATEST_READOUT_ROUTE,
} from './readout-months'
import './executive-one-pager.css'

function resetDocsMainScrollTop() {
  const el = document.querySelector('[data-slot="appshell"] .appshell--main')
  if (el) {
    el.scrollTop = 0
  }
}

/** Design System executive readout (monthly update one-pager). */
export function ReadoutPage() {
  const { monthId } = useParams<{ monthId: string }>()
  const month = getReadoutMonth(monthId)

  useLayoutEffect(() => {
    resetDocsMainScrollTop()
    const id = requestAnimationFrame(() => {
      resetDocsMainScrollTop()
    })
    return () => cancelAnimationFrame(id)
  }, [monthId])

  if (!monthId || !month) {
    return <Navigate to={LATEST_READOUT_ROUTE} replace />
  }

  return (
    <article className="min-w-0 overflow-x-hidden">
      <header className={docPageHeroBandClassName}>
        <div className={docPageHeroShellClassName}>
          <div className={docPageHeroColumnNarrowClassName}>
            <p className="text-sm font-medium text-white/75">Readout</p>
            <h1
              className={cn(
                'text-3xl font-bold tracking-tight text-white md:text-4xl',
                'mt-1',
              )}
            >
              Design System Update
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/90">
              {month.label} — {month.authorLine}
            </p>
          </div>
        </div>
      </header>

      <div className={docPageHorizontalGutterClassName}>
        <div className={docPageBodyColumnClassName}>
          {isReadoutMonthId(month.id) ? (
            <div className="flex justify-end pt-8 mb-8">
              <ReadoutMonthSelect value={month.id} />
            </div>
          ) : null}
          <div className={cn(docPageBodyStackClassName, isReadoutMonthId(month.id) ? 'pt-0' : undefined)}>
            <ExecutiveOnePager content={month.content} />
          </div>
        </div>
      </div>
    </article>
  )
}
