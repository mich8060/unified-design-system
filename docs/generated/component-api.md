# Generated Component API

This file is generated from `src/design-system/components/*/*.spec.ts`.

## Components

### Accordion

- Source: `src/design-system/components/Accordion/Accordion.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### ActionMenu

- Source: `src/design-system/components/ActionMenu/ActionMenu.spec.ts`
- Allowed parents: `Card`, `Menu`, `Table`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Avatar

- Source: `src/design-system/components/Avatar/Avatar.spec.ts`
- Allowed parents: `Card`, `Table`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `size` | `string` | - | `default` |

### Badge

- Source: `src/design-system/components/Badge/Badge.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | solid, outlined | `solid` |
| `rounded` | `boolean` | - | `true` |
| `variant` | `enum` | blue, cyan, green, magenta, indigo, rose, neutral, orange, purple, red, sky, yellow, inverse, lime | `red` |

### Branding

- Source: `src/design-system/components/Branding/Branding.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `size` | `string` | - | `default` |

### Breadcrumb

- Source: `src/design-system/components/Breadcrumb/Breadcrumb.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Button

- Source: `src/design-system/components/Button/Button.spec.ts`
- Allowed parents: `AppShell`, `Card`, `Container`, `Flex`, `Modal`, `Table`, `Tabs`
- Disallowed children: `Button`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | primary, soft, outline, text, ghost, disabled, destructive | `primary` |
| `layout` | `enum` | label-only, icon-left, icon-right, icon-only, only | `label-only` |
| `size` | `enum` | large, default, small, xsmall | `default` |

### Calendar

- Source: `src/design-system/components/Calendar/Calendar.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Card

- Source: `src/design-system/components/Card/Card.spec.ts`
- Allowed parents: `AppShell`, `Container`, `Tabs`
- Allowed children: `Text`, `Flex`, `Button`, `Tag`, `Status`, `Table`, `Divider`, `Avatar`, `ActionMenu`, `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Checkbox

- Source: `src/design-system/components/Checkbox/Checkbox.spec.ts`
- Allowed parents: `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Chip

- Source: `src/design-system/components/Chip/Chip.spec.ts`
- Canonical prop aliases: `iconplacement -> iconPlacement`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `badgeVariant` | `string` | - | `sky` |
| `iconPlacement` | `enum` | both, left, right, none | `none` |
| `selected` | `boolean` | - | `false` |
| `shape` | `enum` | pill, rounded | `pill` |
| `size` | `enum` | default, compact | `default` |

### Code

- Source: `src/design-system/components/Code/Code.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `inline` | `enum` | true, false | `false` |
| `language` | `enum` | markup, css, clike, javascript, typescript, tsx, jsx, json, bash, sql | `javascript` |

### Container

Provides a reusable content wrapper with optional filled or transparent surface styles and standardized padding.

- Source: `src/design-system/components/Container/Container.spec.ts`
- Tier: `2`
- States: `default`
- Allowed parents: `AppShell`, `root`
- Allowed children: `Flex`, `Card`, `Table`, `Text`, `Button`, `Field`, `Divider`, `Tag`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | default, transparent | `default` |
| `padding` | `enum` | none, xsmall, small, default, large, xlarge | `default` |

### Datepicker

- Source: `src/design-system/components/Datepicker/Datepicker.spec.ts`
- Allowed parents: `Field`, `Modal`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `size` | `string` | - | `desktop` |

### Dialog

- Source: `src/design-system/components/Dialog/Dialog.spec.ts`
- Disallowed children: `Dialog`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `cancelLabel` | `string` | - | `Cancel` |
| `confirmLabel` | `string` | - | `Confirm` |
| `intent` | `string` | - | `info` |

### Divider

- Source: `src/design-system/components/Divider/Divider.spec.ts`
- Allowed parents: `Card`, `Container`, `Modal`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `alignment` | `enum` | left, center, right | `center` |
| `variant` | `enum` | line, solid | `line` |

### DotStatus

- Source: `src/design-system/components/DotStatus/DotStatus.spec.ts`
- Allowed parents: `Table`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `outline` | `boolean` | - | `false` |
| `size` | `enum` | small, medium, large | `medium` |
| `variant` | `enum` | red, blue, inverse, orange, sky, indigo, rose, neutral, celery, lime, yellow, green, cyan, purple, fuchsia | `blue` |

### Dropdown

- Source: `src/design-system/components/Dropdown/Dropdown.spec.ts`
- States: `default`, `focused`, `error`, `disabled`
- Allowed parents: `Field`, `Menu`, `Modal`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `placeholder` | `string` | - | `Select an option` |
| `placement` | `string` | - | `bottom-start` |
| `size` | `enum` | compact, default | `default` |
| `state` | `enum` | default, focused, error, disabled | `default` |

### EmptyState

Provide a clear, branded fallback when a section has no content, data, or search results.

- Source: `src/design-system/components/EmptyState/EmptyState.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `align` | `enum` | left, center | `center` |

### EventCard

- Source: `src/design-system/components/EventCard/EventCard.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `status` | `string` | - | `active` |
| `title` | `string` | - | `Title` |
| `type` | `string` | - | `travel` |

### Field

- Source: `src/design-system/components/Field/Field.spec.ts`
- Allowed parents: `Card`, `Container`, `Modal`, `Tabs`
- Allowed children: `TextInput`, `Input`, `Dropdown`, `Datepicker`, `Textarea`, `Checkbox`, `Radio`, `Toggle`, `Slider`, `FileUpload`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### FileUpload

- Source: `src/design-system/components/FileUpload/FileUpload.spec.ts`
- Allowed parents: `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `instructionText` | `string` | - | `Drop files here or click to upload` |

### Flex

Creates token-driven flexbox layouts with controlled direction, alignment, wrapping, and width behavior.

- Source: `src/design-system/components/Flex/Flex.spec.ts`
- Tier: `2`
- States: `default`
- Allowed parents: `AppShell`, `Card`, `Container`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `fullWidth` | `boolean` | - | `false` |

### Icon

- Source: `src/design-system/components/Icon/Icon.spec.ts`
- Allowed parents: `Menu`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `string` | - | `regular` |

### ImageAspect

- Source: `src/design-system/components/ImageAspect/ImageAspect.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `aspectratio` | `enum` | square, video, 4-3, 3-2, 21-9, portrait, auto | `-` |
| `ratio` | `string` | - | `square` |

### Key

- Source: `src/design-system/components/Key/Key.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | light, dark | `light` |

### Menu

- Source: `src/design-system/components/Menu/Menu.spec.ts`
- Allowed parents: `AppShell`, `root`
- Allowed children: `ActionMenu`, `Dropdown`, `Toggle`, `Text`, `Icon`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `identity` | `string` | - | `design-system` |

### MicroCalendar

- Source: `src/design-system/components/MicroCalendar/MicroCalendar.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Modal

- Source: `src/design-system/components/Modal/Modal.spec.ts`
- Allowed parents: `AppShell`, `Container`, `root`
- Allowed children: `Text`, `Button`, `Divider`, `Field`, `TextInput`, `Dropdown`, `Datepicker`, `Textarea`, `Tag`
- Disallowed children: `Modal`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `size` | `enum` | small, default, large, fullscreen | `default` |

### Pagination

- Source: `src/design-system/components/Pagination/Pagination.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `variant` | `string` | - | `default` |

### ProgressCircle

- Source: `src/design-system/components/ProgressCircle/ProgressCircle.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `shape` | `enum` | circle, half-circle | `circle` |
| `size` | `enum` | xxs, xs, sm, md, lg | `md` |

### ProgressIndicator

- Source: `src/design-system/components/ProgressIndicator/ProgressIndicator.spec.ts`
- Allowed parents: `Table`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `labelPosition` | `enum` | false, right, bottom, top-floating, bottom-floating | `false` |
| `size` | `enum` | small, medium, large | `medium` |
| `variant` | `enum` | default, blue, green, success, orange, warning, red, error, purple | `default` |

### Radio

- Source: `src/design-system/components/Radio/Radio.spec.ts`
- Allowed parents: `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Slider

- Source: `src/design-system/components/Slider/Slider.spec.ts`
- Allowed parents: `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Status

- Source: `src/design-system/components/Status/Status.spec.ts`
- Allowed parents: `Card`, `Table`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | light-gray, white | `light-gray` |
| `shape` | `enum` | pill, rounded | `pill` |
| `variant` | `string` | - | `blue` |

### Steps

- Source: `src/design-system/components/Steps/Steps.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `orientation` | `enum` | horizontal, vertical | `horizontal` |
| `size` | `enum` | default, compact | `default` |
| `status` | `enum` | complete, active, incomplete, disabled, error | `-` |

### Table

- Source: `src/design-system/components/Table/Table.spec.ts`
- Allowed parents: `Card`, `Container`, `Tabs`
- Allowed children: `Tag`, `Status`, `Avatar`, `Button`, `ActionMenu`, `ProgressIndicator`, `DotStatus`
- Disallowed children: `Table`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Tabs

- Source: `src/design-system/components/Tabs/Tabs.spec.ts`
- Allowed children: `Text`, `Tag`, `Button`, `Card`, `Table`, `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `string` | - | `underline` |
| `tagVariant` | `string` | - | `red` |

### Tag

- Source: `src/design-system/components/Tag/Tag.spec.ts`
- Allowed parents: `Card`, `Container`, `Modal`, `Table`, `Tabs`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | label-only, icon-left | `label-only` |
| `color` | `enum` | transparent, neutral, red, orange, yellow, emerald, green, sky, cyan, blue, indigo, purple, fuchsia, magenta, inverse | `transparent` |
| `label` | `string` | - | `Label` |
| `size` | `enum` | compact, default | `compact` |

### Text

Applies UDS typography variants with governed weight and leading options while preserving semantic tags via `as`.

- Source: `src/design-system/components/Text/Text.spec.ts`
- Tier: `2`
- States: `default`
- Allowed parents: `AppShell`, `Card`, `Container`, `Flex`, `Menu`, `Modal`, `Tabs`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `leading` | `enum` | tight, regular, loose | `regular` |
| `variant` | `enum` | display-128, display-96, display-72, display-60, display-48, display-36, heading-32, heading-28, heading-24, body-20, body-16, body-14, body-12 | `body-16` |
| `weight` | `enum` | regular, medium, semibold, bold | `regular` |

### Textarea

- Source: `src/design-system/components/Textarea/Textarea.spec.ts`
- States: `default`, `focused`, `error`, `disabled`
- Allowed parents: `Field`, `Modal`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `size` | `enum` | compact, default | `default` |
| `state` | `enum` | default, focused, error, disabled | `default` |

### TextInput

- Source: `src/design-system/components/TextInput/TextInput.spec.ts`
- States: `default`, `focused`, `error`, `disabled`
- Allowed parents: `Field`, `Modal`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `iconPosition` | `string` | - | `right` |
| `size` | `enum` | compact, default | `default` |
| `state` | `enum` | default, focused, error, disabled | `default` |
| `type` | `string` | - | `text` |

### Toast

- Source: `src/design-system/components/Toast/Toast.spec.ts`
- Disallowed children: `Modal`, `Dialog`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `variant` | `enum` | success, error, warning, info | `info` |

### Toggle

- Source: `src/design-system/components/Toggle/Toggle.spec.ts`
- Allowed parents: `Field`, `Menu`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `size` | `enum` | large, small | `large` |

### Tooltip

- Source: `src/design-system/components/Tooltip/Tooltip.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `placement` | `enum` | top, bottom, left, right | `top` |

