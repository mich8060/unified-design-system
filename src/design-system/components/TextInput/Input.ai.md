# Input

Single-line text input component with size, state, and icon variants.

## When to Use
- Text fields for forms (name, email, password, search, etc.)
- Any single-line text entry

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `value` | `string` | — | — | Input value (controlled) |
| `onChange` | `function` | — | `(event) => void` | Change handler |
| `placeholder` | `string` | — | — | Placeholder text |
| `type` | `string` | `"text"` | `"text"`, `"email"`, `"password"`, `"number"`, `"tel"`, `"url"` | Input type |
| `size` | `string` | `"default"` | `"compact"`, `"default"` | Size variant |
| `state` | `string` | `"default"` | `"default"`, `"focused"`, `"error"`, `"disabled"` | Visual state |
| `disabled` | `boolean` | `false` | — | Disabled state |
| `icon` | `string` | — | Any Phosphor icon name (e.g. `"MagnifyingGlass"`, `"Eye"`) | Displays an icon inside the input |
| `iconPosition` | `string` | `"right"` | `"left"`, `"right"` | Which side to place the icon |
| `onIconClick` | `function` | — | `() => void` | Makes the icon clickable |
| `label` | `node` | — | — | Visible label associated to the input via `htmlFor/id` |
| `helperText` | `node` | — | — | Supporting text shown below the input in non-error states |
| `errorText` | `node` | — | — | Error message shown below the input when `state="error"` |
| `id` | `string` | — | — | Unique identifier |
| `className` | `string` | `""` | — | Additional CSS classes |

## Examples

### Basic input
```jsx
<Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
```

### With Field wrapper (recommended for forms)
```jsx
<Field label="Email Address" required helperMessage="We'll never share your email">
  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
</Field>
```

### With icon on the right (default)
```jsx
<Field label="Search">
  <Input placeholder="Search..." icon="MagnifyingGlass" />
</Field>
```

### With icon on the left
```jsx
<Field label="Search">
  <Input placeholder="Search..." icon="MagnifyingGlass" iconPosition="left" />
</Field>
```

### Clickable icon (e.g. password toggle)
```jsx
<Field label="Password">
  <Input type="password" placeholder="Enter password" icon="Eye" onIconClick={() => toggleVisibility()} />
</Field>
```

### With validation error
```jsx
<Input
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  state="error"
  errorText="Username is already taken"
/>
```

### Compact size
```jsx
<Input size="compact" placeholder="Search..." />
```

## Composition

- **Always** wrap with `<Field>` in form contexts for labels, validation, and helper text
- Use alongside `Dropdown`, `Textarea`, `Checkbox` in forms
- Use `size="compact"` in tight layouts like table filters or toolbar search
- Use `icon` + `iconPosition` for search fields, password toggles, or any input that benefits from a visual hint

## Do's and Don'ts

✅ **Do**: Wrap with `<Field label="...">` for accessibility
✅ **Do**: Use appropriate `type` for the data (email, password, tel)
✅ **Do**: Use `state="error"` with `Field` helperMessage for validation
✅ **Do**: Use `onIconClick` for interactive icons (e.g. password visibility toggle)

❌ **Don't**: Use for multi-line text — use `Textarea` instead
❌ **Don't**: Set both `disabled` and `state="disabled"` — just use `disabled`
❌ **Don't**: Use an icon without purpose — icons should aid understanding