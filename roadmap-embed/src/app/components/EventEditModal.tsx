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
import { RoadmapRiskFields } from "./RoadmapRiskFields";
import { ROADMAP_STATUS_OPTIONS, STATUS_LABEL } from "../roadmap-status";

interface EventEditModalProps {
  event: RoadmapEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (eventId: string, updates: Partial<RoadmapEvent>) => void;
}

export function EventEditModal({
  event,
  open,
  onOpenChange,
  onUpdate,
}: EventEditModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {event ? (
          <>
            <DialogHeader>
              <DialogTitle>Edit event</DialogTitle>
              <DialogDescription>
                Changes apply immediately and are saved with your roadmap.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="pt-2">
              <Field>
                <FieldLabel htmlFor="event-edit-title">Title</FieldLabel>
                <Input
                  id="event-edit-title"
                  value={event.title}
                  onChange={(e) => onUpdate(event.id, { title: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="event-edit-description">Description</FieldLabel>
                <Textarea
                  id="event-edit-description"
                  value={event.description}
                  onChange={(e) =>
                    onUpdate(event.id, { description: e.target.value })
                  }
                  rows={3}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="event-edit-status">Roadmap status</FieldLabel>
                <NativeSelect
                  id="event-edit-status"
                  className="w-full"
                  value={event.status ?? "on_track"}
                  onChange={(e) =>
                    onUpdate(event.id, {
                      status: e.target.value as RoadmapEventStatus,
                    })
                  }
                >
                  {ROADMAP_STATUS_OPTIONS.map((v) => (
                    <option key={v} value={v}>
                      {STATUS_LABEL[v]}
                    </option>
                  ))}
                </NativeSelect>
                <FieldDescription>
                  Shown on the timeline card. Light blue swimlanes are about capacity,
                  not this status.
                </FieldDescription>
              </Field>
              {((event.status ?? "on_track") === "at_risk" ||
                (event.status ?? "on_track") === "blocked") && (
                <RoadmapRiskFields
                  idPrefix="event-edit"
                  intro="Risk detail (issues, mitigation, unblock)"
                  values={event}
                  onChange={(patch) => onUpdate(event.id, patch)}
                />
              )}
            </FieldGroup>
            <DialogFooter showCloseButton>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
