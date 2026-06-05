import { cn } from "@chghealthcare/unified-design-system";
import type { RoadmapEvent } from "../roadmap-data";
import {
  RoadmapStatusBadge,
  STATUS_BORDER,
  eventEffectiveStatus,
} from "../roadmap-status";
import { TRACK_HEIGHT_PX, trackBandTopPx } from "../utils/roadmap-layout";

export function RoadmapEventCard({
  event,
  layoutEditMode,
  onClick,
  onDoubleClick,
  onDragStart,
  onResizeStart,
}: {
  event: RoadmapEvent;
  layoutEditMode: boolean;
  onClick?: () => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  onDragStart: (e: React.MouseEvent, event: RoadmapEvent) => void;
  onResizeStart: (
    e: React.MouseEvent,
    event: RoadmapEvent,
    edge: "left" | "right",
  ) => void;
}) {
  const status = eventEffectiveStatus(event);

  return (
    <div
      className={cn(
        "group absolute z-20 box-border -translate-y-1/2 overflow-hidden bg-card text-card-foreground shadow-md ring-1 ring-[var(--uds-border-primary)]",
        layoutEditMode
          ? "cursor-grab hover:shadow-lg active:cursor-grabbing"
          : "cursor-default",
      )}
      style={{
        left: `${event.left}px`,
        width: `${event.width}px`,
        top: `${trackBandTopPx(event.track) + TRACK_HEIGHT_PX / 2}px`,
        borderLeftWidth: 4,
        borderLeftStyle: "solid",
        borderLeftColor: STATUS_BORDER[status],
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseDown={(e) => onDragStart(e, event)}
    >
      <div
        className={cn(
          "absolute top-0 bottom-0 left-0 z-10 w-2 transition-opacity",
          layoutEditMode
            ? "cursor-ew-resize opacity-0 group-hover:opacity-100 hover:bg-[var(--uds-surface-inverse)]/10"
            : "pointer-events-none opacity-0",
        )}
        onMouseDown={(e) => onResizeStart(e, event, "left")}
      />
      <div className="flex flex-col gap-1 px-3 py-2 pr-2">
        <RoadmapStatusBadge status={status} className="self-start" />
        <p className="min-w-0 text-uds-14 font-semibold leading-tight text-card-foreground">
          {event.title}
        </p>
        {event.description ? (
          <p className="text-uds-14 leading-tight text-muted-foreground">
            {event.description}
          </p>
        ) : null}
      </div>
      <div
        className={cn(
          "absolute top-0 right-0 bottom-0 z-10 w-2 transition-opacity",
          layoutEditMode
            ? "cursor-ew-resize opacity-0 group-hover:opacity-100 hover:bg-[var(--uds-surface-inverse)]/10"
            : "pointer-events-none opacity-0",
        )}
        onMouseDown={(e) => onResizeStart(e, event, "right")}
      />
    </div>
  );
}
