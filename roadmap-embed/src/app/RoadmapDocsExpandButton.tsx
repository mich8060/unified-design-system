import { useEffect, useState } from "react";
import {
  ArrowsInIcon,
  ArrowsOutIcon,
  Button,
} from "@chghealthcare/unified-design-system";
import {
  isRoadmapDocsEmbedMessage,
  isRoadmapEmbeddedInParent,
  postRoadmapMessageToParent,
  ROADMAP_DOCS_MESSAGE_ORIGIN,
} from "./roadmap-docs-bridge";

/** Icon button in the embed header; docs host toggles fullscreen via postMessage. */
export function RoadmapDocsExpandButton() {
  const [embedded] = useState(() => isRoadmapEmbeddedInParent());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!embedded) return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== ROADMAP_DOCS_MESSAGE_ORIGIN) return;
      if (!isRoadmapDocsEmbedMessage(event.data)) return;
      setExpanded(event.data.expanded);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [embedded]);

  if (!embedded) return null;

  const label = expanded ? "Exit full size" : "Expand roadmap to full size";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() =>
        postRoadmapMessageToParent(
          expanded
            ? { type: "uds-roadmap-collapse" }
            : { type: "uds-roadmap-expand" },
        )
      }
    >
      {expanded ? (
        <ArrowsInIcon size={16} weight="bold" aria-hidden />
      ) : (
        <ArrowsOutIcon size={16} weight="bold" aria-hidden />
      )}
    </Button>
  );
}
