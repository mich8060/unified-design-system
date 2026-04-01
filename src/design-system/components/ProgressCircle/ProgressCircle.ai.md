# ProgressCircle

Circular progress indicator showing percentage completion.

## When to Use
- Upload progress, loading states
- Skill/score displays, dashboards
- Any circular completion visualization

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress percentage (0–100) |
| `size` | `number` | `80` | Circle diameter in pixels |
| `strokeWidth` | `number` | `8` | Stroke width in pixels |
| `color` | `string` | `"blue"` | Track color |
| `showValue` | `boolean` | `true` | Show percentage text in center |
| `className` | `string` | `""` | Additional CSS classes |

## Examples

```jsx
<ProgressCircle value={75} />
<ProgressCircle value={100} color="green" />
<ProgressCircle value={30} size={48} strokeWidth={4} />
```

### Dashboard widget
```jsx
<Layout gap="24">
  <ProgressCircle value={metrics.completion} color="green" />
  <ProgressCircle value={metrics.quality} color="blue" />
  <ProgressCircle value={metrics.speed} color="orange" />
</Layout>
```
