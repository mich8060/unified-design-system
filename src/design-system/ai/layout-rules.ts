import type { LayoutRule } from "./types";

export const UDS_LAYOUT_RULES: readonly LayoutRule[] = [
  {
    id: "lr-001",
    rule: "Use `Flex` for horizontal/vertical layout before custom wrappers.",
    rationale: "Keeps spacing and alignment behavior consistent across products.",
  },
  {
    id: "lr-002",
    rule: "Use token spacing scale only (`--uds-spacing-*`) for gaps, margins, and padding.",
    rationale: "Prevents layout drift and enforces design rhythm.",
  },
  {
    id: "lr-003",
    rule: "Constrain readable content blocks to medium widths inside dense layouts.",
    rationale: "Improves scanability and reduces cognitive load.",
  },
  {
    id: "lr-004",
    rule: "Use `Divider` between semantic content sections, not as decorative separators.",
    rationale: "Keeps sectioning meaningful for both users and agents.",
  },
  {
    id: "lr-005",
    rule: "For app-level views, compose within `UDS` shell primitives.",
    rationale: "Preserves navigation, panel behavior, and brand/theme consistency.",
  },
];
