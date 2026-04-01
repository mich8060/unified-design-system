import type { PatternDefinition } from "./types";

export const PatternRegistry: Record<string, PatternDefinition> = {
  AuthForm: {
    layout: "vertical",
    requiredComponents: ["Container", "Text", "Field", "TextInput", "Button", "Layout"],
    structure: [
      { type: "Container", role: "page" },
      { type: "Container", role: "auth-panel" },
      { type: "Text", role: "heading" },
      { type: "Field", role: "email" },
      { type: "TextInput", role: "email-input", props: { type: "email" } },
      { type: "Field", role: "password" },
      { type: "TextInput", role: "password-input", props: { type: "password" } },
      { type: "Layout", role: "actions-row" },
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
  },
  ModalConfirmation: {
    layout: "vertical",
    requiredComponents: ["Modal", "Text", "Button"],
    structure: [
      { type: "Modal", role: "overlay" },
      { type: "Text", role: "title" },
      { type: "Text", role: "body" },
      { type: "Button", role: "secondary-cancel", props: { appearance: "ghost" } },
      { type: "Button", role: "primary-confirm", props: { appearance: "primary" } }
    ],
    spacing: "--uds-spacing-16",
    widthConstraint: "640px",
  },
  FilterPanel: {
    layout: "vertical",
    requiredComponents: ["Container", "Field", "Dropdown", "Datepicker", "Button"],
    structure: [
      { type: "Container", role: "filter-panel" },
      { type: "Field", role: "status-filter" },
      { type: "Dropdown", role: "status-control" },
      { type: "Field", role: "date-filter" },
      { type: "Datepicker", role: "date-control" },
      { type: "Button", role: "apply-filters", props: { appearance: "primary" } }
    ],
    spacing: "--uds-spacing-12",
    widthConstraint: "320px",
  },
  DashboardSection: {
    layout: "grid",
    requiredComponents: ["Container", "Text", "Tag", "ProgressIndicator"],
    structure: [
      { type: "Container", role: "section-container" },
      { type: "Text", role: "section-title" },
      { type: "Tag", role: "status-tag" },
      { type: "ProgressIndicator", role: "section-progress" }
    ],
    spacing: "--uds-spacing-16",
    widthConstraint: "100%",
  },
  AppShellDashboard: {
    layout: "vertical",
    requiredComponents: ["AppShell", "Menu", "Toolbar", "Container", "Statistics", "Table"],
    structure: [
      { type: "AppShell", role: "app-shell" },
      { type: "Menu", role: "primary-navigation" },
      { type: "Toolbar", role: "page-toolbar" },
      { type: "Container", role: "page-container" },
      { type: "Statistics", role: "kpi-row" },
      { type: "Table", role: "content-table" }
    ],
    spacing: "--uds-spacing-24",
    widthConstraint: "100%",
  },
  SettingsWorkspace: {
    layout: "horizontal",
    requiredComponents: ["Container", "Tabs", "Layout", "Field", "TextInput", "Button"],
    structure: [
      { type: "Container", role: "settings-page" },
      { type: "Tabs", role: "settings-tabs" },
      { type: "Layout", role: "settings-columns" },
      { type: "Container", role: "settings-panel" },
      { type: "Field", role: "settings-field" },
      { type: "TextInput", role: "settings-input", props: { type: "text" } },
      { type: "Button", role: "save-settings", props: { appearance: "primary" } }
    ],
    spacing: "--uds-spacing-24",
    widthConstraint: "100%",
  },
  WizardChecklist: {
    layout: "horizontal",
    requiredComponents: ["Container", "Checklist", "Field", "TextInput", "Button", "Layout"],
    structure: [
      { type: "Container", role: "wizard-page" },
      { type: "Checklist", role: "wizard-progress" },
      { type: "Container", role: "wizard-step-panel" },
      { type: "Field", role: "step-field" },
      { type: "TextInput", role: "step-input", props: { type: "text" } },
      { type: "Layout", role: "step-actions" },
      { type: "Button", role: "step-continue", props: { appearance: "primary" } }
    ],
    spacing: "--uds-spacing-20",
    widthConstraint: "100%",
  },
  CalendarPlanningPage: {
    layout: "vertical",
    requiredComponents: ["Container", "Toolbar", "Calendar", "EventCard", "Button"],
    structure: [
      { type: "Container", role: "calendar-page" },
      { type: "Toolbar", role: "calendar-toolbar" },
      { type: "Calendar", role: "calendar-grid" },
      { type: "EventCard", role: "event-summary" },
      { type: "Button", role: "calendar-primary-action", props: { appearance: "primary" } }
    ],
    spacing: "--uds-spacing-16",
    widthConstraint: "100%",
  },
  AnalyticsOverview: {
    layout: "grid",
    requiredComponents: ["Container", "Toolbar", "Statistics", "Table", "Pagination", "Layout"],
    structure: [
      { type: "Container", role: "analytics-page" },
      { type: "Toolbar", role: "analytics-toolbar" },
      { type: "Statistics", role: "analytics-kpis" },
      { type: "Layout", role: "analytics-summary-row" },
      { type: "Table", role: "analytics-table" },
      { type: "Pagination", role: "analytics-pagination" }
    ],
    spacing: "--uds-spacing-24",
    widthConstraint: "100%",
  }
};
