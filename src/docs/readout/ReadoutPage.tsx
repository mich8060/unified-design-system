import { useLayoutEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { DocsPageShell } from '../components/DocsPageShell'
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
    <DocsPageShell
      eyebrow="Readout"
      title="Design System Update"
      description={`${month.label} — ${month.authorLine}`}
    >
      {isReadoutMonthId(month.id) ? (
        <div className="flex justify-end">
          <ReadoutMonthSelect value={month.id} />
        </div>
      ) : null}
      <ExecutiveOnePager content={month.content} />
    </DocsPageShell>
  )
}
