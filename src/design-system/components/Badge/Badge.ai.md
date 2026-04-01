# Badge

Numeric badge indicator for counts, notifications, and status numbers.

## When to Use
- Notification counts on navigation items or icons
- Unread message counts, item quantities
- Any numeric indicator that overlays or accompanies another element

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `count` | `number\|string` | — | — | Number to display (renders nothing if 0 or falsy) |
| `variant` | `string` | `"red"` | `"blue"`, `"cyan"`, `"green"`, `"magenta"`, `"indigo"`, `"rose"`, `"neutral"`, `"orange"`, `"purple"`, `"red"`, `"sky"`, `"yellow"`, `"inverse"`, `"lime"` | Color variant |
| `appearance` | `string` | `"solid"` | `"solid"`, `"outlined"` | Visual style variant |
| `rounded` | `boolean` | `true` | `true`, `false` | Rounded pill vs squared corners |
| `maxCount` | `number` | `99` | — | Max before showing "99+" |
| `className` | `string` | `""` | — | Additional CSS classes |

## Examples

```jsx
<Badge count={5} />
<Badge count={150} maxCount={99} /> {/* Shows "99+" */}
<Badge count={3} variant="blue" />
<Badge count={12} variant="green" />
```

### With navigation item
```jsx
<Layout gap="8" alignItems="center">
  <Icon name="Bell" size={20} />
  <Badge count={notifications.length} />
</Layout>
```

## Note
- Returns `null` when `count` is 0 or falsy — safe to always render
