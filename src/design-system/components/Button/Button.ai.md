# Button

Primary action trigger component supporting multiple visual styles, sizes, and icon layouts.

## When to Use
- Triggering actions (submit, save, delete, navigate)
- Primary CTA buttons, secondary actions, destructive confirmations
- Icon-only actions in toolbars or compact UIs

## Props

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `label` | `string` | — | Any text | Button text label |
| `appearance` | `string` | `"primary"` | `"primary"`, `"soft"`, `"outline"`, `"text"`, `"ghost"`, `"disabled"`, `"destructive"` | Visual style variant |
| `layout` | `string` | `"label-only"` | `"label-only"`, `"icon-left"`, `"icon-right"`, `"icon-only"`, `"only"` | Content arrangement |
| `size` | `string` | `"default"` | `"large"`, `"default"`, `"small"`, `"xsmall"` | Button size |
| `icon` | `string` or `ReactNode` | — | Phosphor icon name (e.g., `"ArrowRight"`, `"Plus"`, `"Trash"`) or JSX | Icon to display |
| `iconSize` | `number` | — | Any number | Override icon size in px |
| `className` | `string` | `""` | Any CSS class | Additional CSS classes |
| `tracking` | `string` or `object` | — | `"event-name"` or `{ event, category, ... }` | Fires a `uds:track` CustomEvent on click with a structured payload |
| `loading` | `boolean` | `false` | — | Keeps button width, hides content, and shows a spinning loader icon |
| `onClick` | `function` | — | — | Click handler |
| `disabled` | `boolean` | `false` | — | Disables the button |
| `aria-label` | `string` | — | — | Accessible label (auto-generated for icon-only) |

## Examples

### Basic buttons
```jsx
<Button label="Save" />
<Button label="Cancel" appearance="outline" />
<Button label="Delete" appearance="destructive" />
```

### With icons
```jsx
<Button label="Add Item" icon="Plus" layout="icon-left" />
<Button label="Next" icon="ArrowRight" layout="icon-right" />
<Button icon="Trash" layout="icon-only" aria-label="Delete item" />
```

### Size variants
```jsx
<Button label="Large" size="large" />
<Button label="Default" />
<Button label="Small" size="small" />
<Button label="XSmall" size="xsmall" />
```

### All appearances
```jsx
<Button label="Primary" appearance="primary" />
<Button label="Soft" appearance="soft" />
<Button label="Outline" appearance="outline" />
<Button label="Text" appearance="text" />
<Button label="Ghost" appearance="ghost" />
<Button label="Destructive" appearance="destructive" />
<Button label="Disabled" appearance="disabled" />
```

### Action bar pattern
```jsx
<Layout gap="8" justifyContent="flex-end">
  <Button label="Cancel" appearance="outline" onClick={onCancel} />
  <Button label="Save Changes" icon="FloppyDisk" layout="icon-left" onClick={onSave} />
</Layout>
```

### Toolbar with icon-only buttons
```jsx
<Layout gap="4">
  <Button icon="TextB" layout="icon-only" appearance="ghost" aria-label="Bold" />
  <Button icon="TextItalic" layout="icon-only" appearance="ghost" aria-label="Italic" />
  <Button icon="TextUnderline" layout="icon-only" appearance="ghost" aria-label="Underline" />
</Layout>
```

### Data tracking
```jsx
// Simple string event name
<Button label="Sign Up" tracking="signup-cta" onClick={handleSignUp} />

// Rich payload — all fields are merged into the CustomEvent detail
<Button
  label="Add to Cart"
  icon="ShoppingCart"
  layout="icon-left"
  tracking={{ event: "add_to_cart", category: "ecommerce", productId: "widget-123" }}
  onClick={handleAddToCart}
/>

// Subscribe in your app root
useEffect(() => {
  const handler = (e) => analytics.track(e.detail.event ?? e.detail.action, e.detail);
  window.addEventListener("uds:track", handler);
  return () => window.removeEventListener("uds:track", handler);
}, []);
```

### Loading state
```jsx
<Button label="Saving" loading />
<Button label="Submitting" appearance="primary" loading />
```

## Composition

- **In forms**: Place at the bottom of form sections, typically paired with a cancel button
- **In `Card`**: Use in card footer for card-level actions
- **In `UDS.PageHeader`**: Pass as `actions` prop for page-level actions
- **In `Table` rows**: Use `size="xsmall"` or `"small"` with `appearance="ghost"` for inline row actions
- **In `UDS.Modal` footer**: Primary + secondary action buttons

## Do's and Don'ts

✅ **Do**: Use `appearance="destructive"` for delete/remove actions
✅ **Do**: Always provide `aria-label` for icon-only buttons
✅ **Do**: Use `icon` prop with a Phosphor icon name string (e.g., `icon="Plus"`)
✅ **Do**: Use `layout="icon-left"` for action buttons with context (e.g., "Add User")

❌ **Don't**: Use `appearance="disabled"` for conditional disabling — use the `disabled` prop instead
❌ **Don't**: Use `appearance="primary"` for every button — reserve for the main page action
❌ **Don't**: Nest interactive elements inside Button

## Accessibility
- Icon-only buttons automatically get `aria-label` from the `label` prop or icon name
- Disabled buttons use native `disabled` attribute
- Renders as `<button type="button">` by default
