# Chip

Interactive label component for filters, selections, or tags with optional icon and badge.

## When to Use
- Filter chips (active/inactive filters)
- Selection chips in multi-select contexts
- Compact labels with optional icons and counts

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `label` | `string` | — | — | Chip text |
| `selected` | `boolean` | `false` | `true`, `false` | Selection state (`false` = unselected/default, `true` = selected) |
| `shape` | `string` | `"pill"` | `"pill"`, `"rounded"` | Shape variant |
| `size` | `string` | `"default"` | `"default"`, `"compact"`, `"mini"` | Size variant |
| `iconPlacement` | `string` | `"none"` | `"none"`, `"left"`, `"right"`, `"both"` | Icon position |
| `icon` | `string` | — | Phosphor icon name | Icon to display |
| `badge` | `number\|string` | — | — | Badge count |
| `badgeVariant` | `string` | `"red"` | Badge color variant | Badge color |
| `onClick` | `function` | — | — | Makes chip interactive (renders as button) |
| `disabled` | `boolean` | `false` | — | Disabled state |
| `className` | `string` | `""` | — | Additional CSS classes |

## Examples

### Filter chips
```jsx
<Layout gap="8">
  <Chip label="All" selected onClick={() => setFilter("all")} />
  <Chip label="Active" onClick={() => setFilter("active")} />
  <Chip label="Archived" onClick={() => setFilter("archived")} />
</Layout>
```

### With icon and badge
```jsx
<Chip label="Messages" icon="ChatCircle" iconPlacement="left" badge={5} />
```

## Note
- Renders as `<button>` when `onClick` is provided, `<span>` otherwise
- Uses `Badge` component internally for the badge count
