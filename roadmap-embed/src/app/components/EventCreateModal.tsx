import { useEffect, useState, type FormEvent } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  NativeSelect,
  Textarea,
} from "@chghealthcare/unified-design-system";
import type { RoadmapEvent, RoadmapEventStatus } from "../roadmap-data";
import { ROADMAP_STATUS_OPTIONS, STATUS_LABEL } from "../roadmap-status";
import { RoadmapRiskFields } from "./RoadmapRiskFields";
import { EVENT_DEFAULT_COLOR } from "../roadmap-tokens";
import { TRACK_EVENT_TOP_BASE, TRACK_HEIGHT_PX } from "../utils/roadmap-layout";
import {
  TIMELINE_MONTH_BLOCKS,
  eventRectFromTimelineWeeks,
} from "../utils/timeline-grid";

export interface EventCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trackIndex: number;
  onCreate: (event: RoadmapEvent) => void;
}

export function EventCreateModal({
  open,
  onOpenChange,
  trackIndex,
  onCreate,
}: EventCreateModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<RoadmapEventStatus>("on_track");
  const [riskIssue, setRiskIssue] = useState("");
  const [riskMitigation, setRiskMitigation] = useState("");
  const [riskNeededToUnblock, setRiskNeededToUnblock] = useState("");
  const [monthIndex, setMonthIndex] = useState(0);
  const [startWeek, setStartWeek] = useState(1);
  const [durationWeeks, setDurationWeeks] = useState(4);

  const monthBlock = TIMELINE_MONTH_BLOCKS[monthIndex];
  const maxWeekInMonth = monthBlock?.weekCount ?? 4;

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setDescription("");
    setStatus("on_track");
    setRiskIssue("");
    setRiskMitigation("");
    setRiskNeededToUnblock("");
    setMonthIndex(0);
    setStartWeek(1);
    setDurationWeeks(4);
  }, [open, trackIndex]);

  useEffect(() => {
    setStartWeek((w) => Math.min(Math.max(1, w), maxWeekInMonth));
  }, [maxWeekInMonth, monthIndex]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    const { left, width } = eventRectFromTimelineWeeks(
      monthIndex,
      startWeek,
      durationWeeks,
    );
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const top = TRACK_EVENT_TOP_BASE + trackIndex * TRACK_HEIGHT_PX;
    const st = status;
    const payload: RoadmapEvent = {
      id,
      title: t,
      description: description.trim(),
      left,
      width,
      top,
      color: EVENT_DEFAULT_COLOR,
      track: trackIndex,
      status: st,
    };
    if (st === "at_risk" || st === "blocked") {
      if (riskIssue.trim()) payload.riskIssue = riskIssue.trim();
      if (riskMitigation.trim()) payload.riskMitigation = riskMitigation.trim();
      if (riskNeededToUnblock.trim()) {
        payload.riskNeededToUnblock = riskNeededToUnblock.trim();
      }
    }
    onCreate(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New event</DialogTitle>
          <DialogDescription>
            Add an event to swimlane {trackIndex + 1}. It is saved with your roadmap
            file.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="pt-2">
            <Field>
              <FieldLabel htmlFor="event-create-title">Title</FieldLabel>
              <Input
                id="event-create-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Event title"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="event-create-description">Description</FieldLabel>
              <Textarea
                id="event-create-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Optional description"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="event-create-status">Roadmap status</FieldLabel>
              <NativeSelect
                id="event-create-status"
                className="w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value as RoadmapEventStatus)}
              >
                {ROADMAP_STATUS_OPTIONS.map((v) => (
                  <option key={v} value={v}>
                    {STATUS_LABEL[v]}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            {(status === "at_risk" || status === "blocked") && (
              <RoadmapRiskFields
                idPrefix="event-create"
                intro="Optional: issues, mitigation, and what would unblock"
                values={{
                  riskIssue,
                  riskMitigation,
                  riskNeededToUnblock,
                }}
                onChange={(patch) => {
                  if (patch.riskIssue !== undefined) setRiskIssue(patch.riskIssue);
                  if (patch.riskMitigation !== undefined) {
                    setRiskMitigation(patch.riskMitigation);
                  }
                  if (patch.riskNeededToUnblock !== undefined) {
                    setRiskNeededToUnblock(patch.riskNeededToUnblock);
                  }
                }}
              />
            )}
            <Field>
              <FieldLabel htmlFor="event-create-month">Starting month</FieldLabel>
              <NativeSelect
                id="event-create-month"
                className="w-full"
                value={String(monthIndex)}
                onChange={(e) =>
                  setMonthIndex(Number.parseInt(e.target.value, 10))
                }
              >
                {TIMELINE_MONTH_BLOCKS.map((b, i) => (
                  <option key={b.id} value={i}>
                    {b.label}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="event-create-week">Starting week</FieldLabel>
                <Input
                  id="event-create-week"
                  type="number"
                  min={1}
                  max={maxWeekInMonth}
                  value={startWeek}
                  onChange={(e) =>
                    setStartWeek(
                      Math.min(
                        maxWeekInMonth,
                        Math.max(1, Number.parseInt(e.target.value, 10) || 1),
                      ),
                    )
                  }
                />
                <FieldDescription>
                  Week 1–{maxWeekInMonth} within this month
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="event-create-duration">Duration (weeks)</FieldLabel>
                <Input
                  id="event-create-duration"
                  type="number"
                  min={1}
                  max={104}
                  value={durationWeeks}
                  onChange={(e) =>
                    setDurationWeeks(
                      Math.max(1, Number.parseInt(e.target.value, 10) || 1),
                    )
                  }
                />
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
