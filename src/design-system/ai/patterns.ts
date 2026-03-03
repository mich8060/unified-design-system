import type { FlowPattern } from "./types";

export const UDS_FLOW_PATTERNS: readonly FlowPattern[] = [
  {
    id: "list-detail-with-actions",
    title: "List + Detail + Side Actions",
    goal: "Browse records quickly, then act on a selected record.",
    whenToUse: "Entity management screens for providers, jobs, or tasks.",
    steps: [
      "Render summary list in Table or list layout.",
      "Select row to populate detail region.",
      "Expose contextual actions via ActionMenu or Button group.",
      "Use Modal for destructive or irreversible actions.",
    ],
    recommendedComponents: ["Table", "Card", "ActionMenu", "Button", "Modal", "Tag", "Avatar"],
    accessibilityChecks: [
      "Ensure row selection is keyboard reachable.",
      "Ensure detail region updates are announced when needed.",
      "Ensure modal focus is trapped and restored on close.",
    ],
  },
  {
    id: "validated-form-submit",
    title: "Validated Form Submission",
    goal: "Collect structured input with clear validation and submit confidence.",
    whenToUse: "Create/edit flows for records and settings.",
    steps: [
      "Wrap each control with Field for label and validation context.",
      "Use helper text for constraints before validation fails.",
      "Show inline error messages with clear correction guidance.",
      "Keep primary submit action persistent and disabled only when necessary.",
    ],
    recommendedComponents: ["Field", "TextInput", "Dropdown", "Textarea", "Datepicker", "Button"],
    accessibilityChecks: [
      "Associate labels and error messages with each control.",
      "Keep error text specific and non-color dependent.",
      "Maintain visible focus on all interactive controls.",
    ],
  },
];
