# Calendar

A full-size calendar component for displaying events, scheduling, and date navigation. Supports multi-day spanning events that cross week and month boundaries. Events are rendered as lightweight inline bars within the calendar grid.

## When to Use
- Displaying a full monthly or weekly calendar view
- Showing events that span multiple days, weeks, or months
- Building scheduling or booking interfaces
- Team calendar or project timeline views

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `view` | `string` | `"month"` | `"month"`, `"week"` | Display mode |
| `defaultDate` | `Date` | Today | Any Date | Initial date to display |
| `value` | `Date` | — | Any Date | Selected date (controlled) |
| `events` | `array` | `[]` | Event objects | Array of event objects |
| `onDateSelect` | `function` | — | `(date) => void` | Callback when date is clicked |
| `onEventClick` | `function` | — | `(event, e) => void` | Callback when event is clicked |
| `maxEventsPerDay` | `number` | `3` | Any number | Max event rows before "+N more" |
| `showWeekNumbers` | `boolean` | `false` | `true`, `false` | Show ISO week number column |
| `size` | `string` | `"default"` | `"default"`, `"compact"` | Size variant |
| `className` | `string` | `""` | Any CSS class | Additional CSS classes |

## Event Object Shape

```js
{
  id: "evt-1",             // Unique identifier (string or number)
  title: "Conference",     // Display title (required)
  startDate: "2025-03-10", // Start date — Date object or "YYYY-MM-DD" (required)
  endDate: "2025-03-14",   // End date — for multi-day events (optional)
  type: "travel",          // "travel" (blue) | "assignment" (orange) | "unassigned" (gray)
  status: "active",        // "active" (solid fill) | "past" (muted) | "pending" (striped)
  startTime: "09:00",      // Optional — prepended to title for timed events
  endTime: "17:00",        // Optional
  allDay: true,            // Optional — forces spanning rendering
}
```

**Backward compatible:** `date` works as an alias for `startDate`.

## Event Type × Status Color Matrix

| Type | Active | Past | Pending |
|------|--------|------|---------|
| `"travel"` | Primary blue fill, white text | Neutral gray fill | Cyan bg + diagonal stripe |
| `"assignment"` | Secondary fill, white text | Neutral gray fill | Aqua bg + diagonal stripe |
| `"unassigned"` | Neutral 500 fill, white text | Neutral 100 fill | Neutral bg + diagonal stripe |

## Code Examples

### Basic Calendar
```jsx
import { Calendar } from "@mich8060/chg-design-system";

<Calendar />
```

### Multi-Day Spanning Events
```jsx
import { Calendar } from "@mich8060/chg-design-system";

const events = [
  {
    id: "s1",
    title: "Company Retreat",
    startDate: new Date(2025, 2, 3),
    endDate: new Date(2025, 2, 7),
    type: "travel",
    status: "active",
    allDay: true,
  },
  {
    id: "s2",
    title: "Sprint 42",
    startDate: new Date(2025, 2, 10),
    endDate: new Date(2025, 2, 21),
    type: "assignment",
    status: "active",
    allDay: true,
  },
];

<Calendar events={events} />
```

### Mixed Events (Spanning + Timed)
```jsx
const events = [
  // Multi-day (spanning bar)
  { id: "s1", title: "Conference", startDate: new Date(2025, 2, 10), endDate: new Date(2025, 2, 14), type: "travel", status: "active", allDay: true },
  // Single-day (timed bar with time prefix)
  { id: "e1", title: "Standup", startDate: new Date(2025, 2, 10), type: "travel", status: "active", startTime: "09:00" },
  { id: "e2", title: "Review", startDate: new Date(2025, 2, 12), type: "assignment", status: "past", startTime: "14:00" },
];

<Calendar events={events} onEventClick={(evt) => console.log(evt)} />
```

### Week View
```jsx
<Calendar view="week" events={events} />
```

### Compact with Date Selection
```jsx
const [selected, setSelected] = useState(null);

<Calendar
  size="compact"
  value={selected}
  onDateSelect={setSelected}
  events={events}
/>
```

### With Week Numbers
```jsx
<Calendar showWeekNumbers events={events} />
```

## Key Behaviors
- **Inline event bars** — Calendar renders its own lightweight event bars (not EventCard). For standalone rich event display, use the `EventCard` component.
- **Multi-day events** render as horizontal bars spanning across day columns
- **Week-crossing events** automatically wrap to the next week row
- **Month-crossing events** show continuation from/to adjacent months
- **Lane assignment** stacks overlapping events vertically with no overlap
- **Overflow** shows "+N more" when events exceed `maxEventsPerDay`
- **Start/end caps** — Bars have rounded corners at span start, flat at continuation points

## Composition
- Renders its own inline event bars (no dependency on EventCard)
- Uses `Button` for navigation controls
- Combine with `Tabs` for view switching
- For standalone event display in lists/dashboards, use `EventCard`

## Do's and Don'ts
- **Do** provide unique `id` values for each event
- **Do** use `startDate`/`endDate` for multi-day events
- **Do** set `type` and `status` for correct color styling
- **Don't** mix `date` and `startDate` on the same event
- **Do** use `allDay: true` for events that span entire days
- **Don't** set `maxEventsPerDay` too low — 2-4 is ideal
- **Don't** try to use `EventCard` inside Calendar — the calendar renders its own bars

## Accessibility
- Day cells are keyboard-navigable with `role="button"` and `tabIndex`
- Event bars are `<button>` elements when clickable
- ARIA labels include full date context
