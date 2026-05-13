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
    summary: 'Avatar presents a person or entity with fallback initials, optional status, and inline profile actions.',
  },
  badge: {
    summary: 'Badge applies compact visual labeling for status, category, or emphasis inside lists, cards, and tables.',
  },
  breadcrumb: {
    summary: 'Breadcrumb shows the current path through a hierarchy and gives users quick recovery back to parent views.',
  },
  branding: {
    summary: 'Branding renders approved wordmarks and brand marks so docs and app chrome stay aligned with system assets.',
  },
  button: {
    summary: 'Button triggers primary and secondary actions with shared sizing, emphasis, and disabled/loading behavior.',
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
    summary: 'Chart wraps chart primitives with the package theme so data views inherit system colors, spacing, and type.',
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
    summary: 'Combobox merges search and selection for long option lists where filtering is faster than scanning.',
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
    summary: 'Drawer slides in a task surface from the edge of the viewport for mobile-first and contextual workflows.',
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
    summary: 'Footer renders a fixed bottom bar with copyright text and optional navigation links.',
  },
  header: {
    summary: 'Header provides a top bar above the main content area with leading content (search, breadcrumbs) and trailing utility actions.',
  },
  'hover-card': {
    summary: 'Hover Card previews richer metadata on demand without forcing a full navigation or modal interruption.',
  },
  input: {
    summary: 'Input handles short-form text entry with the package sizing, focus, and validation styling defaults.',
  },
  'input-group': {
    summary: 'Input Group combines fields with addons and inline text so formatted inputs read as a single control.',
  },
  'input-otp': {
    summary: 'Input OTP breaks one-time code entry into predictable slots for faster scanning and correction.',
  },
  item: {
    summary: 'Item is a composable content row for list-like layouts with media, text, metadata, and trailing actions.',
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
    summary: 'Link provides styled inline navigation and external-link affordances using design-system typography and color tokens.',
  },
  medallion: {
    summary:
      'Medallion is a decorative icon tile with two tones: pastel (tinted surface + deeper icon, inverting in dark) and solid (500 ramp fill + white icon, same in dark).',
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
    summary: 'Number Input presets Input for numeric entry with decimal keyboard hints and numeric browser behavior.',
  },
  pagination: {
    summary: 'Pagination moves users through large result sets with page links, boundaries, and jump controls.',
  },
  'password-input': {
    summary: 'Password Input presets Input for secure credential entry with password autofill semantics.',
  },
  'phone-input': {
    summary: 'Phone Input presets Input for telephone formatting and keypad-friendly mobile entry.',
  },
  popover: {
    summary: 'Popover anchors lightweight content to a trigger for inline detail, helper UI, or compact forms.',
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
    summary: 'Section Header composes titles, descriptions, and actions into a reusable heading row for page sections.',
  },
  sheet: {
    summary: 'Sheet opens a dismissible edge panel for supporting tasks, settings, and contextual details.',
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
    summary: 'Statistics provides labeled metric cards for dashboards and summary rails with values and helper context.',
  },
  status: {
    summary: 'Status displays semantic state labels with optional indicator dots for readiness, success, warning, and error states.',
  },
  steps: {
    summary: 'Steps presents ordered workflow progress with upcoming/current/complete markers and descriptive guidance.',
  },
  switch: {
    summary: 'Switch toggles a single on/off setting with immediate visual feedback.',
  },
  table: {
    summary: 'Table structures comparative data into rows and columns with consistent headers and body cells.',
  },
  tabs: {
    summary: 'Tabs partition related views into peer panels so users can switch contexts without leaving the page.',
  },
  text: {
    summary:
      'Text applies UDS typography styles in `body`, `heading`, and `display` groups with size and line-height presets from `--uds-type-*` tokens, Inter-backed weights, optional `appearance` colors aligned with `--uds-text-*` tokens (`text-uds-text-*`), and a polymorphic `as` prop for the root element.',
  },
  textarea: {
    summary: 'Textarea supports multiline freeform input for notes, descriptions, and longer responses.',
  },
  'time-input': {
    summary: 'Time Input presets Input for native time selection while retaining package sizing and validation styling.',
  },
  'time-step-input': {
    summary: 'Time Step Input combines a text field with a dropdown time list generated from configurable minute increments.',
  },
  'token-input': {
    summary: 'Token Input turns free text into removable chip tokens so tags, recipients, and filters can be entered as discrete items.',
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
    summary: 'URL Input mirrors the Input Group URL pattern with a fixed protocol addon and an editable domain/path field.',
  },
}

export function getShadcnComponentMeta(slug: ShadcnUiSlug): ShadcnComponentMeta {
  return SHADCN_COMPONENT_META[slug]
}
