import {
  TRACK_HIGHLIGHT_FILL,
  TRACK_HIGHLIGHT_RING,
} from "../roadmap-tokens";
import {
  BLUE_SWIMLANE_BG,
  FIRST_BLUE_TRACK_INDEX,
  TRACK_HEIGHT_PX,
  trackBandTopPx,
} from "../utils/roadmap-layout";

export { FIRST_BLUE_TRACK_INDEX };

interface TrackProps {
  trackIndex: number;
  trackHeight?: number;
  totalWidth: number;
  /** Row highlight when pointer is in this swimlane (from canvas hit-testing). */
  highlighted?: boolean;
}

export function Track({
  trackIndex,
  trackHeight = TRACK_HEIGHT_PX,
  totalWidth,
  highlighted = false,
}: TrackProps) {
  const hasBackgroundColor = trackIndex >= FIRST_BLUE_TRACK_INDEX;
  const backgroundColor = hasBackgroundColor
    ? BLUE_SWIMLANE_BG
    : highlighted
      ? TRACK_HIGHLIGHT_FILL
      : "transparent";

  return (
    <div
      className={`absolute left-0 transition-[background-color,box-shadow] duration-150 ${
        highlighted ? "z-[7]" : "z-5"
      }`}
      style={{
        top: `${trackBandTopPx(trackIndex)}px`,
        height: `${trackHeight}px`,
        width: `${totalWidth}px`,
        backgroundColor,
        boxShadow: highlighted
          ? `inset 0 0 0 3px ${TRACK_HIGHLIGHT_RING}`
          : undefined,
      }}
      data-track={trackIndex}
    />
  );
}
