import { may2026Content } from './content/may-2026'
import { june2026Content } from './content/june-2026'
import type { ReadoutMonth, ReadoutMonthId } from './types'

export const READOUT_MONTHS: ReadoutMonth[] = [
  {
    id: '2026-06',
    label: 'June 2026',
    authorLine: 'Michael Stevens, Design System Manager',
    route: '/docs/readout/2026-06',
    content: june2026Content,
  },
  {
    id: '2026-05',
    label: 'May 2026',
    authorLine: 'Michael Stevens, Design System Manager',
    route: '/docs/readout/2026-05',
    content: may2026Content,
  },
]

export const LATEST_READOUT_MONTH_ID: ReadoutMonthId = '2026-06'

export const LATEST_READOUT_ROUTE = `/docs/readout/${LATEST_READOUT_MONTH_ID}`

const byId = new Map(READOUT_MONTHS.map((month) => [month.id, month]))

export function getReadoutMonth(id: string | undefined): ReadoutMonth | undefined {
  if (!id) return undefined
  return byId.get(id as ReadoutMonthId)
}

export function isReadoutMonthId(id: string): id is ReadoutMonthId {
  return byId.has(id as ReadoutMonthId)
}

export function isReadoutPath(pathname: string): boolean {
  return pathname === '/docs/readout' || pathname.startsWith('/docs/readout/')
}

/** Nav route map entries for readout months (utility menu + route guard). */
export const READOUT_NAV_ROUTES: Record<string, string> = {
  readout: LATEST_READOUT_ROUTE,
  ...Object.fromEntries(READOUT_MONTHS.map((month) => [`readout-${month.id}`, month.route])),
}
