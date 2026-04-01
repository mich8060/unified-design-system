# Status

Inline status indicator with dot, icon, or label for conveying state information.

## When to Use
- Displaying record status inline (Active, Inactive, Pending)
- Server/connection status indicators
- Any compact state display

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `label` | `string` | — | — | Status text |
| `color` | `string` | `"gray"` | `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"purple"`, `"gray"` | Dot color |
| `variant` | `string` | `"dot"` | `"dot"`, `"icon"`, `"label"` | Display style |
| `icon` | `string` | — | Phosphor icon name | Icon (for icon variant) |
| `className` | `string` | `""` | — | Additional CSS classes |

## Examples

```jsx
<Status label="Online" color="green" />
<Status label="Away" color="yellow" />
<Status label="Offline" color="gray" />
<Status label="Error" color="red" variant="icon" icon="Warning" />
```

### In a user list
```jsx
<Layout gap="8" alignItems="center">
  <Avatar src={user.photo} size="small" />
  <span>{user.name}</span>
  <Status label={user.status} color={user.online ? "green" : "gray"} />
</Layout>
```
