import type { PatternRegistryType } from "./types";

export const PatternRegistry: PatternRegistryType = {
  AuthForm: {
    name: "AuthForm",
    layout: "vertical",
    requiredComponents: ["Container", "Field", "TextInput", "Button", "Text"],
    structure: [
      { type: "Container", role: "container" },
      { type: "Text", role: "heading", props: { variant: "heading-24" } },
      { type: "Field", role: "email-field" },
      { type: "TextInput", role: "email-input", props: { type: "email" } },
      { type: "Field", role: "password-field" },
      { type: "TextInput", role: "password-input", props: { type: "password" } },
      { type: "Button", role: "primary-submit", props: { appearance: "primary" } },
    ],
    spacing: "--uds-spacing-16",
    widthConstraint: "var(--uds-spacing-480, 480px)",
    rules: {
      maxPrimaryActionsPerSection: 1,
      requiredFieldWrapper: true,
    },
  },
  ModalConfirmation: {
    name: "ModalConfirmation",
    layout: "vertical",
    requiredComponents: ["Modal", "Text", "Button"],
    structure: [
      { type: "Modal", role: "overlay" },
      { type: "Text", role: "title", props: { variant: "heading-20" } },
      { type: "Text", role: "body", props: { variant: "body-16" } },
      { type: "Button", role: "secondary-cancel", props: { appearance: "ghost" } },
      { type: "Button", role: "primary-confirm", props: { appearance: "primary" } },
    ],
    spacing: "--uds-spacing-16",
    widthConstraint: "var(--uds-spacing-640, 640px)",
    rules: {
      maxPrimaryActionsPerSection: 1,
      disallowNestedModal: true,
    },
  },
  DataTablePage: {
    name: "DataTablePage",
    layout: "vertical",
    requiredComponents: ["Container", "Text", "Table", "Pagination", "Button"],
    structure: [
      { type: "Container", role: "page-shell" },
      { type: "Flex", role: "header-row" },
      { type: "Text", role: "title", props: { variant: "heading-24" } },
      { type: "Button", role: "primary-page-action", props: { appearance: "primary" } },
      { type: "Table", role: "data-table" },
      { type: "Pagination", role: "table-pagination" },
    ],
    spacing: "--uds-spacing-24",
    widthConstraint: "100%",
    rules: {
      maxPrimaryActionsPerSection: 1,
      tableRequiresPaginationForLargeData: true,
    },
  },
  FilterPanel: {
    name: "FilterPanel",
    layout: "vertical",
    requiredComponents: ["Container", "Field", "Dropdown", "Datepicker", "Button"],
    structure: [
      { type: "Container", role: "panel" },
      { type: "Field", role: "status-filter" },
      { type: "Dropdown", role: "status-select" },
      { type: "Field", role: "date-filter" },
      { type: "Datepicker", role: "date-select" },
      { type: "Button", role: "apply-filters", props: { appearance: "primary" } },
    ],
    spacing: "--uds-spacing-12",
    widthConstraint: "var(--uds-spacing-320, 320px)",
    rules: {
      maxPrimaryActionsPerSection: 1,
      requiredFieldWrapper: true,
    },
  },
  DashboardSection: {
    name: "DashboardSection",
    layout: "grid",
    requiredComponents: ["Container", "Text", "Tag", "ProgressIndicator"],
    structure: [
      { type: "Container", role: "dashboard-container" },
      { type: "Flex", role: "section-header" },
      { type: "Text", role: "section-title", props: { variant: "heading-20" } },
      { type: "Container", role: "metric-card" },
      { type: "Tag", role: "metric-status" },
      { type: "ProgressIndicator", role: "metric-progress" },
    ],
    spacing: "--uds-spacing-16",
    widthConstraint: "100%",
    rules: {
      maxPrimaryActionsPerSection: 1,
      cardGridColumns: [1, 2, 3],
    },
  },
};
