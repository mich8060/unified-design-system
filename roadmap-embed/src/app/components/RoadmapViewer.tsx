import { RoadmapEvent, RoadmapData } from "../roadmap-data";
import { QuarterlyTimeline } from "./QuarterlyTimeline";
import { Track } from "./Track";
import { roadmapChrome } from "../roadmap-tokens";
import { RoadmapCapacityCallout } from "./RoadmapCapacityCallout";
import { RoadmapEventCard } from "./RoadmapEventCard";
import { RoadmapPageHeader } from "./RoadmapPageHeader";
import {
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    useCallback,
    type ReactNode,
} from "react";
import { Button, PlusIcon, cn } from "@chghealthcare/unified-design-system";
import {
    calculateWeekPositions,
    scrollElementToCurrentQuarter,
    snapToWeek,
} from "../utils/timeline-grid";
import {
    BLUE_SWIMLANE_BG,
    FIRST_BLUE_TRACK_INDEX,
    TRACK_BAND_TOP_OFFSET,
    TRACK_EVENT_TOP_BASE,
    TRACK_HEIGHT_PX,
    RESOURCE_STRIP_HEIGHT_PX,
    trackBoundaryTopPx,
    trackBandTopPx,
    trackIndexFromContentY,
    resourceStripTopPx,
} from "../utils/roadmap-layout";

interface RoadmapViewerProps {
    data: RoadmapData;
    /** When true, initial horizontal scroll to the current quarter is attempted. */
    timelineReady?: boolean;
    /** Always-visible header controls (e.g. docs expand). Rendered before `headerActions`. */
    headerToolbar?: ReactNode;
    /** Right side of the fixed header (e.g. save status + edit toggle); row uses items-center. */
    headerActions?: ReactNode;
    /** When false, track hover, add-track bands, drag, resize, and double-click edit are disabled. */
    layoutEditMode?: boolean;
    onEventClick?: (event: RoadmapEvent) => void;
    onEventDoubleClick?: (event: RoadmapEvent) => void;
    onEventUpdate?: (eventId: string, updates: Partial<RoadmapEvent>) => void;
    /** Insert a swimlane after `afterTrackIndex` (between that row and the next). */
    onInsertTrackAfter?: (afterTrackIndex: number) => void;
    /** Create a new event on the given swimlane (edit mode). */
    onAddEventInTrack?: (trackIndex: number) => void;
}

/** Taller hit band so reaching the fixed left button doesn’t drop hover. */
const INSERT_HIT_PX = 40;
/** Add Track / add-event controls stay viewport-fixed at these horizontal insets. */
const VIEWPORT_FIXED_LEFT_PX = 24;
const VIEWPORT_FIXED_RIGHT_PX = 24;
const RESOURCE_LABEL_CONTENT_LEFT_PX = 24;
const DRAG_THRESHOLD_PX = 6;

export function RoadmapViewer({
    data,
    timelineReady = true,
    headerToolbar,
    headerActions,
    layoutEditMode = false,
    onEventClick,
    onEventDoubleClick,
    onEventUpdate,
    onInsertTrackAfter,
    onAddEventInTrack,
}: RoadmapViewerProps) {
    const TOTAL_WIDTH = 3000; // Full calendar width
    /** Bottom Y of the last swimlane: no extra slack below tracks. */
    const tracksContentHeightPx =
        data.trackCount > 0
            ? trackBandTopPx(data.trackCount - 1) + TRACK_HEIGHT_PX
            : TRACK_BAND_TOP_OFFSET;
    const canvasScrollRef = useRef<HTMLDivElement>(null);
    const hasScrolledToCurrentQuarter = useRef(false);
    const insertStripRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [insertLineViewportCenters, setInsertLineViewportCenters] = useState<
        number[]
    >([]);
    /** Viewport Y of each swimlane vertical center (for fixed right “add event” control). */
    const [trackBandViewportCenters, setTrackBandViewportCenters] = useState<
        number[]
    >([]);

    const syncViewportOverlayPositions = useCallback(() => {
        const canvas = canvasScrollRef.current;
        setInsertLineViewportCenters(
            Array.from({ length: data.trackCount }, (_, i) => {
                const el = insertStripRefs.current[i];
                if (!el) return Number.NaN;
                const r = el.getBoundingClientRect();
                return r.top + r.height / 2;
            }),
        );
        if (!canvas) {
            setTrackBandViewportCenters([]);
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const scrollTop = canvas.scrollTop;
        setTrackBandViewportCenters(
            Array.from({ length: data.trackCount }, (_, i) => {
                const centerContentY = trackBandTopPx(i) + TRACK_HEIGHT_PX / 2;
                return rect.top + centerContentY - scrollTop;
            }),
        );
    }, [data.trackCount]);

    useLayoutEffect(() => {
        syncViewportOverlayPositions();
    }, [syncViewportOverlayPositions]);

    useEffect(() => {
        if (!timelineReady || hasScrolledToCurrentQuarter.current) return;

        const canvas =
            canvasScrollRef.current ??
            document.getElementById("roadmap-canvas");
        if (!canvas) return;

        let cancelled = false;

        const attemptScroll = () => {
            if (cancelled || hasScrolledToCurrentQuarter.current) return;
            if (scrollElementToCurrentQuarter(canvas)) {
                hasScrolledToCurrentQuarter.current = true;
                syncViewportOverlayPositions();
                stopRetry();
            }
        };

        let intervalId = 0;
        let timeoutId = 0;
        let resizeObserver: ResizeObserver | undefined;

        const stopRetry = () => {
            cancelled = true;
            resizeObserver?.disconnect();
            if (intervalId) window.clearInterval(intervalId);
            if (timeoutId) window.clearTimeout(timeoutId);
        };

        attemptScroll();
        requestAnimationFrame(attemptScroll);
        requestAnimationFrame(() => requestAnimationFrame(attemptScroll));

        resizeObserver = new ResizeObserver(attemptScroll);
        resizeObserver.observe(canvas);
        const capture = canvas.querySelector("[data-roadmap-capture]");
        if (capture instanceof HTMLElement) {
            resizeObserver.observe(capture);
        }

        intervalId = window.setInterval(attemptScroll, 100);
        timeoutId = window.setTimeout(stopRetry, 5000);

        return stopRetry;
    }, [timelineReady, syncViewportOverlayPositions, data.trackCount]);

    useEffect(() => {
        if (!layoutEditMode) {
            setResizing(null);
            setDragging(null);
            setDragIntent(null);
            setHoveredTrackIndex(null);
        }
    }, [layoutEditMode]);

    useEffect(() => {
        const canvas = canvasScrollRef.current;
        if (!canvas) return;
        syncViewportOverlayPositions();
        canvas.addEventListener("scroll", syncViewportOverlayPositions, {
            passive: true,
        });
        window.addEventListener("resize", syncViewportOverlayPositions);
        return () => {
            canvas.removeEventListener("scroll", syncViewportOverlayPositions);
            window.removeEventListener("resize", syncViewportOverlayPositions);
        };
    }, [syncViewportOverlayPositions]);

    const [resizing, setResizing] = useState<{
        eventId: string;
        edge: "left" | "right";
        startX: number;
        startLeft: number;
        startWidth: number;
    } | null>(null);

    const [dragging, setDragging] = useState<{
        eventId: string;
    } | null>(null);

    const [dragIntent, setDragIntent] = useState<{
        eventId: string;
        startX: number;
        startY: number;
    } | null>(null);

    const [hoveredTrackIndex, setHoveredTrackIndex] = useState<number | null>(
        null,
    );

    const weekPositions = useRef(calculateWeekPositions());

    const updateHoveredTrack = useCallback(
        (e: React.MouseEvent) => {
            const canvas = canvasScrollRef.current;
            if (!canvas) {
                setHoveredTrackIndex(null);
                return;
            }
            const rect = canvas.getBoundingClientRect();
            const inside =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;
            if (!inside) {
                setHoveredTrackIndex(null);
                return;
            }
            const y = e.clientY - rect.top + canvas.scrollTop;
            let found: number | null = null;
            for (let i = 0; i < data.trackCount; i++) {
                const top = trackBandTopPx(i);
                if (y >= top && y < top + TRACK_HEIGHT_PX) {
                    found = i;
                    break;
                }
            }
            setHoveredTrackIndex(found);
        },
        [data.trackCount],
    );

    const handleResizeStart = (
        e: React.MouseEvent,
        event: RoadmapEvent,
        edge: "left" | "right",
    ) => {
        if (!layoutEditMode) return;
        e.stopPropagation();
        setResizing({
            eventId: event.id,
            edge,
            startX: e.clientX,
            startLeft: event.left,
            startWidth: event.width,
        });
    };

    const handleResizeMove = (e: React.MouseEvent) => {
        if (!resizing) return;

        const deltaX = e.clientX - resizing.startX;
        const event = data.events.find((e) => e.id === resizing.eventId);
        if (!event) return;

        if (resizing.edge === "right") {
            // Resize from right edge
            const newWidth = resizing.startWidth + deltaX;
            const newRight = resizing.startLeft + newWidth;
            const snappedRight = snapToWeek(newRight, weekPositions.current);
            const snappedWidth = snappedRight - resizing.startLeft;

            if (snappedWidth >= 50) {
                // Minimum width
                onEventUpdate?.(resizing.eventId, { width: snappedWidth });
            }
        } else {
            // Resize from left edge
            const newLeft = resizing.startLeft + deltaX;
            const snappedLeft = snapToWeek(newLeft, weekPositions.current);
            const newWidth = resizing.startWidth + (resizing.startLeft - snappedLeft);

            if (newWidth >= 50) {
                // Minimum width
                onEventUpdate?.(resizing.eventId, {
                    left: snappedLeft,
                    width: newWidth,
                });
            }
        }
    };

    const handleResizeEnd = () => {
        setResizing(null);
    };

    const handleDragStart = (e: React.MouseEvent, event: RoadmapEvent) => {
        if (!layoutEditMode) return;
        e.stopPropagation();
        setDragIntent({
            eventId: event.id,
            startX: e.clientX,
            startY: e.clientY,
        });
    };

    const handleDragMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        const canvas = canvasScrollRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const y = e.clientY - rect.top + canvas.scrollTop;
        const clampedTrackIndex = trackIndexFromContentY(y, data.trackCount);
        const snappedTop =
            TRACK_EVENT_TOP_BASE + clampedTrackIndex * TRACK_HEIGHT_PX;

        onEventUpdate?.(dragging.eventId, {
            top: snappedTop,
            track: clampedTrackIndex,
        });
    };

    const handleDragEnd = () => {
        setDragging(null);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (layoutEditMode) {
            updateHoveredTrack(e);
        }
        if (resizing) {
            handleResizeMove(e);
            return;
        }
        if (dragging) {
            handleDragMove(e);
            return;
        }
        if (dragIntent) {
            const dx = e.clientX - dragIntent.startX;
            const dy = e.clientY - dragIntent.startY;
            if (dx * dx + dy * dy >= DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) {
                setDragging({ eventId: dragIntent.eventId });
                setDragIntent(null);
            }
        }
    };

    const handleMouseUp = () => {
        handleResizeEnd();
        handleDragEnd();
        setDragIntent(null);
    };

    return (
        <div
            className={cn("h-full w-full overflow-auto", roadmapChrome.pageBg)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
                handleMouseUp();
                setHoveredTrackIndex(null);
            }}
        >
            <RoadmapPageHeader
                title={data.title}
                subtitle={data.subtitle}
                toolbar={headerToolbar}
                actions={headerActions}
            />

            {/* Roadmap Canvas */}
            <div
                id="roadmap-canvas"
                ref={canvasScrollRef}
                className="fixed top-[100px] left-0 right-0 overflow-auto"
                style={{
                    maxHeight: "calc(100vh - 100px)",
                }}
            >
                <div
                    className="relative min-h-full"
                    data-roadmap-capture
                    style={{
                        width: `${TOTAL_WIDTH}px`,
                        minHeight: tracksContentHeightPx,
                    }}
                >
                    {/* Timeline Grid - Quarterly dividers behind events */}
                    <QuarterlyTimeline />

                    {data.trackCount > FIRST_BLUE_TRACK_INDEX && (
                        <div
                            className="absolute left-0 z-[12] pointer-events-none"
                            style={{
                                top: `${resourceStripTopPx()}px`,
                                width: `${TOTAL_WIDTH}px`,
                                height: `${RESOURCE_STRIP_HEIGHT_PX}px`,
                                backgroundColor: BLUE_SWIMLANE_BG,
                            }}
                        />
                    )}

                    {/* Tracks - invisible by default, visible with debug mode */}
                    {Array.from({ length: data.trackCount }).map(
                        (_, index) => (
                            <Track
                                key={index}
                                trackIndex={index}
                                trackHeight={TRACK_HEIGHT_PX}
                                totalWidth={TOTAL_WIDTH}
                                highlighted={
                                    layoutEditMode && hoveredTrackIndex === index
                                }
                            />
                        ),
                    )}

                    {layoutEditMode &&
                        hoveredTrackIndex !== null &&
                        onAddEventInTrack && (
                            <Button
                                type="button"
                                variant="default"
                                size="icon"
                                aria-label="Add event to this track"
                                className="fixed z-[45] -translate-y-1/2 shadow-md"
                                style={{
                                    right: VIEWPORT_FIXED_RIGHT_PX,
                                    top:
                                        Number.isFinite(
                                            trackBandViewportCenters[hoveredTrackIndex] ?? Number.NaN,
                                        )
                                            ? trackBandViewportCenters[hoveredTrackIndex]!
                                            : -9999,
                                }}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddEventInTrack(hoveredTrackIndex);
                                }}
                            >
                                <PlusIcon size={20} weight="bold" aria-hidden />
                            </Button>
                        )}

                    {onInsertTrackAfter &&
                        Array.from({ length: data.trackCount }).map((_, afterIndex) => {
                            const lineY = trackBoundaryTopPx(afterIndex);
                            const centerY =
                                insertLineViewportCenters[afterIndex] ?? Number.NaN;
                            return (
                                <div
                                    key={`track-insert-${afterIndex}`}
                                    ref={(el) => {
                                        insertStripRefs.current[afterIndex] = el;
                                    }}
                                    className="absolute left-0 z-30 flex flex-col items-center justify-center gap-0 group/ins"
                                    style={{
                                        top: `${lineY - INSERT_HIT_PX / 2}px`,
                                        width: `${TOTAL_WIDTH}px`,
                                        height: `${INSERT_HIT_PX}px`,
                                    }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    <div
                                        className={cn(
                                            "pointer-events-none absolute top-1/2 right-8 left-8 h-px -translate-y-1/2 bg-transparent transition-colors group-hover/ins:",
                                            roadmapChrome.insertLineHover,
                                        )}
                                        aria-hidden
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="pointer-events-none fixed z-40 -translate-y-1/2 opacity-0 shadow-md transition-all group-hover/ins:pointer-events-auto group-hover/ins:opacity-100"
                                        style={{
                                            left: VIEWPORT_FIXED_LEFT_PX,
                                            top: Number.isFinite(centerY) ? centerY : -9999,
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onInsertTrackAfter(afterIndex);
                                        }}
                                    >
                                        Add Track
                                    </Button>
                                </div>
                            );
                        })}

                    {data.events.map((event) => (
                        <RoadmapEventCard
                            key={event.id}
                            event={event}
                            layoutEditMode={layoutEditMode}
                            onClick={() => onEventClick?.(event)}
                            onDoubleClick={(e) => {
                                if (!layoutEditMode) return;
                                e.stopPropagation();
                                onEventDoubleClick?.(event);
                            }}
                            onDragStart={handleDragStart}
                            onResizeStart={handleResizeStart}
                        />
                    ))}
                </div>
            </div>

            {data.trackCount > FIRST_BLUE_TRACK_INDEX ? (
                <RoadmapCapacityCallout
                    leftPx={RESOURCE_LABEL_CONTENT_LEFT_PX}
                    bottomPx={RESOURCE_LABEL_CONTENT_LEFT_PX}
                    explanation={(
                        data.capacityBandExplanation?.trim() ||
                        "Stretch work we can’t staff yet—not the same as Blocked on a card."
                    ).trim()}
                />
            ) : null}
        </div>
    );
}