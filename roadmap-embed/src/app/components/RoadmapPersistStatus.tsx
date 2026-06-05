import {
  CheckCircleIcon,
  Spinner,
  Status,
  Text,
  WarningIcon,
} from "@chghealthcare/unified-design-system";

export function RoadmapPersistStatus({
  isSaving,
  persistFailed,
  lastSaved,
  persistErrorMessage,
}: {
  isSaving: boolean;
  persistFailed: boolean;
  lastSaved: Date | null;
  persistErrorMessage?: string;
}) {
  if (isSaving) {
    return (
      <div className="flex max-w-[min(100vw-8rem,20rem)] items-center gap-2">
        <Spinner className="size-4 shrink-0 text-[var(--uds-text-inverse)]" />
        <Text as="span" appearance="inverse" size="14" className="truncate">
          Saving to file...
        </Text>
      </div>
    );
  }

  if (persistFailed) {
    return (
      <Status
        variant="warning"
        size="compact"
        dot={false}
        className="max-w-[min(100vw-8rem,20rem)]"
      >
        <WarningIcon size={16} className="shrink-0" aria-hidden />
        <span className="truncate text-uds-12 leading-snug">
          {persistErrorMessage ?? "Not saved"}
        </span>
      </Status>
    );
  }

  return (
    <div className="flex max-w-[min(100vw-8rem,20rem)] items-center gap-2">
      <CheckCircleIcon
        size={16}
        className="shrink-0 text-[var(--uds-color-accent-green-400)]"
        aria-hidden
      />
      <Text as="span" appearance="inverse" size="14" className="truncate">
        {lastSaved
          ? `Saved ${lastSaved.toLocaleTimeString()}`
          : "Loaded from code defaults"}
      </Text>
    </div>
  );
}
