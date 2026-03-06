import type { ComponentMetadata } from "./types";

export const BUTTON_METADATA: ComponentMetadata = {
  name: "Button",
  importPath: "@mich8060/unified-design-system/Button",
  tier: 1,
  purpose: "Trigger user actions with clear semantic hierarchy.",
  variants: {
    appearance: ["primary", "soft", "outline", "text", "ghost", "destructive", "disabled"],
    size: ["xsmall", "small", "default", "large"],
    layout: ["label-only", "icon-left", "icon-right", "icon-only", "only"],
  },
  states: ["default", "hover", "focus", "disabled"],
  props: [
    { name: "label", type: "string", description: "Visible button label text." },
    { name: "appearance", type: "ButtonAppearance", defaultValue: "primary", description: "Visual emphasis." },
    { name: "size", type: "ButtonSize", defaultValue: "default", description: "Sizing scale." },
    { name: "iconName", type: "string", description: "Optional icon name from Icon library." },
    { name: "onClick", type: "() => void", description: "Action handler for interactive usage." },
  ],
  tokensUsed: ["--uds-color-*", "--uds-spacing-*", "--uds-radius-*", "--uds-font-size-*"],
  composition: ["Use inside Field for submit/reset actions.", "Pair with Icon for intent clarity."],
  antiPatterns: ["Do not use `disabled` appearance as semantic state; use `disabled` prop.", "Do not place more than one primary button in the same local action group."],
};

export const TABLE_METADATA: ComponentMetadata = {
  name: "Table",
  importPath: "@mich8060/unified-design-system/Table",
  tier: 2,
  purpose: "Render structured, scan-friendly tabular datasets.",
  variants: {},
  states: ["default", "loading", "empty"],
  props: [
    { name: "columns", type: "TableColumn[]", required: true, description: "Column definitions including label and key." },
    { name: "data", type: "Record<string, unknown>[]", required: true, description: "Row data source." },
    { name: "onSort", type: "(columnKey: string) => void", description: "Sort callback for sortable columns." },
  ],
  tokensUsed: ["--uds-color-*", "--uds-spacing-*", "--uds-font-size-*", "--uds-line-*"],
  composition: ["Combine with Pagination for large datasets.", "Wrap with Container for contained sections."],
  antiPatterns: ["Do not use Table for fewer than two columns.", "Do not render unbounded datasets without pagination or virtualization."],
};

export const FIELD_METADATA: ComponentMetadata = {
  name: "Field",
  importPath: "@mich8060/unified-design-system/Field",
  tier: 1,
  purpose: "Standardize form label, helper, and validation messages.",
  variants: {},
  states: ["default", "error", "disabled"],
  props: [
    { name: "label", type: "string", required: true, description: "Accessible label text." },
    { name: "required", type: "boolean", defaultValue: false, description: "Marks field as required." },
    { name: "helperMessage", type: "string", description: "Supporting helper text." },
    { name: "errorMessage", type: "string", description: "Validation message for error state." },
  ],
  tokensUsed: ["--uds-color-*", "--uds-spacing-*", "--uds-font-size-*"],
  composition: ["Wrap TextInput, Dropdown, Datepicker, Textarea, or custom controls."],
  antiPatterns: ["Do not render inputs without Field label metadata.", "Do not show helper and error messages that conflict."],
};

export const MODAL_METADATA: ComponentMetadata = {
  name: "Modal",
  importPath: "@mich8060/unified-design-system/Modal",
  tier: 2,
  purpose: "Capture focused user attention for high-priority flows.",
  variants: {},
  states: ["closed", "open"],
  props: [
    { name: "isOpen", type: "boolean", required: true, description: "Controls modal visibility." },
    { name: "title", type: "string", description: "Modal heading text." },
    { name: "onClose", type: "() => void", required: true, description: "Close interaction handler." },
  ],
  tokensUsed: ["--uds-elevation-overlay", "--uds-color-*", "--uds-spacing-*"],
  composition: ["Use with Button actions in footer.", "Use Form controls for confirm workflows."],
  antiPatterns: ["Do not nest modals.", "Do not use modal for low-priority or passive information."],
};

export const AI_COMPONENT_METADATA = {
  Button: BUTTON_METADATA,
  Table: TABLE_METADATA,
  Field: FIELD_METADATA,
  Modal: MODAL_METADATA,
} as const;
