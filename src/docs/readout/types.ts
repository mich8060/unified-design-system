import type { ReactNode } from 'react'
import type { RoadmapStatusRow } from './roadmapStatus'

export type ReadoutProgressItem = {
  inMotion: boolean
  body: ReactNode
}

export type ReadoutShowcaseTile = {
  href: string
  img: string
  title: string
  desc: string
}

export type ReadoutNext30Card = {
  title: string
  body: ReactNode
}

export type ReadoutValueRow = {
  metric: string
  target: string
  current: string
}

export type ReadoutMonthContent = {
  callout: string
  progressItems: ReadoutProgressItem[]
  showcaseIntro?: string
  showcaseTiles?: ReadoutShowcaseTile[]
  roadmapRows?: RoadmapStatusRow[]
  /** Optional roadmap embedded as an iframe under the Roadmap Status table */
  roadmapEmbedUrl?: string
  /** Condensed Details copy for months where full risk detail was already reported */
  roadmapDetailsSummary?: ReactNode
  next30Cards: ReadoutNext30Card[]
  valueSnapshot: ReadoutValueRow[]
  accomplishmentsTitle?: string
  accomplishments?: readonly string[]
}

export type ReadoutMonthId = '2026-05' | '2026-06' | '2026-07'

export type ReadoutMonth = {
  id: ReadoutMonthId
  label: string
  authorLine: string
  route: string
  content: ReadoutMonthContent
}
