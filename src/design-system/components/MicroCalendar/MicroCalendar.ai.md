# MicroCalendar

Compact inline calendar widget for displaying dates at a glance.

## When to Use
- Compact date display in cards, list items, or dashboards
- Visual date badge showing month and day
- Calendar widgets in tight spaces

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `Date\|string` | — | Date to display |
| `size` | `string` | `"default"` | `"small"`, `"default"`, `"large"` |
| `color` | `string` | `"blue"` | Accent color |
| `className` | `string` | `""` | Additional CSS classes |

## Examples

```jsx
<MicroCalendar date={new Date()} />
<MicroCalendar date="2024-03-15" size="small" />
```

### In a list item
```jsx
<Layout gap="12" alignItems="center">
  <MicroCalendar date={event.date} size="small" />
  <Layout direction="column">
    <strong>{event.title}</strong>
    <span>{event.location}</span>
  </Layout>
</Layout>
```
