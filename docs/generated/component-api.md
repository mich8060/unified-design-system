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
- Allowed parents: `Menu`, `Table`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### AppShell

Top-level application shell that composes menu, listview, main, side panel, and footer regions for consistent page architecture.

- Source: `src/design-system/components/AppShell/AppShell.spec.ts`
- Tier: `1`
- States: `default`
- Allowed children: `Menu`, `Listview`, `Main`, `SidePanel`, `Footer`, `Container`, `Layout`, `Text`, `Button`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `brand` | `enum` | default, comphealth, weatherby, connect, locumsmart, modio, gms, chg, wireframe | `default` |
| `theme` | `enum` | light, dark | `light` |

### Avatar

- Source: `src/design-system/components/Avatar/Avatar.spec.ts`
- Allowed parents: `Table`

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
- Allowed parents: `AppShell`, `Container`, `Layout`, `Modal`, `Table`, `Tabs`
- Disallowed children: `Button`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | primary, soft, outline, text, ghost, disabled, destructive | `primary` |
| `layout` | `enum` | label-only, icon-left, icon-right, icon-only, only | `label-only` |
| `size` | `enum` | large, default, small, xsmall | `default` |

### ButtonGroup

Groups related button actions with consistent spacing and orientation.

- Source: `src/design-system/components/ButtonGroup/ButtonGroup.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `orientation` | `enum` | horizontal, vertical | `horizontal` |
| `size` | `enum` | xsmall, small, default, large | `default` |

### Calendar

- Source: `src/design-system/components/Calendar/Calendar.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Checkbox

- Source: `src/design-system/components/Checkbox/Checkbox.spec.ts`
- Allowed parents: `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### CheckboxGroup

Provides grouped multi-select choices using Checkbox controls.

- Source: `src/design-system/components/CheckboxGroup/CheckboxGroup.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `disabled` | `boolean` | - | `false` |
| `orientation` | `enum` | vertical, horizontal | `vertical` |

### Checklist

Sidebar checklist for multi-step flows with completion status.

- Source: `src/design-system/components/Checklist/Checklist.spec.ts`
- Tier: `2`
- States: `default`, `active`, `completed`, `disabled`

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
| `size` | `enum` | default, compact, mini | `default` |

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
- Allowed children: `Layout`, `Table`, `Text`, `Button`, `Field`, `Divider`, `Tag`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | default, secondary, transparent | `default` |
| `padding` | `enum` | none, xsmall, small, default, large, xlarge | `large` |
| `paddingX` | `enum` | none, xsmall, small, default, large, xlarge | `large` |
| `paddingY` | `enum` | none, xsmall, small, default, large, xlarge | `large` |

### CurrencyInput

Describe purpose.

- Source: `src/design-system/components/CurrencyInput/CurrencyInput.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### DateInput

Describe purpose.

- Source: `src/design-system/components/DateInput/DateInput.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Datepicker

- Source: `src/design-system/components/Datepicker/Datepicker.spec.ts`
- Allowed parents: `Field`, `Modal`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `size` | `string` | - | `desktop` |

### DateRangeInput

Describe purpose.

- Source: `src/design-system/components/DateRangeInput/DateRangeInput.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### DescriptionList

Compact key-value metadata layout for detail and summary views.

- Source: `src/design-system/components/DescriptionList/DescriptionList.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `bordered` | `boolean` | - | `true` |
| `density` | `enum` | default, compact | `default` |
| `fullWidth` | `boolean` | - | `true` |
| `labelWidth` | `enum` | sm, md, lg | `md` |
| `variant` | `enum` | default, separators | `default` |

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
- Allowed parents: `Container`, `Modal`

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
| `color` | `enum` | transparent, neutral, red, orange, yellow, emerald, green, sky, cyan, blue, indigo, purple, fuchsia, magenta, inverse | `-` |
| `status` | `enum` | active, past, pending | `active` |
| `title` | `string` | - | `Title` |
| `type` | `enum` | travel, assignment, unassigned | `travel` |

### Field

- Source: `src/design-system/components/Field/Field.spec.ts`
- Allowed parents: `Container`, `Modal`, `Tabs`
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

Creates token-driven flexbox layouts with controlled direction, alignment, wrapping, and spacing.

- Source: `src/design-system/components/Flex/Flex.spec.ts`
- Tier: `1`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `alignItems` | `enum` | stretch, flex-start, center, flex-end, baseline | `stretch` |
| `direction` | `enum` | row, column | `row` |
| `justifyContent` | `enum` | flex-start, center, flex-end, space-between, space-around, space-evenly | `flex-start` |
| `wrap` | `enum` | nowrap, wrap, wrap-reverse | `nowrap` |

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

### Layout

Creates token-driven flexbox layouts with controlled direction, alignment, wrapping, and width behavior.

- Source: `src/design-system/components/Layout/Layout.spec.ts`
- Tier: `2`
- States: `default`
- Allowed parents: `AppShell`, `Container`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | full, equal, right, left | `full` |
| `fullWidth` | `boolean` | - | `false` |

### Link

Provides inline navigation and action links using semantic text-link tokens.

- Source: `src/design-system/components/Link/Link.spec.ts`
- Tier: `1`
- States: `default`, `hover`, `active`, `visited`, `focus`, `disabled`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | primary, secondary | `primary` |
| `disabled` | `boolean` | - | `false` |
| `underline` | `enum` | always, hover, none | `always` |

### Medallion

Displays an icon inside a colorized shape for compact visual context.

- Source: `src/design-system/components/Medallion/Medallion.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `color` | `enum` | transparent, neutral, red, orange, yellow, emerald, green, sky, cyan, blue, indigo, purple, fuchsia, magenta, inverse | `neutral` |
| `shape` | `enum` | circle, square, roundedSquare, diamond | `circle` |
| `size` | `enum` | small, default, large, xl | `default` |

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

### NumberInput

- Source: `src/design-system/components/NumberInput/NumberInput.spec.ts`
- States: `default`, `focused`, `error`, `disabled`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `size` | `enum` | compact, default | `default` |
| `state` | `enum` | default, focused, error, disabled | `default` |
| `type` | `string` | - | `number` |

### Pagination

- Source: `src/design-system/components/Pagination/Pagination.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `variant` | `string` | - | `default` |

### PasswordInput

Describe purpose.

- Source: `src/design-system/components/PasswordInput/PasswordInput.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### PhoneInput

Describe purpose.

- Source: `src/design-system/components/PhoneInput/PhoneInput.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

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

### ProvidersCard

Displays provider identity, status, metadata, tags, and quick actions in a compact card.

- Source: `src/design-system/components/ProvidersCard/ProvidersCard.spec.ts`
- Tier: `3`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `statusVariant` | `enum` | green, orange, red, blue, neutral | `green` |

### Radio

- Source: `src/design-system/components/Radio/Radio.spec.ts`
- Allowed parents: `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### RadioGroup

Provides grouped single-select choices using Radio controls.

- Source: `src/design-system/components/RadioGroup/RadioGroup.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `disabled` | `boolean` | - | `false` |
| `orientation` | `enum` | vertical, horizontal | `vertical` |

### ScrollView

Provides a container with controlled scroll direction.

- Source: `src/design-system/components/ScrollView/ScrollView.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `direction` | `enum` | vertical, horizontal | `vertical` |

### SearchInput

Describe purpose.

- Source: `src/design-system/components/SearchInput/SearchInput.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### SectionHeader

Describe purpose.

- Source: `src/design-system/components/SectionHeader/SectionHeader.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### SelectableCard

Selectable surface for list rows and card-like actionable metadata items.

- Source: `src/design-system/components/SelectableCard/SelectableCard.spec.ts`
- Tier: `2`
- States: `default`, `hover`, `focus`, `selected`, `disabled`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `disabled` | `boolean` | - | `false` |
| `selected` | `boolean` | - | `false` |

### Slider

- Source: `src/design-system/components/Slider/Slider.spec.ts`
- Allowed parents: `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Statistics

Displays a KPI value with optional context, trend, and icon.

- Source: `src/design-system/components/Statistics/Statistics.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `iconAccent` | `enum` | amber, aqua, blue, cyan, emerald, fuchsia, green, indigo, lime, magenta, orange, purple, red, rose, sky, violet, yellow | `blue` |
| `trend` | `enum` | up, down, neutral | `neutral` |

### Status

- Source: `src/design-system/components/Status/Status.spec.ts`
- Allowed parents: `Table`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | light-gray, white, transparent | `light-gray` |
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
- Allowed parents: `Container`, `Tabs`
- Allowed children: `Tag`, `Status`, `Avatar`, `Button`, `ActionMenu`, `ProgressIndicator`, `DotStatus`
- Disallowed children: `Table`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Tabs

- Source: `src/design-system/components/Tabs/Tabs.spec.ts`
- Allowed children: `Text`, `Tag`, `Button`, `Table`, `Field`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `string` | - | `underline` |
| `orientation` | `enum` | horizontal, vertical | `horizontal` |
| `tagVariant` | `string` | - | `neutral` |

### Tag

- Source: `src/design-system/components/Tag/Tag.spec.ts`
- Allowed parents: `Container`, `Modal`, `Table`, `Tabs`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `appearance` | `enum` | label-only, icon-left | `label-only` |
| `color` | `enum` | transparent, neutral, red, orange, yellow, emerald, green, sky, cyan, blue, indigo, purple, fuchsia, magenta, inverse | `transparent` |
| `label` | `string` | - | `Label` |
| `outlined` | `enum` | true, false | `false` |
| `pastel` | `enum` | true, false | `false` |
| `size` | `enum` | compact, default | `compact` |

### Text

Applies UDS typography variants with governed weight and leading options while preserving semantic tags via `as`.

- Source: `src/design-system/components/Text/Text.spec.ts`
- Tier: `2`
- States: `default`
- Allowed parents: `AppShell`, `Container`, `Layout`, `Menu`, `Modal`, `Tabs`

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

### TimeInput

Describe purpose.

- Source: `src/design-system/components/TimeInput/TimeInput.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Toast

- Source: `src/design-system/components/Toast/Toast.spec.ts`
- Disallowed children: `Modal`, `Dialog`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `actions` | `enum` | none, close, subtle, buttons | `none` |
| `size` | `enum` | default, condensed | `default` |
| `variant` | `enum` | success, error, warning, info | `info` |

### Toggle

- Source: `src/design-system/components/Toggle/Toggle.spec.ts`
- Allowed parents: `Field`, `Menu`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `size` | `enum` | large, small | `large` |

### Toolbar

Top action bar with three composable slots: left, center, and right.

- Source: `src/design-system/components/Toolbar/Toolbar.spec.ts`
- Tier: `2`
- States: `default`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| _none_ | - | - | - |

### Tooltip

- Source: `src/design-system/components/Tooltip/Tooltip.spec.ts`

| Prop | Type | Allowed Values | Default |
| --- | --- | --- | --- |
| `placement` | `enum` | top, bottom, left, right | `top` |

