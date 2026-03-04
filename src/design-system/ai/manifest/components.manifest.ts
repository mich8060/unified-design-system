import type { ComponentManifestItem, ComponentRegistryType } from "./types";

interface ComponentSeed {
  name: string;
  category: string;
  intent: string;
  variants?: string[];
  sizes?: string[];
  priority?: string;
  preferredContexts: string[];
  maxPerSection?: number;
  tokenDependencies?: string[];
  accessibilityRole?: string;
  keyboardSupport?: string[];
  slots?: ComponentManifestItem["slots"];
  constraints?: ComponentManifestItem["constraints"];
}

const defaultsForCategory = (category: string): string[] => {
  if (category === "form") return ["--uds-spacing-8", "--uds-spacing-12", "--uds-color-neutral-700", "--uds-color-blue-600"];
  if (category === "feedback") return ["--uds-spacing-8", "--uds-color-green-600", "--uds-color-red-600"];
  if (category === "layout") return ["--uds-spacing-16", "--uds-spacing-24", "--uds-radius-8"];
  if (category === "navigation") return ["--uds-spacing-8", "--uds-color-neutral-600", "--uds-color-blue-600"];
  return ["--uds-spacing-8", "--uds-color-neutral-700", "--uds-radius-8"];
};

const buildItem = (seed: ComponentSeed): ComponentManifestItem => ({
  name: seed.name,
  category: seed.category,
  intent: seed.intent,
  priority: seed.priority,
  variants: seed.variants ?? [],
  sizes: seed.sizes,
  slots: seed.slots,
  usage: {
    preferredContexts: seed.preferredContexts,
    maxPerSection: seed.maxPerSection,
  },
  constraints: seed.constraints,
  accessibility: {
    role: seed.accessibilityRole ?? "group",
    keyboardSupport: seed.keyboardSupport ?? ["Tab"],
  },
  tokenDependencies: seed.tokenDependencies ?? defaultsForCategory(seed.category),
});

const componentSeeds: ComponentSeed[] = [
  { name: "Accordion", category: "layout", intent: "Progressive disclosure for grouped content.", preferredContexts: ["settings", "details"], accessibilityRole: "region" },
  { name: "ActionMenu", category: "navigation", intent: "Contextual action list for row/item actions.", preferredContexts: ["tables", "cards"], accessibilityRole: "menu", keyboardSupport: ["Tab", "Enter", "ArrowUp", "ArrowDown", "Escape"] },
  { name: "AppShell", category: "layout", intent: "Top-level application shell composition.", preferredContexts: ["app-root"], maxPerSection: 1, tokenDependencies: ["--uds-spacing-16", "--uds-color-neutral-50", "--uds-elevation-overlay"], accessibilityRole: "application" },
  { name: "Avatar", category: "data-display", intent: "Represent people or entities with image/initials.", preferredContexts: ["lists", "tables", "headers"], accessibilityRole: "img" },
  { name: "Badge", category: "data-display", intent: "Small count/status indicator.", preferredContexts: ["notifications", "tabs"], maxPerSection: 6 },
  { name: "Branding", category: "branding", intent: "Brand identity lockup and context marker.", preferredContexts: ["navigation", "headers"], maxPerSection: 1 },
  { name: "Breadcrumb", category: "navigation", intent: "Hierarchy-aware page context trail.", preferredContexts: ["page-header"], maxPerSection: 1, accessibilityRole: "navigation" },
  { name: "Button", category: "action", intent: "Primary and secondary user actions.", preferredContexts: ["forms", "toolbars", "dialogs"], constraints: { onlyOnePrimaryPerSection: true }, tokenDependencies: ["--uds-spacing-8", "--uds-spacing-12", "--uds-color-blue-600", "--uds-color-red-600", "--uds-radius-8"], accessibilityRole: "button", keyboardSupport: ["Tab", "Enter", "Space"] },
  { name: "Calendar", category: "form", intent: "Calendar date grid interactions.", preferredContexts: ["scheduling", "date-selection"] },
  { name: "Card", category: "layout", intent: "Contained content region with optional actions.", preferredContexts: ["dashboards", "details"] },
  { name: "Checkbox", category: "form", intent: "Multi-select boolean control.", preferredContexts: ["forms", "filters"], accessibilityRole: "checkbox", keyboardSupport: ["Tab", "Space"] },
  { name: "Chip", category: "form", intent: "Compact selectable/taggable item.", preferredContexts: ["filters", "tags"], maxPerSection: 12, accessibilityRole: "button" },
  { name: "Code", category: "data-display", intent: "Formatted code snippet display.", preferredContexts: ["documentation", "developer-tools"], tokenDependencies: ["--uds-spacing-12", "--uds-color-neutral-900", "--uds-radius-8"] },
  { name: "Container", category: "layout", intent: "Consistent page/content width boundaries.", preferredContexts: ["page-layout"], maxPerSection: 1 },
  { name: "Datepicker", category: "form", intent: "Date selection input control.", preferredContexts: ["forms", "filters"], accessibilityRole: "combobox", keyboardSupport: ["Tab", "Enter", "ArrowDown"] },
  { name: "Dialog", category: "feedback", intent: "Structured dialog surface with actions.", preferredContexts: ["confirmations", "warnings"], maxPerSection: 1, accessibilityRole: "dialog", keyboardSupport: ["Tab", "Escape", "Enter"] },
  { name: "Divider", category: "layout", intent: "Semantic separation between sections.", preferredContexts: ["page-sections", "cards"] },
  { name: "DotStatus", category: "data-display", intent: "Compact status indicator dot.", preferredContexts: ["tables", "status-lists"] },
  { name: "Dropdown", category: "form", intent: "Select-style single choice control.", preferredContexts: ["forms", "filters"], accessibilityRole: "combobox", keyboardSupport: ["Tab", "Enter", "ArrowDown"] },
  { name: "EmptyState", category: "feedback", intent: "Empty data guidance and next action.", preferredContexts: ["tables", "search-results"], maxPerSection: 1 },
  { name: "EventCard", category: "data-display", intent: "Event summary card with key metadata.", preferredContexts: ["scheduling", "timelines"] },
  { name: "Field", category: "form", intent: "Label/helper/error wrapper for form controls.", preferredContexts: ["forms"], slots: { control: { required: true, description: "Input-like child control." }, helper: { required: false }, error: { required: false } }, tokenDependencies: ["--uds-spacing-8", "--uds-spacing-12", "--uds-color-neutral-700", "--uds-color-red-600"], accessibilityRole: "group" },
  { name: "FileUpload", category: "form", intent: "Upload surface for file selection/drop.", preferredContexts: ["forms", "document-intake"] },
  { name: "Flex", category: "layout", intent: "Primary layout utility for component composition.", preferredContexts: ["all-layouts"], maxPerSection: 999, tokenDependencies: ["--uds-spacing-8", "--uds-spacing-16", "--uds-spacing-24"] },
  { name: "Icon", category: "data-display", intent: "Consistent icon rendering wrapper.", preferredContexts: ["buttons", "status", "navigation"], tokenDependencies: ["--uds-color-neutral-700", "--uds-color-blue-600"], accessibilityRole: "img" },
  { name: "ImageAspect", category: "layout", intent: "Image with deterministic aspect ratio.", preferredContexts: ["cards", "media"] },
  { name: "Input", category: "form", intent: "Alias for TextInput control.", preferredContexts: ["forms"], accessibilityRole: "textbox", keyboardSupport: ["Tab"] },
  { name: "Key", category: "data-display", intent: "Keyboard shortcut visual token.", preferredContexts: ["help", "tooltips"] },
  { name: "Menu", category: "navigation", intent: "Main app navigation rail/menu.", preferredContexts: ["app-shell"], maxPerSection: 1, accessibilityRole: "navigation", keyboardSupport: ["Tab", "Enter", "ArrowUp", "ArrowDown"] },
  { name: "MicroCalendar", category: "data-display", intent: "Compact calendar visualization.", preferredContexts: ["dashboards", "side-panels"] },
  { name: "Modal", category: "feedback", intent: "Blocking focus-trap overlay with actions.", preferredContexts: ["confirmations", "forms"], maxPerSection: 1, constraints: { disallowedChildren: ["Modal"] }, tokenDependencies: ["--uds-elevation-overlay", "--uds-spacing-16", "--uds-radius-12"], accessibilityRole: "dialog", keyboardSupport: ["Tab", "Escape", "Enter"] },
  { name: "Pagination", category: "navigation", intent: "Navigate paged dataset slices.", preferredContexts: ["tables", "list-pages"], maxPerSection: 1, accessibilityRole: "navigation" },
  { name: "ProgressCircle", category: "data-display", intent: "Circular completion progress indicator.", preferredContexts: ["status", "dashboard"] },
  { name: "ProgressIndicator", category: "data-display", intent: "Linear progress indicator.", preferredContexts: ["loaders", "step-flows"] },
  { name: "Radio", category: "form", intent: "Single-select option control.", preferredContexts: ["forms", "filters"], accessibilityRole: "radio", keyboardSupport: ["Tab", "ArrowUp", "ArrowDown", "Space"] },
  { name: "Slider", category: "form", intent: "Bounded numeric range control.", preferredContexts: ["filters", "settings"], accessibilityRole: "slider", keyboardSupport: ["Tab", "ArrowLeft", "ArrowRight"] },
  { name: "Status", category: "data-display", intent: "Text + status color indicator.", preferredContexts: ["tables", "cards"] },
  { name: "Steps", category: "navigation", intent: "Multi-step flow progress tracker.", preferredContexts: ["wizards", "onboarding"], maxPerSection: 1 },
  { name: "Table", category: "data-display", intent: "Structured multi-column data presentation.", preferredContexts: ["admin", "reporting"], maxPerSection: 1, slots: { row: { required: true }, cell: { required: true }, header: { required: true } }, tokenDependencies: ["--uds-spacing-8", "--uds-spacing-12", "--uds-color-neutral-100", "--uds-color-neutral-700"], accessibilityRole: "table", keyboardSupport: ["Tab", "ArrowUp", "ArrowDown"] },
  { name: "Tabs", category: "navigation", intent: "Switch between peer content panels.", preferredContexts: ["details", "settings"], maxPerSection: 1, accessibilityRole: "tablist", keyboardSupport: ["Tab", "ArrowLeft", "ArrowRight", "Enter"] },
  { name: "Tag", category: "data-display", intent: "Categorical metadata marker.", preferredContexts: ["tables", "cards"], maxPerSection: 10 },
  { name: "Text", category: "data-display", intent: "Semantic typography primitive.", preferredContexts: ["all-content"], maxPerSection: 999 },
  { name: "TextInput", category: "form", intent: "Single-line text entry control.", preferredContexts: ["forms", "search"], accessibilityRole: "textbox", keyboardSupport: ["Tab"] },
  { name: "Textarea", category: "form", intent: "Multi-line text entry control.", preferredContexts: ["forms"], accessibilityRole: "textbox", keyboardSupport: ["Tab"] },
  { name: "Toast", category: "feedback", intent: "Transient non-blocking notification.", preferredContexts: ["system-feedback"], maxPerSection: 3, constraints: { disallowedChildren: ["Modal", "Dialog"] }, accessibilityRole: "status" },
  { name: "Toggle", category: "form", intent: "Binary on/off switch control.", preferredContexts: ["settings", "filters"], accessibilityRole: "switch", keyboardSupport: ["Tab", "Space"] },
  { name: "Tooltip", category: "feedback", intent: "Contextual hover/focus helper text.", preferredContexts: ["dense-actions", "icons"], maxPerSection: 12, accessibilityRole: "tooltip" },
];

export const ComponentRegistry: ComponentRegistryType = Object.fromEntries(
  componentSeeds.map((seed) => [seed.name, buildItem(seed)])
);
