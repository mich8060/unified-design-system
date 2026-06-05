/** UDS token-backed layout surfaces for the roadmap embed (no hardcoded hex). */

export const roadmapChrome = {
  pageBg: "bg-[var(--uds-surface-secondary)]",
  header:
    "bg-[var(--uds-logo-modio-black)] text-[var(--uds-text-inverse)] px-6 py-6",
  timelineSticky:
    "bg-[var(--uds-surface-secondary)] border-b border-[var(--uds-border-primary)]",
  timelineQuarterRule: "bg-[var(--uds-border-primary)] opacity-40",
  insertLineHover: "bg-[var(--uds-color-accent-cyan-500)]/45",
} as const;

/** Swimlane capacity band fill */
export const BLUE_SWIMLANE_FILL =
  "color-mix(in srgb, var(--uds-color-accent-cyan-200) 40%, transparent)";

export const TRACK_HIGHLIGHT_FILL =
  "color-mix(in srgb, var(--uds-color-accent-cyan-200) 22%, transparent)";

export const TRACK_HIGHLIGHT_RING =
  "color-mix(in srgb, var(--uds-color-accent-cyan-500) 70%, transparent)";

/** Default event card accent (legacy JSON may still store per-event color). */
export const EVENT_DEFAULT_COLOR = "var(--uds-color-primary-600)";
