# Provider Portal Home

<!-- Distilled from UDS prototyping starter dashboards; keep product fixtures generic. -->

## When to use it

Use for provider-facing home screens: a fixed left identity rail (profile, team, reminders, links) beside a main workflow column. Right-column variants include `Steps` walkthroughs, `MicroCalendar` availability, or `Accordion` + job cards.

## Required imports

```ts
import {
  AppShell,
  Menu,
  Card,
  Avatar,
  Badge,
  Button,
  Progress,
  Steps,
  Step,
  StepMarker,
  StepContent,
  Medallion,
  Link,
} from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"
```

Optional right-column primitives: `MicroCalendar` from `@chghealthcare/unified-design-system/micro-calendar`; `Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionContent` from the package root.

## Required layout primitives

- Shared **`AppShell` + `Menu`** shell (static or router layout).
- Content-only page body: optional full-width action banner (`Card` + `Progress`) → `lg:grid-cols-[445px_minmax(0,1fr)]` (or `~386px` for denser rails).
- Below `lg`, collapse to a single column preserving reading order (rail, then main).
- **Main section gap** — First-level siblings (including rail Cards): only `--uds-gap-16` or `--uds-gap-24` (no `gap-3`).
- **Required: short regions share a row at `lg+`** — Rail + main / paired panels at desktop; do not stack skinny short regions full-width alone.
- **Boxed padding** — Every `Card` / bordered panel: `CardContent` or p-16/24; content must not touch the box.

## Allowed right-column variants

| Variant | Primitives |
| --- | --- |
| Onboarding walkthrough | `Steps` / `Step` / `StepMarker` / `StepContent` |
| Availability / schedule | `MicroCalendar` inside a `Card` |
| Discovery / jobs | `Accordion` + recommended job `Card`s |

## Forbidden substitutions

- Do not hardcode brand hex; rely on Menu `brand` / semantic tokens.
- Do not duplicate AppShell inside the page — shell owns the rail.
- Do not invent a second product nav inside the left rail when `Menu` already navigates.

## JSX skeleton

```tsx
<div className="flex min-w-0 flex-col gap-6 p-4 md:p-6">
  <Card>{/* optional Progress action banner */}</Card>
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[445px_minmax(0,1fr)]">
    <div className="flex flex-col gap-3">
      <Card>{/* Avatar + name + Badge fields */}</Card>
      <Card>{/* team / reminders / links */}</Card>
    </div>
    <Card>{/* Steps | MicroCalendar | Accordion workflow */}</Card>
  </div>
</div>
```

## Canonical example

[`ai/examples/provider-portal-home.tsx`](../examples/provider-portal-home.tsx)

## Brand application

Identity and emphasis via `Avatar`, `Badge`, `Medallion`, and `Progress`. Keep rail cards compact (`rounded-[length:var(--uds-radius-8)]` / ≤12px).
