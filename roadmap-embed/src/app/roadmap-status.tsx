import { Status } from "@chghealthcare/unified-design-system";
import type { RoadmapEvent, RoadmapEventStatus } from "./roadmap-data";

/** Order used in status dropdowns */
export const ROADMAP_STATUS_OPTIONS = [
  "pending",
  "on_track",
  "at_risk",
  "blocked",
] as const satisfies readonly RoadmapEventStatus[];

export const STATUS_LABEL: Record<RoadmapEventStatus, string> = {
  pending: "Pending",
  on_track: "On Track",
  at_risk: "At Risk",
  blocked: "Blocked",
};

export const STATUS_VARIANT: Record<
  RoadmapEventStatus,
  "neutral" | "success" | "warning" | "error"
> = {
  pending: "neutral",
  on_track: "success",
  at_risk: "warning",
  blocked: "error",
};

/** Left accent on event cards */
export const STATUS_BORDER: Record<RoadmapEventStatus, string> = {
  pending: "var(--uds-color-neutrals-500)",
  on_track: "var(--uds-color-accent-green-600)",
  at_risk: "var(--uds-color-accent-amber-500)",
  blocked: "var(--uds-color-accent-red-500)",
};

export function eventEffectiveStatus(
  event: Pick<RoadmapEvent, "status">,
): RoadmapEventStatus {
  return event.status ?? "on_track";
}

export function RoadmapStatusBadge({
  status,
  size = "compact",
  className,
}: {
  status: RoadmapEventStatus;
  size?: "default" | "compact";
  className?: string;
}) {
  return (
    <Status
      variant={STATUS_VARIANT[status]}
      size={size}
      dot
      className={className}
      title={STATUS_LABEL[status]}
    >
      {STATUS_LABEL[status]}
    </Status>
  );
}
