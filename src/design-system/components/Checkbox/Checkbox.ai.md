# Checkbox

Binary toggle input with label and indeterminate state support.

## When to Use
- Form fields for boolean selections (terms acceptance, preferences)
- Multi-select lists with "select all" (indeterminate state)
- Filter controls

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether checked |
| `onChange` | `function` | — | Callback `(checked: boolean) => void` |
| `label` | `string` | — | Label text |
| `id` | `string` | auto-generated | Unique identifier |
| `disabled` | `boolean` | `false` | Disabled state |
| `indeterminate` | `boolean` | `false` | Indeterminate/partial state (for "select all") |
| `className` | `string` | `""` | Additional CSS classes |

## Examples

### Basic
```jsx
<Checkbox label="I agree to the terms" checked={agreed} onChange={setAgreed} />
```

### Select all pattern
```jsx
<Checkbox
  label="Select All"
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={handleSelectAll}
/>
{items.map(item => (
  <Checkbox key={item.id} label={item.name} checked={item.selected} onChange={() => toggleItem(item.id)} />
))}
```

### In a form
```jsx
<Field label="Preferences">
  <Layout direction="column" gap="8">
    <Checkbox label="Email notifications" checked={emailNotifs} onChange={setEmailNotifs} />
    <Checkbox label="SMS notifications" checked={smsNotifs} onChange={setSmsNotifs} />
  </Layout>
</Field>
```
