# Toggle

On/off switch component with label and size variants.

## When to Use
- Boolean settings (enable/disable features)
- Preference toggles (dark mode, notifications)
- Any on/off control

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `checked` | `boolean` | `false` | — | Whether on |
| `onChange` | `function` | — | `(checked: boolean) => void` | Toggle callback |
| `label` | `string` | — | — | Label text |
| `id` | `string` | auto | — | Unique ID |
| `disabled` | `boolean` | `false` | — | Disabled state |
| `size` | `string` | `"default"` | `"small"`, `"default"` | Toggle size |
| `className` | `string` | `""` | — | Additional CSS classes |

## Examples

```jsx
<Toggle label="Dark Mode" checked={darkMode} onChange={setDarkMode} />
<Toggle label="Notifications" checked={notifs} onChange={setNotifs} size="small" />
<Toggle label="Disabled" disabled />
```

### In a settings form
```jsx
<Layout direction="column" gap="16">
  <Toggle label="Email notifications" checked={email} onChange={setEmail} />
  <Toggle label="Push notifications" checked={push} onChange={setPush} />
  <Toggle label="SMS alerts" checked={sms} onChange={setSms} />
</Layout>
```
