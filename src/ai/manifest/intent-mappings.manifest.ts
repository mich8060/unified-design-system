export const IntentComponentMappings = {
  primaryAction: {
    component: "Button",
    props: { appearance: "primary" },
    notes: "Use one primary action per section max.",
  },
  secondaryAction: {
    component: "Button",
    props: { appearance: "text" },
    notes: "Use non-primary appearance for secondary actions.",
  },
  sectionContainer: {
    component: "Container",
    props: { appearance: "transparent", padding: "large" },
    notes: "Default section wrapper: transparent surface with 24px padding.",
  },
  contentStack: {
    component: "Flex",
    props: { direction: "column", gap: "--uds-spacing-16" },
    notes: "Primary stack for vertical rhythm.",
  },
  formFieldWrapper: {
    component: "Field",
    notes: "Wrap inputs that require label/helper/error messaging.",
  },
  textInputControl: {
    component: "TextInput",
    notes: "Use TextInput for freeform single-line text.",
  },
  selectionControl: {
    component: "Dropdown",
    notes: "Use Dropdown for controlled selection.",
  },
  statusIndicator: {
    component: "Status",
    notes: "Use semantic status component for state communication.",
  },
  badgeLabel: {
    component: "Tag",
    notes: "Use Tag for concise categorical labels.",
  },
  contextualActions: {
    component: "ActionMenu",
    notes: "Use ActionMenu for row/object-level secondary actions.",
  },
  dataPresentation: {
    component: "Table",
    notes: "Use Table for tabular datasets and structured records.",
  },
  confirmationDialog: {
    component: "Modal",
    notes: "Use Modal for confirmation/destructive decision points.",
  },
} as const;
