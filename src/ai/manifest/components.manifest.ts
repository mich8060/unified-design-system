export const ComponentRegistry = {
  Accordion: {
    category: "layout",
    intent: "Progressive disclosure for grouped content",
    description:
      "A vertically stacked disclosure component that allows users to expand and collapse sections of related content. It manages state visibility, keyboard accessibility, and animation timing, and should not be used for navigation or page transitions.",
    alsoKnownAs: ["Disclosure", "Expandable Panel", "Collapsible Section", "Expansion Panel", "Disclosure Group"],
    roles: ["region"],
    preferredParent: ["Container", "Card"],
  },
  ActionMenu: {
    category: "navigation",
    intent: "Contextual action list for local operations",
    description:
      "A contextual action surface triggered by a button or icon that exposes secondary, object-specific actions. It manages positioning, keyboard navigation, focus behavior, and dismissal, and is not intended for primary navigation.",
    alsoKnownAs: ["Overflow Menu", "Kebab Menu", "Context Menu", "More Menu", "Options Menu", "Ellipsis Menu"],
    roles: ["menu"],
    preferredParent: ["Table", "Card"],
  },
  AppShell: {
    category: "layout",
    intent: "Top-level application shell and page structure",
    description:
      "The structural application layout framework that governs global regions such as menu, listview, main content, side panel, and footer while enforcing consistent structure, theme/brand application, and layout configuration.",
    alsoKnownAs: ["Application Layout", "Shell Layout", "Root Layout", "Global Layout", "Framework Layout", "Layout Scaffold", "Layout Infrastructure"],
    roles: ["application"],
    preferredParent: ["root"],
    compoundSlots: ["Menu", "Content", "Listview", "Main", "SidePanel", "Footer"],
  },
  Avatar: {
    category: "data-display",
    intent: "Visual identity for people or entities",
    description:
      "A visual identity component representing a person, organization, or system entity via image, initials, or fallback icon. It manages size, shape, and status indicators but not profile interactions.",
    alsoKnownAs: ["Profile Image", "User Icon", "Identity Badge", "User Thumbnail"],
    roles: ["img"],
    preferredParent: ["Table", "Card", "Flex"],
  },
  Badge: {
    category: "data-display",
    intent: "Compact count/status indicator",
    description:
      "A compact visual indicator for status, counts, or contextual metadata, typically attached to another UI element. It manages semantic state color and sizing.",
    alsoKnownAs: ["Indicator", "Counter", "Notification Badge", "Status Badge", "Label"],
    roles: ["status"],
    preferredParent: ["Tabs", "Card", "Button"],
    props: {
      appearance: {
        type: "enum",
        values: ["solid", "outlined"],
      },
    },
  },
  Branding: {
    category: "branding",
    intent: "Brand identity and logo presentation",
    description:
      "A brand-aware component for rendering logos, wordmarks, and brand identifiers based on active brand and theme context.",
    alsoKnownAs: ["Logo", "BrandMark", "Wordmark", "Brand Asset", "Brand Identity"],
    roles: ["banner"],
    preferredParent: ["Menu", "AppShell"],
  },
  Breadcrumb: {
    category: "navigation",
    intent: "Hierarchy-aware location trail",
    description:
      "A hierarchical navigation aid that communicates location within application structure with consistent spacing and truncation.",
    alsoKnownAs: ["Path Navigation", "Hierarchy Trail", "Navigation Trail", "Location Trail"],
    roles: ["navigation"],
    preferredParent: ["Container"],
  },
  Button: {
    category: "action",
    intent: "Primary and secondary user actions",
    description:
      "An interactive control for triggering actions such as submissions, navigation, or state changes, with support for multiple variants, sizes, icon placements, and disabled states.",
    alsoKnownAs: ["CTA", "Action Button", "Primary Action", "Control Button"],
    roles: ["button"],
    preferredParent: ["Field", "Card", "Dialog", "Modal", "Container", "Flex"],
    props: {
      appearance: {
        type: "enum",
        values: ["primary", "soft", "outline", "text", "ghost", "disabled", "destructive"],
      },
      size: {
        type: "enum",
        values: ["xsmall", "small", "default", "large"],
      },
      disabled: {
        type: "boolean",
      },
    },
    constraints: { onlyOnePrimaryPerSection: true },
  },
  ButtonGroup: {
    category: "action",
    intent: "Grouped related button actions",
    description:
      "A compositional wrapper that arranges multiple Button actions with consistent spacing and orientation for related decisions.",
    alsoKnownAs: ["Action Group", "Button Cluster", "Action Row"],
    roles: ["group"],
    preferredParent: ["Card", "Container", "Dialog", "Modal"],
    props: {
      orientation: {
        type: "enum",
        values: ["horizontal", "vertical"],
      },
      size: {
        type: "enum",
        values: ["xsmall", "small", "default", "large"],
      },
      fullWidth: {
        type: "boolean",
      },
      disabled: {
        type: "boolean",
      },
    },
    constraints: { onlyOnePrimaryPerSection: true },
  },
  Calendar: {
    category: "form",
    intent: "Calendar grid date selection",
    description:
      "A full calendar visualization for selecting and viewing dates across weeks and months, with keyboard interaction and focus handling.",
    alsoKnownAs: ["Date Grid", "Month View", "Date Selector", "Calendar View"],
    roles: ["grid"],
    preferredParent: ["Datepicker", "Card"],
  },
  Checkbox: {
    category: "form",
    intent: "Multi-select boolean input",
    description:
      "A binary selection control for independently selecting multiple options, including checked, unchecked, and indeterminate states.",
    alsoKnownAs: ["Multi-select Control", "Boolean Input", "Selection Box"],
    roles: ["checkbox"],
    preferredParent: ["Field", "Form"],
  },
  CheckboxGroup: {
    category: "form",
    intent: "Grouped multi-select checkboxes",
    description:
      "A grouped set of Checkbox controls for selecting multiple options with shared label, orientation, and change handling.",
    alsoKnownAs: ["Checkbox List", "Multi-select Group", "Selection Group"],
    roles: ["group"],
    preferredParent: ["Field", "Form", "Card"],
    props: {
      orientation: {
        type: "enum",
        values: ["vertical", "horizontal"],
      },
      disabled: {
        type: "boolean",
      },
    },
  },
  Checklist: {
    category: "navigation",
    intent: "Sidebar step checklist with completion progress",
    description:
      "A vertical step checklist used as a sidebar to track progress through multi-step workflows and forms.",
    alsoKnownAs: ["Progress Checklist", "Step Checklist", "Application Checklist", "Sidebar Progress"],
    roles: ["navigation"],
    preferredParent: ["AppShell", "Container", "Card"],
  },
  Chip: {
    category: "form",
    intent: "Compact selectable/tag item",
    description:
      "A compact, optionally removable element representing user input, filter criteria, or selected values.",
    alsoKnownAs: ["Token", "Input Chip", "Filter Chip", "Removable Tag"],
    roles: ["button"],
    preferredParent: ["Field", "Flex"],
  },
  Code: { category: "data-display", intent: "Formatted code snippet block", roles: ["code"], preferredParent: ["Card", "Container"] },
  Container: {
    category: "layout",
    intent: "Width-constrained page/content wrapper",
    description:
      "A structural layout wrapper that enforces width constraints, horizontal padding, and alignment rhythm for consistent page sections.",
    alsoKnownAs: ["Wrapper", "Layout Container", "Section Wrapper", "Content Wrapper"],
    roles: ["region"],
    preferredParent: ["AppShell", "root"],
    props: {
      appearance: {
        type: "enum",
        values: ["default", "transparent"],
      },
    },
  },
  DescriptionList: {
    category: "data-display",
    intent: "Compact key-value metadata rows",
    description:
      "A compact definition-list style component for rendering labeled values in dense details views, side panels, and metadata cards.",
    alsoKnownAs: ["Definition List", "Key Value List", "Metadata List"],
    roles: ["list"],
    preferredParent: ["Card", "Container", "AppShell"],
  },
  CurrencyInput: {
    category: "form",
    intent: "Currency-aware monetary input",
    description:
      "A formatted amount input for monetary values with currency-friendly entry behavior.",
    alsoKnownAs: ["Money Input", "Amount Field", "Currency Field"],
    roles: ["textbox"],
    preferredParent: ["Field", "Form"],
  },
  DateInput: {
    category: "form",
    intent: "Date value input control",
    description:
      "A single-field date input wrapper for capturing calendar dates.",
    alsoKnownAs: ["Date Field", "Date Text Input"],
    roles: ["textbox"],
    preferredParent: ["Field", "Form"],
  },
  DateRangeInput: {
    category: "form",
    intent: "Start/end date range input",
    description:
      "A paired date input control for capturing start and end dates.",
    alsoKnownAs: ["Date Range Picker", "Start End Date Input"],
    roles: ["group"],
    preferredParent: ["Field", "Form", "Card"],
  },
  Datepicker: {
    category: "form",
    intent: "Date input and picker interaction",
    description:
      "A composite input component combining text entry and calendar selection for date input, including formatting and accessibility behavior.",
    alsoKnownAs: ["Date Selector", "Date Field", "Calendar Input"],
    roles: ["combobox"],
    preferredParent: ["Field", "Form"],
  },
  Dialog: {
    category: "feedback",
    intent: "Structured confirmation/message surface",
    description:
      "A modal interaction surface requiring user attention before proceeding, with focus trapping, overlay behavior, and escape dismissal.",
    alsoKnownAs: ["Modal Dialog", "Alert Dialog", "Confirmation Dialog", "Overlay Dialog"],
    roles: ["dialog"],
    preferredParent: ["Container", "Card"],
  },
  Divider: {
    category: "layout",
    intent: "Semantic section separator",
    description:
      "A non-interactive visual separator for distinguishing sections of content with consistent spacing and alignment.",
    alsoKnownAs: ["Separator", "Rule", "Horizontal Rule", "Line Divider"],
    roles: ["separator"],
    preferredParent: ["Container", "Card", "Flex"],
  },
  DotStatus: {
    category: "data-display",
    intent: "Small status indicator dot",
    description:
      "A minimal color-coded dot used to communicate state visually and intended to be paired with accessible text.",
    alsoKnownAs: ["Status Dot", "Presence Indicator", "State Dot"],
    roles: ["status"],
    preferredParent: ["Table", "Card", "Flex"],
  },
  Dropdown: {
    category: "form",
    intent: "Single-select list input",
    description:
      "A selectable list component that expands from a trigger to allow single-option selection, including open/close behavior and keyboard navigation.",
    alsoKnownAs: ["Select", "Select Menu", "Picker", "Combo List"],
    roles: ["combobox"],
    preferredParent: ["Field", "Form", "Menu"],
    props: {
      size: {
        type: "enum",
        values: ["compact", "default"],
      },
      disabled: {
        type: "boolean",
      },
    },
  },
  EmptyState: {
    category: "feedback",
    intent: "Guidance for empty data scenarios",
    description:
      "A structured placeholder pattern shown when no data exists, providing context and guidance so users can move forward instead of seeing a blank interface.",
    alsoKnownAs: ["Blank State", "Zero State", "No Data State", "First Use State"],
    roles: ["status"],
    preferredParent: ["Container", "Card", "Table"],
  },
  EventCard: {
    category: "data-display",
    intent: "Event summary in a compact card",
    description:
      "A specialized content container optimized for presenting event metadata such as date, time, location, and status.",
    alsoKnownAs: ["Event Tile", "Schedule Card", "Calendar Card", "Activity Card"],
    roles: ["article"],
    preferredParent: ["Container", "Flex"],
  },
  Field: {
    category: "form",
    intent: "Label/helper/error wrapper for controls",
    description:
      "A compositional wrapper that pairs form controls with label, helper text, validation messaging, and accessibility relationships.",
    alsoKnownAs: ["Form Field", "Input Field", "Control Field", "Field Wrapper"],
    roles: ["group"],
    preferredParent: ["Form", "Card", "Container"],
  },
  FileUpload: {
    category: "form",
    intent: "File selection and upload interaction",
    description:
      "An input for uploading files via drag-and-drop or system picker with visual states for progress, selected files, and errors.",
    alsoKnownAs: ["File Picker", "Upload Field", "Attachment Upload", "Dropzone"],
    roles: ["group"],
    preferredParent: ["Field", "Form"],
  },
  Flex: {
    category: "layout",
    intent: "Primary flexbox layout primitive",
    description:
      "A flexbox-based layout primitive for direction, alignment, spacing, and wrapping using system tokens for predictable layout behavior.",
    alsoKnownAs: ["Stack", "Flexbox Container", "Layout Stack", "Flex Layout"],
    roles: ["group"],
    preferredParent: ["Container", "Card", "AppShell"],
  },
  Icon: {
    category: "data-display",
    intent: "Consistent icon rendering wrapper",
    description:
      "A scalable vector icon component enforcing consistent sizing, alignment, color token usage, and accessibility semantics.",
    alsoKnownAs: ["Glyph", "Symbol", "UI Icon", "Vector Icon"],
    roles: ["img"],
    preferredParent: ["Button", "Tag", "Status", "Text"],
    props: {
      appearance: {
        type: "enum",
        values: ["regular", "bold", "thin", "light", "duotone", "fill", "solid", "outline"],
      },
    },
  },
  ImageAspect: {
    category: "layout",
    intent: "Image with stable aspect ratio",
    description:
      "A responsive image container that preserves a predefined aspect ratio across screen sizes without distortion.",
    alsoKnownAs: ["Aspect Ratio Container", "Responsive Image Frame", "Media Frame"],
    roles: ["img"],
    preferredParent: ["Card", "Container"],
  },
  Key: {
    category: "data-display",
    intent: "Keyboard shortcut representation",
    description:
      "A structured key-value style component for labeled metadata such as properties, details, and compact information pairs.",
    alsoKnownAs: ["KeyValue", "Property List", "Definition List", "Metadata Pair"],
    roles: ["note"],
    preferredParent: ["Tooltip", "Card", "Text"],
  },
  Layout: {
    category: "layout",
    intent: "Layout region composition primitive",
    description:
      "A structural layout component for arranging content regions and width behavior.",
    alsoKnownAs: ["Layout Frame", "Page Layout"],
    roles: ["region"],
    preferredParent: ["AppShell", "Container", "root"],
  },
  Menu: {
    category: "navigation",
    intent: "Main app navigation and mode controls",
    description:
      "A structured vertical list of navigation options or actions with active states, keyboard support, and optional hierarchy.",
    alsoKnownAs: ["Navigation Menu", "Action List", "Option List", "Navigation List"],
    roles: ["navigation"],
    preferredParent: ["AppShell"],
  },
  MicroCalendar: {
    category: "data-display",
    intent: "Compact calendar visualization",
    description:
      "A compact calendar view for dashboards and side panels where full calendar interaction is unnecessary.",
    alsoKnownAs: ["Mini Calendar", "Compact Calendar", "Calendar Widget"],
    roles: ["grid"],
    preferredParent: ["Card", "Container"],
  },
  Modal: {
    category: "feedback",
    intent: "Blocking overlay for focused tasks",
    description:
      "A centered or full-screen overlay surface for focused interactions, managing stacking, overlay behavior, and dismissal.",
    alsoKnownAs: ["Overlay", "Lightbox", "Dialog Window", "Overlay Modal"],
    roles: ["dialog"],
    preferredParent: ["AppShell", "root"],
  },
  NumberInput: {
    category: "form",
    intent: "Numeric input control",
    description:
      "A number-constrained text input for integer and decimal entry.",
    alsoKnownAs: ["Numeric Field", "Number Field"],
    roles: ["textbox"],
    preferredParent: ["Field", "Form"],
  },
  Pagination: {
    category: "navigation",
    intent: "Paged navigation controls",
    description:
      "A control for navigating large datasets split across pages while preserving context of current and total pages.",
    alsoKnownAs: ["Page Navigator", "Page Controls", "Pager"],
    roles: ["navigation"],
    preferredParent: ["Table", "Container"],
  },
  ProgressCircle: {
    category: "data-display",
    intent: "Circular progress visualization",
    description:
      "A circular progress visualization for determinate completion percentages or indeterminate loading activity.",
    alsoKnownAs: ["Circular Progress", "Radial Progress", "Progress Ring"],
    roles: ["progressbar"],
    preferredParent: ["Card", "Container"],
  },
  ProgressIndicator: {
    category: "data-display",
    intent: "Linear progress visualization",
    description:
      "A visual indicator for workflow progress, typically rendered as a linear bar or staged sequence.",
    alsoKnownAs: ["Progress Bar", "Step Progress", "Task Progress"],
    roles: ["progressbar"],
    preferredParent: ["Card", "Container", "Table"],
  },
  ProvidersCard: {
    category: "data-display",
    intent: "Provider summary card module",
    description:
      "A card surface for presenting provider-centric summary information and actions.",
    alsoKnownAs: ["Provider Card", "Provider Tile"],
    roles: ["region"],
    preferredParent: ["Container", "Flex"],
  },
  PasswordInput: {
    category: "form",
    intent: "Masked password input control",
    description:
      "A secure text input for password entry with masking behavior.",
    alsoKnownAs: ["Password Field", "Secure Input"],
    roles: ["textbox"],
    preferredParent: ["Field", "Form"],
  },
  PhoneInput: {
    category: "form",
    intent: "Telephone number input control",
    description:
      "A phone number input with formatting and validation-oriented behavior.",
    alsoKnownAs: ["Telephone Input", "Phone Field"],
    roles: ["textbox"],
    preferredParent: ["Field", "Form"],
  },
  Radio: {
    category: "form",
    intent: "Single-choice option input",
    description:
      "A mutually exclusive selection control for grouped choices where only one option can be selected.",
    alsoKnownAs: ["Radio Button", "Option Selector", "Single Select Control"],
    roles: ["radio"],
    preferredParent: ["Field", "Form"],
  },
  RadioGroup: {
    category: "form",
    intent: "Grouped single-select radios",
    description:
      "A grouped set of Radio controls for selecting exactly one option with shared name, layout orientation, and state handling.",
    alsoKnownAs: ["Single Select Group", "Option Group", "Radio Set"],
    roles: ["radiogroup"],
    preferredParent: ["Field", "Form", "Card"],
    props: {
      orientation: {
        type: "enum",
        values: ["vertical", "horizontal"],
      },
      disabled: {
        type: "boolean",
      },
    },
  },
  ScrollView: {
    category: "layout",
    intent: "Scrollable viewport container",
    description:
      "A constrained overflow region for content that requires vertical or horizontal scrolling.",
    alsoKnownAs: ["Scrollable Container", "Scroll Region"],
    roles: ["region"],
    preferredParent: ["AppShell", "Container", "Card"],
  },
  SearchInput: {
    category: "form",
    intent: "Search query input control",
    description:
      "A query-focused input used for search and filter interactions.",
    alsoKnownAs: ["Search Field", "Search Box"],
    roles: ["searchbox"],
    preferredParent: ["Field", "Form", "Menu"],
  },
  SectionHeader: {
    category: "layout",
    intent: "Section heading with supporting metadata/actions",
    description:
      "A heading row pattern for section title, supporting text, and optional actions.",
    alsoKnownAs: ["Section Title Row", "Subheader"],
    roles: ["heading"],
    preferredParent: ["Container", "Card", "Flex"],
  },
  Slider: {
    category: "form",
    intent: "Range/value slider input",
    description:
      "A draggable range control for selecting numeric values with continuous or stepped adjustments.",
    alsoKnownAs: ["Range Slider", "Range Input", "Value Slider"],
    roles: ["slider"],
    preferredParent: ["Field", "Form"],
  },
  SelectableCard: {
    category: "data-display",
    intent: "Selectable card-row primitive",
    description:
      "An interactive row/card surface for selectable list content with leading, content, status, and trailing action slots.",
    alsoKnownAs: ["Selectable Row", "List Card", "Selectable Tile"],
    roles: ["button"],
    preferredParent: ["Container", "Flex", "AppShell"],
  },
  Status: {
    category: "data-display",
    intent: "Status label with semantic tone",
    description:
      "A semantic indicator communicating system, object, or process condition with color, iconography, and text.",
    alsoKnownAs: ["Status Indicator", "State Indicator", "System Status"],
    roles: ["status"],
    preferredParent: ["Table", "Card", "Flex"],
  },
  Statistics: {
    category: "data-display",
    intent: "KPI and metric summary display",
    description:
      "A metric display component for KPI values with optional trend indication, helper context, and icon.",
    alsoKnownAs: ["Stat Card", "KPI Tile", "Metric Card", "KPI Summary"],
    roles: ["status"],
    preferredParent: ["Card", "Container", "Flex"],
    props: {
      appearance: {
        type: "enum",
        values: ["default", "outlined"],
      },
      size: {
        type: "enum",
        values: ["default", "compact"],
      },
      trend: {
        type: "enum",
        values: ["up", "down", "neutral"],
      },
    },
  },
  Steps: {
    category: "navigation",
    intent: "Multi-step progress navigation",
    description:
      "A structured sequence component for multi-step workflows showing completed, current, and upcoming stages.",
    alsoKnownAs: ["Stepper", "Workflow Steps", "Process Steps", "Step Navigation"],
    roles: ["navigation"],
    preferredParent: ["Container", "Card"],
  },
  Table: {
    category: "data-display",
    intent: "Structured tabular data rendering",
    description:
      "A row-and-column data grid supporting sorting/filtering hooks and row-level actions with accessible structure.",
    alsoKnownAs: ["Data Table", "Data Grid", "Grid View"],
    roles: ["table"],
    preferredParent: ["Container", "Card"],
  },
  Tabs: {
    category: "navigation",
    intent: "Switch between content sections",
    description:
      "A segmented navigation pattern for switching between related content areas within a shared container.",
    alsoKnownAs: ["Tab Navigation", "Tab Bar", "Tabbed Interface"],
    roles: ["tablist"],
    preferredParent: ["Container", "Card"],
  },
  Tag: {
    category: "data-display",
    intent: "Categorical metadata label",
    description:
      "A compact metadata label for categorization, filtering, and visual grouping of related elements.",
    alsoKnownAs: ["Label", "Category Tag", "Metadata Tag", "Pill", "Capsule Label", "Rounded Tag"],
    roles: ["status"],
    preferredParent: ["Table", "Card", "Flex"],
  },
  Text: {
    category: "data-display",
    intent: "Typography primitive for semantic text",
    description:
      "A typography component that adapts semantic styling and theme-aware text contrast across active brand and mode.",
    alsoKnownAs: ["ThemeText", "Themed Text", "Semantic Text", "Adaptive Text"],
    roles: ["text"],
    preferredParent: ["Container", "Card", "Field", "Dialog"],
  },
  TextInput: {
    category: "form",
    intent: "Single-line text input control",
    description:
      "A single-line input used for textual values such as names, titles, and search queries.",
    alsoKnownAs: ["Input Field", "Text Field", "Input Box"],
    roles: ["textbox"],
    preferredParent: ["Field", "Form"],
    props: {
      size: {
        type: "enum",
        values: ["default", "compact"],
      },
      disabled: {
        type: "boolean",
      },
    },
  },
  Textarea: {
    category: "form",
    intent: "Multi-line text input control",
    description:
      "A multi-line text input for longer content such as descriptions, comments, and notes.",
    alsoKnownAs: ["Multi-line Input", "Text Area Field", "Long Text Input"],
    roles: ["textbox"],
    preferredParent: ["Field", "Form"],
  },
  TimeInput: {
    category: "form",
    intent: "Time value input control",
    description:
      "A time-specific input used for schedule and appointment entry.",
    alsoKnownAs: ["Time Field", "Clock Input"],
    roles: ["textbox"],
    preferredParent: ["Field", "Form"],
  },
  Toolbar: {
    category: "layout",
    intent: "Top bar with edge actions and centered identity/title",
    description:
      "A horizontal application bar that reserves left and right action regions and a centered title or branding slot.",
    alsoKnownAs: ["Top Bar", "Header Bar", "Action Bar", "Title Bar"],
    roles: ["toolbar"],
    preferredParent: ["AppShell", "Container", "root"],
  },
  Toast: {
    category: "feedback",
    intent: "Transient notification message",
    description:
      "A temporary, non-blocking notification surface that provides brief system feedback and auto-dismisses.",
    alsoKnownAs: ["Notification Toast", "Snackbar", "Temporary Alert"],
    roles: ["status"],
    preferredParent: ["AppShell", "root"],
  },
  Toggle: {
    category: "form",
    intent: "Binary switch control",
    description:
      "A binary switch for enabling or disabling a persistent setting or feature state.",
    alsoKnownAs: ["Switch", "Toggle Switch", "On-Off Switch"],
    roles: ["switch"],
    preferredParent: ["Field", "Form", "Menu"],
    props: {
      size: {
        type: "enum",
        values: ["large", "small"],
      },
      disabled: {
        type: "boolean",
      },
    },
  },
  Tooltip: {
    category: "feedback",
    intent: "Contextual helper text on hover/focus",
    description:
      "A contextual overlay shown on hover or focus to provide supplemental information without interrupting workflow.",
    alsoKnownAs: ["Hover Tip", "Info Tip", "Hint Bubble"],
    roles: ["tooltip"],
    preferredParent: ["Button", "Icon", "Text"],
  },
} as const;
