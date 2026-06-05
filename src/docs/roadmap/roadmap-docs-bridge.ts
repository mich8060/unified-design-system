/** Docs host ↔ roadmap iframe messaging (same origin only). */

export type RoadmapDocsHostMessage =
  | { type: 'uds-roadmap-expand' }
  | { type: 'uds-roadmap-collapse' }

export type RoadmapDocsEmbedMessage = {
  type: 'uds-roadmap-expanded-state'
  expanded: boolean
}

export function postRoadmapExpandedState(
  iframe: HTMLIFrameElement | null,
  expanded: boolean,
): void {
  iframe?.contentWindow?.postMessage(
    { type: 'uds-roadmap-expanded-state', expanded } satisfies RoadmapDocsEmbedMessage,
    window.location.origin,
  )
}

export function isRoadmapDocsHostMessage(
  data: unknown,
): data is RoadmapDocsHostMessage {
  if (!data || typeof data !== 'object') return false
  const type = (data as { type?: unknown }).type
  return type === 'uds-roadmap-expand' || type === 'uds-roadmap-collapse'
}
