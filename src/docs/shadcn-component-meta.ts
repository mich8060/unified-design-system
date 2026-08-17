import type { ShadcnUiSlug } from './shadcn-ui-registry'

export type ShadcnComponentMeta = {
  summary: string
}

const SHADCN_COMPONENT_META: Record<ShadcnUiSlug, ShadcnComponentMeta> = {
  accordion: {
    summary: 'Accordion reveals and hides related content in stacked sections so dense information stays scan-friendly.',
  },
  alert: {
    summary: 'Alert surfaces status, risk, or success messaging with a title, body copy, and optional actions.',
  },
  'alert-dialog': {
    summary: 'Alert Dialog blocks the current flow for high-consequence confirmations such as delete, revoke, or sign-out.',
  },
  'aspect-ratio': {
    summary: 'Aspect Ratio preserves a fixed media frame so images, video, and cards keep their intended proportions as layouts resize.',
  },
  avatar: {
    summary:
      'Avatar presents a person or entity at four sizes (32–64px), with optional bottom-right status dot or change-photo camera action aligned to the Figma Avatar matrix.',
  },
  badge: {
    summary: 'Badge applies compact visual labeling for status, category, or emphasis inside lists, cards, and tables.',
  },
  breadcrumb: {
    summary:
      'Breadcrumb shows the current path through a hierarchy and gives users quick recovery back to parent views. Use size="compact" (body/12) in PageHeader — PageHeaderNav applies it automatically.',
  },
  branding: {
    summary: 'Branding renders approved wordmarks and brand marks so docs and app chrome stay aligned with system assets.',
  },
  button: {
    summary:
      'Button triggers primary and secondary actions with six appearances, four text sizes, and optional leading/trailing icon slots aligned to the Figma Button matrix.',
  },
  'button-group': {
    summary: 'Button Group keeps related actions visually and spatially connected so the set reads as one control.',
  },
  calendar: {
    summary: 'Calendar supports date picking and range selection with an accessible month grid and keyboard navigation.',
  },
  card: {
    summary: 'Card composes a bordered content container with header, body, footer, and supporting text slots.',
  },
  chart: {
    summary:
      'Chart wraps chart primitives with the package theme so data views inherit system colors, spacing, and type. Stacked bars: set touching segment ends to radius 0; round only the outer free ends (typically 4).',
  },
  'check-list': {
    summary: 'CheckList presents grouped checkbox tasks with labels and supporting text for setup and completion flows.',
  },
  checkbox: {
    summary: 'Checkbox captures independent yes/no selections, including checked, unchecked, and indeterminate states.',
  },
  collapsible: {
    summary: 'Collapsible progressively discloses secondary content inline without forcing a full accordion pattern.',
  },
  combobox: {
    summary: 'Combobox merges search and selection for long option lists. ComboboxInput matches Figma: secondary shell, 44px default / 36px compact (`inputSize`), CaretDown in the trailing addon.',
  },
  command: {
    summary: 'Command provides a palette-style list for quick navigation, action launching, and keyboard-first search.',
  },
  'context-menu': {
    summary: 'Context Menu exposes secondary actions at the point of interaction through right-click or equivalent gestures.',
  },
  'description-list': {
    summary: 'Description List pairs terms and details for structured metadata such as account, job, and profile summaries.',
  },
  dialog: {
    summary: 'Dialog presents focused tasks in a modal layer while preserving context behind the overlay.',
  },
  direction: {
    summary: 'Direction Provider flips layout primitives for left-to-right and right-to-left interfaces without duplicating markup.',
  },
  'dot-status': {
    summary: 'DotStatus shows a compact availability or severity indicator that pairs cleanly with nearby labels.',
  },
  drawer: {
    summary:
      'Drawer slides in a task surface from the edge of the viewport. Compose Header → Body → Footer (Body scrolls; side footer actions horizontal). Panel corners are 0px (flush to the viewport).',
  },
  'dropdown-menu': {
    summary: 'Dropdown Menu groups a small set of actions behind a trigger so controls stay concise until needed.',
  },
  'date-input': {
    summary: 'Date Input presets Input for native single-date entry while keeping the same system field styling.',
  },
  'date-range-input': {
    summary: 'Date Range Input presets Input for a typed start/end date range string in one compact field.',
  },
  empty: {
    summary: 'Empty states explain missing content, set expectations, and point users toward the next useful action.',
  },
  'event-card': {
    summary: 'Event Card summarizes a single scheduled item with a titled heading, an accent color from the full UDS palette, a detail-rows slot, and a right-aligned type slot for an icon and label.',
  },
  field: {
    summary: 'Field standardizes labels, legends, and help text so form controls read consistently as one input unit.',
  },
  'file-upload': {
    summary: 'File Upload provides a drag-and-drop target with click-to-browse behavior for quick single or multi-file selection.',
  },
  'file-upload-cards': {
    summary: 'File Upload Cards presents each file as a rich card with preview, metadata, status, progress, and per-file actions.',
  },
  footer: {
    summary: 'Footer renders a fixed 40px bottom bar with copyright and an optional Content link slot.',
  },
  header: {
    summary:
      'Header is the full-width AppShell chrome: optional menu toggle + brand/title + search (or custom children replacing search) + trailing actions. Below lg, search collapses to an icon. Do not add SearchInput in trailing / AppShell.Header.',
  },
  input: {
    summary: 'Input handles short-form text entry with the package sizing, focus, and validation styling defaults.',
  },
  'input-group': {
    summary: 'Input Group combines fields with addons and inline text so formatted inputs read as a single control.',
  },
  'input-otp': {
    summary:
      'Input OTP splits one-time codes into six slots with optional Minus separator. Size=Default (64×70, Display/48) or Size=Compact (44×48, Display/36) for mobile; code uses `inputSize="sm"` or responsive auto-compress below 768px.',
  },
  item: {
    summary:
      'Item is a composable content row with two appearances: box (rounded card) and list (radius 0 + bottom border between siblings). Variants (default / outline / muted) include hover → surface-secondary and active → surface-tertiary feedback. Compose with ItemContent, ItemTitle, ItemDescription, and ItemActions; use list + ItemGroup gap-0 for AppShell listview. Persistent selection uses variant="muted".',
  },
  kbd: {
    summary: 'Kbd renders keyboard shortcuts in a compact token style that matches instructional and command-heavy UI.',
  },
  label: {
    summary: 'Label attaches accessible form text to controls and keeps field naming visually consistent across forms.',
  },
  layout: {
    summary:
      'Layout is a flexbox primitive for rows and columns with typed `direction`, `alignItems`, `justifyContent`, `gap`, and `wrap` props (numbers use the theme spacing scale; strings pass through as CSS).',
  },
  link: {
    summary:
      'Link renders primary or secondary inline links with hover underline and optional external icon.',
  },
  'main-content': {
    summary:
      'Main Content wraps AppShell.Main children. Edge: full-width on surface-secondary (recommend 24px padding; appearance=expanded applies 48px). Fixed: 1280px primary panel (border-right only, no L/R padding, no min-height); inner 1000px padding from appearance (default 24 / expanded 48) — do not wrap the page in an extra box.',
  },
  medallion: {
    summary:
      'Medallion is a decorative icon tile with two tones: pastel (tinted surface + deeper icon, inverting in dark) and solid (500 ramp fill + white icon, same in dark). Default size is large (`lg` / 48px); prefer that unless density requires a smaller size.',
  },
  menubar: {
    summary: 'Menubar organizes application-level menus into a persistent horizontal command strip.',
  },
  'micro-calendar': {
    summary:
      'MicroCalendar is a compact month grid with week-strip collapse, travel and on-assignment markers, and unavailable days. Use MicroCalendarTile for the smallest single-day chip.',
  },
  'native-select': {
    summary: 'Native Select uses the platform select element with system styling when browser-native behavior is preferred.',
  },
  'navigation-menu': {
    summary: 'Navigation Menu supports multi-level site or product navigation with dropdown content and link groupings.',
  },
  'number-input': {
    summary:
      'Number Input is an InputGroup field for numeric entry with a custom up/down caret stepper (native spin buttons hidden). Sizes match Input (`inputSize` default 44px / `sm` compact 36px). Supports min/max/step, ArrowUp/ArrowDown, and `hideStepper` for a plain field.',
  },
  'page-header': {
    summary:
      'Page Header: layout inline|block; appearance default (24px block pad) or expanded (48px); actionsPlacement trailing (default) or below (actions under description, 24px gap). Match MainContent appearance when using block. PageHeaderTitle is heading/28 (largest on the page); keep SectionHeader and other headlines ≥1 size smaller. PageHeaderActions: exactly one primary Button, default size; if more than three buttons, DotsThree overflow last on the right with weight="bold". Do not put SearchInput in actions.',
  },
  pagination: {
    summary: 'Pagination moves users through large result sets with page links, boundaries, and jump controls.',
  },
  'password-input': {
    summary:
      'Password Input uses a 600px Input-aligned shell with Placeholder|Value text layers and a trailing Eye icon button (pl uds/gap/12, pr uds/gap/8).',
  },
  'phone-input': {
    summary: 'Phone Input presets Input for telephone formatting and keypad-friendly mobile entry.',
  },
  'pill-toggle': {
    summary: 'Pill Toggle is a single fully-rounded pressed/unpressed control for compact filter or category selection.',
  },
  popover: {
    summary: 'Popover anchors lightweight content to a trigger for inline detail, helper UI, or compact forms — pass `trigger="hover"` for a hover-preview card instead of click-to-open.',
  },
  progress: {
    summary: 'Progress communicates completion status for uploads, workflows, or long-running tasks at a glance.',
  },
  'progress-circles': {
    summary: 'Progress Circles visualizes completion with radial meters and labels for compact KPI and milestone displays.',
  },
  'radio-group': {
    summary: 'Radio Group captures a single choice from a small, mutually exclusive set of options.',
  },
  resizable: {
    summary: 'Resizable lets users redistribute screen space between adjacent panels while keeping both views available.',
  },
  'scroll-area': {
    summary: 'Scroll Area replaces default scroll containers with themed chrome while preserving native scrolling behavior.',
  },
  filterbar: {
    summary:
      'Filterbar is a module toolbar for lists and tables. FilterbarFilters: icon-only default-size Buttons left-aligned immediately after SearchInput. FilterbarActions: exactly one primary Button, default size; DotsThree overflow last on the right with weight="bold" when more than three. Facets may use size sm.',
  },
  'search-input': {
    summary: 'Search Input presets Input for query workflows with browser-native search field behavior.',
  },
  select: {
    summary: 'Select presents a styled menu-based picker for single-choice inputs when search is unnecessary.',
  },
  separator: {
    summary: 'Separator creates subtle visual division between related groups without adding extra semantic noise.',
  },
  'section-header': {
    summary:
      'Section Header is a full-width section heading row: title (body/20/semibold as h2 — recommended) + description (body/16) with tight line height and 0px gap, plus a vertically centered open actions slot.',
  },
  sheet: {
    summary:
      'Sheet opens a dismissible edge panel for inspectors and supporting tasks. Compose Header → Body → Footer (Body scrolls; side footer actions horizontal). Panel corners are 0px (flush to the viewport).',
  },
  sidebar: {
    summary: 'Sidebar establishes an application shell with persistent navigation, collapsible rails, and responsive insets.',
  },
  skeleton: {
    summary: 'Skeleton reserves layout and implies loading structure before real content is ready to render.',
  },
  slider: {
    summary: 'Slider captures one or more numeric values across a bounded range with direct manipulation.',
  },
  sonner: {
    summary:
      'Toast surfaces transient feedback (via Sonner) so success, error, and loading states can be triggered from anywhere in the app.',
  },
  spinner: {
    summary: 'Spinner signals indeterminate loading when progress cannot be measured as a percentage.',
  },
  statistics: {
    summary:
      'Statistic Card shows a single KPI with title, optional medallion, display-48 value, and a footer description plus action link. Layout peer cards in a horizontal flex row with gap 16 or 24px — there is no Statistics wrapper.',
  },
  status: {
    summary: 'Status displays semantic state labels with optional indicator dots for readiness, success, warning, and error states. Preferred appearance is outlined (default); also supports solid and text-only, each in a pastel or deeper "default" color treatment.',
  },
  steps: {
    summary: 'Steps presents ordered workflow progress with complete/active/incomplete/disabled/error/warning markers, horizontal or vertical, in default or compact size.',
  },
  switch: {
    summary: 'Switch toggles a single on/off setting with immediate visual feedback.',
  },
  table: {
    summary:
      'Table structures comparative data into rows and columns. Body cells use 8px top/bottom padding; horizontal interior 4px; first cell left 16–24px; last cell right 16–24px (defaults: py-8, first pl-16, last pr-16). TableHead is ≥48px tall so headers read as distinct from body rows. Inside CardContent the table outer border is dropped so the Card keeps a single 1px outline.',
  },
  tabs: {
    summary:
      'Tabs partition related views into peer panels. Preferred TabsList variant is line (underlined, default); pill uses variant="default". Preferred fill=false: list stays full width while triggers stay condensed; use fill={true} for equal-width triggers.',
  },
  text: {
    summary:
      'Text applies UDS typography styles in `body`, `heading`, and `display` groups with size and line-height presets from `--uds-type-*` tokens, Inter-backed weights, optional `appearance` colors aligned with `--uds-text-*` tokens (`text-uds-text-*`), and a polymorphic `as` prop for the root element.',
  },
  textarea: {
    summary: 'Textarea supports multiline freeform input for notes, descriptions, and longer responses.',
  },
  'time-input': {
    summary:
      'Time Input uses a 600px InputGroup shell with segmented hours, minutes, meridiem, and optional timezone TEXT (Timezone boolean) plus a trailing Clock icon.',
  },
  'time-step-input': {
    summary:
      'Time Step Input uses a 600px read-only shell with centered Placeholder|Value text, optional timezone label (Timezone boolean), and a trailing Clock icon.',
  },
  'token-input': {
    summary:
      'TokenInput composes removable token chips as Outline Buttons (Small / 32px default, Extra Small / 24px when inputSize=sm) plus an inline draft field in uds/surface/secondary shell.',
  },
  toggle: {
    summary: 'Toggle applies a pressed/unpressed state to a single formatting or preference control.',
  },
  'toggle-group': {
    summary: 'Toggle Group coordinates multiple toggles into single- or multi-select segmented controls.',
  },
  toolbar: {
    summary: 'Toolbar groups compact actions and controls into a single framed row with optional visual dividers.',
  },
  tooltip: {
    summary: 'Tooltip adds short explanatory text to controls and indicators when labels alone are insufficient.',
  },
  'url-input': {
    summary:
      'URL Input mirrors the Input Group URL pattern with a fixed https:// protocol addon and an editable domain/path field (412px Figma ref width).',
  },
}

export function getShadcnComponentMeta(slug: ShadcnUiSlug): ShadcnComponentMeta {
  return SHADCN_COMPONENT_META[slug]
}
