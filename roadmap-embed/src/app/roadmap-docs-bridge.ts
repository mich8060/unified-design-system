/** Docs host ↔ roadmap iframe messaging (same origin only). */

export const ROADMAP_DOCS_MESSAGE_ORIGIN =
  typeof window !== "undefined" ? window.location.origin : "";

export type RoadmapDocsHostMessage =
  | { type: "uds-roadmap-expand" }
  | { type: "uds-roadmap-collapse" };

export type RoadmapDocsEmbedMessage =
  | { type: "uds-roadmap-expanded-state"; expanded: boolean };

export function isRoadmapEmbeddedInParent(): boolean {
  try {
    return typeof window !== "undefined" && window.parent !== window;
  } catch {
    return false;
  }
}

export function postRoadmapMessageToParent(message: RoadmapDocsHostMessage): void {
  if (!isRoadmapEmbeddedInParent()) return;
  window.parent.postMessage(message, ROADMAP_DOCS_MESSAGE_ORIGIN);
}

export function postRoadmapMessageToEmbed(
  iframe: HTMLIFrameElement | null,
  message: RoadmapDocsEmbedMessage,
): void {
  iframe?.contentWindow?.postMessage(message, ROADMAP_DOCS_MESSAGE_ORIGIN);
}

export function isRoadmapDocsHostMessage(
  data: unknown,
): data is RoadmapDocsHostMessage {
  if (!data || typeof data !== "object") return false;
  const type = (data as { type?: unknown }).type;
  return type === "uds-roadmap-expand" || type === "uds-roadmap-collapse";
}

export function isRoadmapDocsEmbedMessage(
  data: unknown,
): data is RoadmapDocsEmbedMessage {
  return (
    !!data &&
    typeof data === "object" &&
    (data as { type?: unknown }).type === "uds-roadmap-expanded-state" &&
    typeof (data as { expanded?: unknown }).expanded === "boolean"
  );
}
