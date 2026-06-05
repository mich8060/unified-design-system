import { useState, useEffect } from "react";
import { Button, DownloadSimpleIcon } from "@chghealthcare/unified-design-system";
import { RoadmapPersistStatus } from "./components/RoadmapPersistStatus";
import { RoadmapViewer } from "./components/RoadmapViewer";
import { EventCreateModal } from "./components/EventCreateModal";
import { EventEditModal } from "./components/EventEditModal";
import {
  initialRoadmapData,
  RoadmapData,
  RoadmapEvent,
} from "./roadmap-data";
import {
  applyEventPositionsFile,
  EVENT_POSITIONS_API,
  fetchEventPositions,
  getInitialRoadmapDataFromCode,
  downloadEventPositionsFile,
  persistEventPositions,
  usesRemoteEventPositionsApi,
} from "./event-positions";
import { RoadmapDocsExpandButton } from "./RoadmapDocsExpandButton";
import { insertTrackAfter } from "./utils/roadmap-layout";

export default function App() {
  const [roadmapData, setRoadmapData] = useState<RoadmapData>(
    getInitialRoadmapDataFromCode,
  );
  const [editMode, setEditMode] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [persistFailed, setPersistFailed] = useState(false);
  const [positionsHydrated, setPositionsHydrated] = useState(false);
  const [inlineEditEventId, setInlineEditEventId] = useState<string | null>(
    null,
  );
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [createEventTrackIndex, setCreateEventTrackIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return;
      if (e.key.toLowerCase() !== "e") return;
      e.preventDefault();
      setEditMode((on) => !on);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!editMode) {
      setInlineEditEventId(null);
      setCreateEventOpen(false);
    }
  }, [editMode]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const file = await fetchEventPositions();
      if (cancelled) return;
      if (file) {
        const hasEvents =
          Array.isArray(file.events) && file.events.length > 0;
        const hasPositions =
          file.positions && Object.keys(file.positions).length > 0;
        const hasTrackCount =
          typeof file.trackCount === "number" && file.trackCount >= 1;
        const hasMeta =
          file.title !== undefined ||
          file.subtitle !== undefined ||
          file.whyThisMatters !== undefined ||
          file.valueSnapshot !== undefined ||
          file.capacityBandExplanation !== undefined;
        if (
          hasEvents ||
          hasPositions ||
          hasTrackCount ||
          hasMeta
        ) {
          setRoadmapData(applyEventPositionsFile(initialRoadmapData, file));
        }
      }
      setPositionsHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!positionsHydrated) return;

    const saveData = async () => {
      setIsSaving(true);
      setPersistFailed(false);
      const ok = await persistEventPositions(roadmapData);
      setIsSaving(false);
      if (ok) {
        setLastSaved(new Date());
      } else {
        setPersistFailed(true);
      }
    };

    const timeoutId = setTimeout(() => {
      void saveData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [roadmapData, positionsHydrated]);

  const handleEventUpdate = (eventId: string, updates: Partial<RoadmapEvent>) => {
    setRoadmapData((prevData) => ({
      ...prevData,
      events: prevData.events.map((event) =>
        event.id === eventId ? { ...event, ...updates } : event,
      ),
    }));
  };

  const handleInsertTrackAfter = (afterTrackIndex: number) => {
    setRoadmapData((prev) => insertTrackAfter(prev, afterTrackIndex));
  };

  const handleAddEventInTrack = (trackIndex: number) => {
    setCreateEventTrackIndex(trackIndex);
    setCreateEventOpen(true);
  };

  const handleCreateEvent = (event: RoadmapEvent) => {
    setRoadmapData((prev) => ({
      ...prev,
      events: [...prev.events, event],
    }));
  };

  const inlineEditEvent =
    inlineEditEventId === null
      ? null
      : (roadmapData.events.find((e) => e.id === inlineEditEventId) ?? null);

  useEffect(() => {
    if (
      inlineEditEventId !== null &&
      !roadmapData.events.some((e) => e.id === inlineEditEventId)
    ) {
      setInlineEditEventId(null);
    }
  }, [roadmapData.events, inlineEditEventId]);

  const persistErrorMessage = import.meta.env.DEV
    ? "Not saved — run npm run dev (API + Vite)"
    : usesRemoteEventPositionsApi()
      ? "Not saved — Railway request failed (see Network tab)"
      : "Not saved — add VITE_EVENT_POSITIONS_API_BASE on Vercel + redeploy";

  const headerActions = (
    <div className="flex flex-wrap items-center gap-3 sm:gap-6">
      <RoadmapPersistStatus
        isSaving={isSaving}
        persistFailed={persistFailed}
        lastSaved={lastSaved}
        persistErrorMessage={persistFailed ? persistErrorMessage : undefined}
      />

      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={() => downloadEventPositionsFile(roadmapData)}
        title="Download event-positions.json — replace public/api/event-positions in the docs repo"
      >
        <DownloadSimpleIcon size={16} aria-hidden />
        Export JSON
      </Button>
    </div>
  );

  return (
    <div className="relative size-full">
      <RoadmapViewer
        data={roadmapData}
        timelineReady={positionsHydrated}
        headerToolbar={<RoadmapDocsExpandButton />}
        headerActions={editMode ? headerActions : undefined}
        layoutEditMode={editMode}
        onEventClick={(event) => {
          console.log("Event clicked:", event);
        }}
        onEventDoubleClick={(event) => setInlineEditEventId(event.id)}
        onEventUpdate={handleEventUpdate}
        onInsertTrackAfter={editMode ? handleInsertTrackAfter : undefined}
        onAddEventInTrack={editMode ? handleAddEventInTrack : undefined}
      />

      <EventEditModal
        key={inlineEditEventId ?? "closed"}
        event={inlineEditEvent}
        open={editMode && inlineEditEvent !== null}
        onOpenChange={(open) => {
          if (!open) setInlineEditEventId(null);
        }}
        onUpdate={handleEventUpdate}
      />

      <EventCreateModal
        open={createEventOpen}
        onOpenChange={setCreateEventOpen}
        trackIndex={createEventTrackIndex}
        onCreate={handleCreateEvent}
      />
    </div>
  );
}
