# EventCard (Blade)

A visual scheduling event bar for calendars, schedules, and lists.

## When to Use
- Displaying events within the Calendar component (automatic)
- Building event lists, timelines, or schedule views
- Dashboard scheduling summaries
- Any UI that shows travel, assignment, or unassigned events

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `title` | `string` | `"Title"` | Any text | Event title text |
| `type` | `string` | `"travel"` | `"travel"`, `"assignment"`, `"unassigned"` | Event type (determines color) |
| `status` | `string` | `"active"` | `"active"`, `"past"`, `"pending"` | Event status (determines fill style) |
| `badge` | `string` | — | Any text | Badge label text (compact inverse Tag) |
| `icon` | `boolean` | `false` | `true`, `false` | Show CornersOut expand icon |
| `startCap` | `boolean` | `true` | `true`, `false` | Rounded left corners |
| `endCap` | `boolean` | `true` | `true`, `false` | Rounded right corners |
| `onClick` | `function` | — | `() => void` | Click handler |
| `className` | `string` | `""` | Any CSS class | Additional CSS classes |

## Color Matrix

| Type | Active | Past | Pending |
|------|--------|------|---------|
| `travel` | Blue solid (`primary-500`) | Neutral gray (`neutrals-100`) | Cyan striped (`cyan-50` + `cyan-200` border) |
| `assignment` | Orange solid (`secondary-500`) | Neutral gray (`neutrals-100`) | Aqua striped (`aqua-50` + `aqua-200` border) |
| `unassigned` | Gray solid (`neutrals-500`) | Neutral gray (`neutrals-100`) | Light gray striped (`neutrals-50` + `neutrals-500` border) |

## Code Examples

### Basic EventCard
```jsx
import { EventCard } from "@mich8060/chg-design-system";

<EventCard title="Denver, CO" type="travel" status="active" />
```

### With Badge
```jsx
<EventCard title="Salt Lake" type="assignment" status="active" badge="Label" />
```

### With Icon
```jsx
<EventCard title="Denver" type="travel" status="active" icon />
```

### With Badge + Icon
```jsx
<EventCard title="Denver" type="travel" status="active" badge="Label" icon />
```

### Multi-day Spanning
```jsx
import { EventCard, Layout } from "@mich8060/chg-design-system";

<Layout gap="0">
  <EventCard title="5-Day Trip" type="travel" status="active" startCap endCap={false} />
  <EventCard title="" type="travel" status="active" startCap={false} endCap={false} />
  <EventCard title="" type="travel" status="active" startCap={false} endCap={false} />
  <EventCard title="" type="travel" status="active" startCap={false} endCap />
</Layout>
```

### Schedule List
```jsx
<Layout direction="column" gap="4">
  <EventCard title="Denver, CO" type="travel" status="active" onClick={...} />
  <EventCard title="Salt Lake City" type="assignment" status="active" badge="2" onClick={...} />
  <EventCard title="Open Shift" type="unassigned" status="active" onClick={...} />
  <EventCard title="Portland" type="travel" status="pending" onClick={...} />
</Layout>
```

## Cap Behavior

| startCap | endCap | Rounding | Content |
|----------|--------|----------|---------|
| `true` | `true` | All corners | Title + badge + icon |
| `true` | `false` | Left only | Title + badge + icon |
| `false` | `true` | Right only | Bar only (unless icon/badge) |
| `false` | `false` | None | Bar only (unless icon/badge) |

When `startCap={false}` and neither `icon` nor `badge` is set, only a color bar is rendered.

## Do's and Don'ts
- **Do** use `type` to match the event's scheduling category
- **Do** use `status` to reflect whether the event is current, completed, or tentative
- **Do** use `startCap`/`endCap` for multi-day calendar spanning
- **Don't** manually set caps unless building custom calendar layouts
- **Do** use `onClick` to make events interactive

## Accessibility
- Renders as `<button>` when `onClick` is provided, otherwise `<div>`
- Includes `title` attribute for tooltip
- Supports keyboard focus when clickable
- Pending pattern overlay has `aria-hidden="true"`