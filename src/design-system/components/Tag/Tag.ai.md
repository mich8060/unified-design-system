# Tag

Colored label component for categorization, status, or metadata display.

## When to Use
- Status labels (Active, Pending, Archived)
- Category tags on cards or list items
- Metadata labels (role, department, type)

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `label` | `string` | — | — | Tag text |
| `color` | `TagColor` | `"transparent"` | `"transparent"`, `"neutral"`, `"red"`, `"orange"`, `"yellow"`, `"emerald"`, `"green"`, `"sky"`, `"cyan"`, `"blue"`, `"indigo"`, `"purple"`, `"fuchsia"`, `"magenta"`, `"inverse"` | Preset color token only (no arbitrary values) |
| `appearance` | `TagAppearance` | `"label-only"` | `"label-only"`, `"icon-left"` | Whether icon is shown at left |
| `size` | `TagSize` | `"compact"` | `"compact"`, `"default"` | Tag size |
| `solid` | `boolean` | `false` | — | Solid fill treatment |
| `outlined` | `boolean` | `false` | — | Outlined treatment |
| `className` | `string` | `""` | — | Additional CSS classes |

## Examples

### Status tags
```jsx
<Tag label="Active" color="green" />
<Tag label="Pending" color="yellow" />
<Tag label="Archived" color="neutral" outlined />
```

### Filter tags
```jsx
{filters.map(f => (
  <Tag key={f} label={f} color="blue" outlined />
))}
```

### In a table cell
```jsx
const columns = [
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Tag label={value} color={value === "Active" ? "green" : "neutral"} size="compact" />
    ),
  },
];
```

## Semantic Color Guide
| Color | Use For |
|-------|---------|
| `green` | Active, success, approved |
| `red` | Error, rejected, critical |
| `yellow` | Warning, pending, review |
| `blue` | Info, selected, default |
| `neutral` | Neutral, inactive, archived |
| `purple` | Special, premium, custom |
