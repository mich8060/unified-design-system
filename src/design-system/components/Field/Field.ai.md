# Field

Form field wrapper providing label, helper text, error messages, and required indicator.

## When to Use
- Wrapping any form input (Input, Textarea, Dropdown, Datepicker, etc.)
- Any place you need a labeled form field with validation feedback

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label text |
| `htmlFor` | `string` | — | Associates label with input (matches input `id`) |
| `required` | `boolean` | `false` | Shows required asterisk |
| `helperText` | `string` | — | Help text below the input |
| `error` | `string` | — | Error message (overrides helperText when present) |
| `children` | `ReactNode` | — | Form input component |
| `className` | `string` | `""` | Additional CSS classes |

## Examples

### Basic form field
```jsx
<Field label="Email" htmlFor="email" required>
  <Input id="email" type="email" placeholder="you@example.com" />
</Field>
```

### With error
```jsx
<Field label="Password" error={errors.password} required>
  <Input type="password" state={errors.password ? "error" : "default"} />
</Field>
```

### With helper text
```jsx
<Field label="Username" helperText="Must be 3-20 characters, letters and numbers only">
  <Input value={username} onChange={e => setUsername(e.target.value)} />
</Field>
```

### Complete form
```jsx
<Layout direction="column" gap="16">
  <Field label="Name" required>
    <Input value={name} onChange={e => setName(e.target.value)} />
  </Field>
  <Field label="Role">
    <Dropdown options={roles} value={role} onChange={setRole} />
  </Field>
  <Field label="Bio" helperText="Tell us about yourself">
    <Textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={500} />
  </Field>
  <Layout justifyContent="flex-end" gap="8">
    <Button label="Cancel" appearance="outline" />
    <Button label="Save" />
  </Layout>
</Layout>
```

## Do's and Don'ts

✅ **Do**: Always wrap form inputs with `Field` for consistent layout
✅ **Do**: Use `htmlFor` matching the input's `id` for accessibility

❌ **Don't**: Use `Field` for non-form content
❌ **Don't**: Put multiple inputs inside a single `Field`
