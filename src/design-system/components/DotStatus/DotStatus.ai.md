# DotStatus

Simple colored dot indicator for status display.

## When to Use
- Minimal status indicators (online/offline, severity levels)
- Color-coded dots next to labels
- Compact status in table cells or lists

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `color` | `string` | `"gray"` | `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"purple"`, `"gray"` | Dot color |
| `size` | `string` | `"default"` | `"small"`, `"default"`, `"large"` | Dot size |
| `pulse` | `boolean` | `false` | — | Animate with pulse effect |
| `label` | `string` | — | — | Accessible label (sr-only) |
| `className` | `string` | `""` | — | Additional CSS classes |

## Examples

```jsx
<DotStatus color="green" />
<DotStatus color="red" pulse />
<DotStatus color="yellow" label="Warning" />
```

### In a table
```jsx
render: (value) => (
  <Layout gap="8" alignItems="center">
    <DotStatus color={value === "Active" ? "green" : "gray"} />
    <span>{value}</span>
  </Layout>
)
```
