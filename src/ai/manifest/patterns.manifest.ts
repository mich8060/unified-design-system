import type { PatternDefinition } from "./types";

export const PatternRegistry: Record<string, PatternDefinition> = {
  AuthForm: {
    layout: "vertical",
    requiredComponents: ["Container", "Card", "Text", "Field", "TextInput", "Button"],
    structure: [
      { type: "Container", role: "page" },
      { type: "Card", role: "auth-card" },
      { type: "Text", role: "heading" },
      { type: "Field", role: "email" },
      { type: "TextInput", role: "email-input", props: { type: "email" } },
      { type: "Field", role: "password" },
      { type: "TextInput", role: "password-input", props: { type: "password" } },
      { type: "Button", role: "submit", props: { appearance: "primary" } }
    ],
    spacing: "--uds-spacing-16",
    widthConstraint: "640px",
  },
  DataTablePage: {
    layout: "vertical",
    requiredComponents: ["Container", "Text", "Table", "Pagination", "Button"],
    structure: [
      { type: "Container", role: "page" },
      { type: "Text", role: "title" },
      { type: "Button", role: "primary-action", props: { appearance: "primary" } },
      { type: "Table", role: "table" },
      { type: "Pagination", role: "pagination" }
    ],
    spacing: "--uds-spacing-24",
    widthConstraint: "1280px",
  }
};
