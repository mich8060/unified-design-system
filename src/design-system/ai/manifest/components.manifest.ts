import { AccordionSpec } from "../../components/Accordion/Accordion.spec";
import { ActionMenuSpec } from "../../components/ActionMenu/ActionMenu.spec";
import { AvatarSpec } from "../../components/Avatar/Avatar.spec";
import { BadgeSpec } from "../../components/Badge/Badge.spec";
import { BrandingSpec } from "../../components/Branding/Branding.spec";
import { BreadcrumbSpec } from "../../components/Breadcrumb/Breadcrumb.spec";
import { ButtonSpec } from "../../components/Button/Button.spec";
import { CalendarSpec } from "../../components/Calendar/Calendar.spec";
import { CardSpec } from "../../components/Card/Card.spec";
import { CheckboxSpec } from "../../components/Checkbox/Checkbox.spec";
import { ChipSpec } from "../../components/Chip/Chip.spec";
import { CodeSpec } from "../../components/Code/Code.spec";
import { ContainerSpec } from "../../components/Container/Container.spec";
import { DatepickerSpec } from "../../components/Datepicker/Datepicker.spec";
import { DialogSpec } from "../../components/Dialog/Dialog.spec";
import { DividerSpec } from "../../components/Divider/Divider.spec";
import { DotStatusSpec } from "../../components/DotStatus/DotStatus.spec";
import { DropdownSpec } from "../../components/Dropdown/Dropdown.spec";
import { EmptyStateSpec } from "../../components/EmptyState/EmptyState.spec";
import { EventCardSpec } from "../../components/EventCard/EventCard.spec";
import { FieldSpec } from "../../components/Field/Field.spec";
import { FileUploadSpec } from "../../components/FileUpload/FileUpload.spec";
import { FlexSpec } from "../../components/Flex/Flex.spec";
import { IconSpec } from "../../components/Icon/Icon.spec";
import { ImageAspectSpec } from "../../components/ImageAspect/ImageAspect.spec";
import { KeySpec } from "../../components/Key/Key.spec";
import { MenuSpec } from "../../components/Menu/Menu.spec";
import { MicroCalendarSpec } from "../../components/MicroCalendar/MicroCalendar.spec";
import { ModalSpec } from "../../components/Modal/Modal.spec";
import { PaginationSpec } from "../../components/Pagination/Pagination.spec";
import { PillToggleSpec } from "../../components/PillToggle/PillToggle.spec";
import { PlaygroundSpec } from "../../components/Playground/Playground.spec";
import { ProgressCircleSpec } from "../../components/ProgressCircle/ProgressCircle.spec";
import { ProgressIndicatorSpec } from "../../components/ProgressIndicator/ProgressIndicator.spec";
import { RadioSpec } from "../../components/Radio/Radio.spec";
import { SliderSpec } from "../../components/Slider/Slider.spec";
import { StatusSpec } from "../../components/Status/Status.spec";
import { StepsSpec } from "../../components/Steps/Steps.spec";
import { TableSpec } from "../../components/Table/Table.spec";
import { TabsSpec } from "../../components/Tabs/Tabs.spec";
import { TagSpec } from "../../components/Tag/Tag.spec";
import { TextSpec } from "../../components/Text/Text.spec";
import { TextInputSpec } from "../../components/TextInput/TextInput.spec";
import { TextareaSpec } from "../../components/Textarea/Textarea.spec";
import { ToastSpec } from "../../components/Toast/Toast.spec";
import { ToggleSpec } from "../../components/Toggle/Toggle.spec";
import { TooltipSpec } from "../../components/Tooltip/Tooltip.spec";
import type { ComponentManifestItem, ComponentRegistryType } from "./types";

type SpecLike = { allowedVariants?: Record<string, readonly string[]> };

interface ComponentSeed {
  name: string;
  category: string;
  intent: string;
  spec?: SpecLike;
  priority?: string;
  preferredContexts: string[];
  maxPerSection?: number;
  tokenDependencies?: string[];
  accessibilityRole?: string;
  keyboardSupport?: string[];
  slots?: ComponentManifestItem["slots"];
  constraints?: ComponentManifestItem["constraints"];
}

const getVariants = (spec?: SpecLike): string[] => Object.keys(spec?.allowedVariants ?? {});
const getSizes = (spec?: SpecLike): string[] | undefined => {
  const values = spec?.allowedVariants?.size;
  return values ? [...values] : undefined;
};

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
  variants: getVariants(seed.spec),
  sizes: getSizes(seed.spec),
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
  { name: "Accordion", category: "layout", intent: "Progressive disclosure for grouped content.", spec: AccordionSpec, preferredContexts: ["settings", "details"], accessibilityRole: "region" },
  { name: "ActionMenu", category: "navigation", intent: "Contextual action list for row/item actions.", spec: ActionMenuSpec, preferredContexts: ["tables", "cards"], accessibilityRole: "menu", keyboardSupport: ["Tab", "Enter", "ArrowUp", "ArrowDown", "Escape"] },
  { name: "AppShell", category: "layout", intent: "Top-level application shell composition.", preferredContexts: ["app-root"], maxPerSection: 1, tokenDependencies: ["--uds-spacing-16", "--uds-color-neutral-50", "--uds-elevation-overlay"], accessibilityRole: "application" },
  { name: "Avatar", category: "data-display", intent: "Represent people or entities with image/initials.", spec: AvatarSpec, preferredContexts: ["lists", "tables", "headers"], accessibilityRole: "img" },
  { name: "Badge", category: "data-display", intent: "Small count/status indicator.", spec: BadgeSpec, preferredContexts: ["notifications", "tabs"], maxPerSection: 6 },
  { name: "Branding", category: "branding", intent: "Brand identity lockup and context marker.", spec: BrandingSpec, preferredContexts: ["navigation", "headers"], maxPerSection: 1 },
  { name: "Breadcrumb", category: "navigation", intent: "Hierarchy-aware page context trail.", spec: BreadcrumbSpec, preferredContexts: ["page-header"], maxPerSection: 1, accessibilityRole: "navigation" },
  { name: "Button", category: "action", intent: "Primary and secondary user actions.", spec: ButtonSpec, preferredContexts: ["forms", "toolbars", "dialogs"], constraints: { onlyOnePrimaryPerSection: true }, tokenDependencies: ["--uds-spacing-8", "--uds-spacing-12", "--uds-color-blue-600", "--uds-color-red-600", "--uds-radius-8"], accessibilityRole: "button", keyboardSupport: ["Tab", "Enter", "Space"] },
  { name: "Calendar", category: "form", intent: "Calendar date grid interactions.", spec: CalendarSpec, preferredContexts: ["scheduling", "date-selection"] },
  { name: "Card", category: "layout", intent: "Contained content region with optional actions.", spec: CardSpec, preferredContexts: ["dashboards", "details"] },
  { name: "Checkbox", category: "form", intent: "Multi-select boolean control.", spec: CheckboxSpec, preferredContexts: ["forms", "filters"], accessibilityRole: "checkbox", keyboardSupport: ["Tab", "Space"] },
  { name: "Chip", category: "form", intent: "Compact selectable/taggable item.", spec: ChipSpec, preferredContexts: ["filters", "tags"], maxPerSection: 12, accessibilityRole: "button" },
  { name: "Code", category: "data-display", intent: "Formatted code snippet display.", spec: CodeSpec, preferredContexts: ["documentation", "developer-tools"], tokenDependencies: ["--uds-spacing-12", "--uds-color-neutral-900", "--uds-radius-8"] },
  { name: "Container", category: "layout", intent: "Consistent page/content width boundaries.", spec: ContainerSpec, preferredContexts: ["page-layout"], maxPerSection: 1 },
  { name: "Datepicker", category: "form", intent: "Date selection input control.", spec: DatepickerSpec, preferredContexts: ["forms", "filters"], accessibilityRole: "combobox", keyboardSupport: ["Tab", "Enter", "ArrowDown"] },
  { name: "Dialog", category: "feedback", intent: "Structured dialog surface with actions.", spec: DialogSpec, preferredContexts: ["confirmations", "warnings"], maxPerSection: 1, accessibilityRole: "dialog", keyboardSupport: ["Tab", "Escape", "Enter"] },
  { name: "Divider", category: "layout", intent: "Semantic separation between sections.", spec: DividerSpec, preferredContexts: ["page-sections", "cards"] },
  { name: "DotStatus", category: "data-display", intent: "Compact status indicator dot.", spec: DotStatusSpec, preferredContexts: ["tables", "status-lists"] },
  { name: "Dropdown", category: "form", intent: "Select-style single choice control.", spec: DropdownSpec, preferredContexts: ["forms", "filters"], accessibilityRole: "combobox", keyboardSupport: ["Tab", "Enter", "ArrowDown"] },
  { name: "EmptyState", category: "feedback", intent: "Empty data guidance and next action.", spec: EmptyStateSpec, preferredContexts: ["tables", "search-results"], maxPerSection: 1 },
  { name: "EventCard", category: "data-display", intent: "Event summary card with key metadata.", spec: EventCardSpec, preferredContexts: ["scheduling", "timelines"] },
  { name: "Field", category: "form", intent: "Label/helper/error wrapper for form controls.", spec: FieldSpec, preferredContexts: ["forms"], slots: { control: { required: true, description: "Input-like child control." }, helper: { required: false }, error: { required: false } }, tokenDependencies: ["--uds-spacing-8", "--uds-spacing-12", "--uds-color-neutral-700", "--uds-color-red-600"], accessibilityRole: "group" },
  { name: "FileUpload", category: "form", intent: "Upload surface for file selection/drop.", spec: FileUploadSpec, preferredContexts: ["forms", "document-intake"] },
  { name: "Flex", category: "layout", intent: "Primary layout utility for component composition.", spec: FlexSpec, preferredContexts: ["all-layouts"], maxPerSection: 999, tokenDependencies: ["--uds-spacing-8", "--uds-spacing-16", "--uds-spacing-24"] },
  { name: "Icon", category: "data-display", intent: "Consistent icon rendering wrapper.", spec: IconSpec, preferredContexts: ["buttons", "status", "navigation"], tokenDependencies: ["--uds-color-neutral-700", "--uds-color-blue-600"], accessibilityRole: "img" },
  { name: "ImageAspect", category: "layout", intent: "Image with deterministic aspect ratio.", spec: ImageAspectSpec, preferredContexts: ["cards", "media"] },
  { name: "Input", category: "form", intent: "Alias for TextInput control.", spec: TextInputSpec, preferredContexts: ["forms"], accessibilityRole: "textbox", keyboardSupport: ["Tab"] },
  { name: "Key", category: "data-display", intent: "Keyboard shortcut visual token.", spec: KeySpec, preferredContexts: ["help", "tooltips"] },
  { name: "Menu", category: "navigation", intent: "Main app navigation rail/menu.", spec: MenuSpec, preferredContexts: ["app-shell"], maxPerSection: 1, accessibilityRole: "navigation", keyboardSupport: ["Tab", "Enter", "ArrowUp", "ArrowDown"] },
  { name: "MicroCalendar", category: "data-display", intent: "Compact calendar visualization.", spec: MicroCalendarSpec, preferredContexts: ["dashboards", "side-panels"] },
  { name: "Modal", category: "feedback", intent: "Blocking focus-trap overlay with actions.", spec: ModalSpec, preferredContexts: ["confirmations", "forms"], maxPerSection: 1, constraints: { disallowedChildren: ["Modal"] }, tokenDependencies: ["--uds-elevation-overlay", "--uds-spacing-16", "--uds-radius-12"], accessibilityRole: "dialog", keyboardSupport: ["Tab", "Escape", "Enter"] },
  { name: "Pagination", category: "navigation", intent: "Navigate paged dataset slices.", spec: PaginationSpec, preferredContexts: ["tables", "list-pages"], maxPerSection: 1, accessibilityRole: "navigation" },
  { name: "PillToggle", category: "form", intent: "Mutually exclusive segmented selector.", spec: PillToggleSpec, preferredContexts: ["filters", "views"], accessibilityRole: "tablist", keyboardSupport: ["Tab", "ArrowLeft", "ArrowRight", "Enter"] },
  { name: "Playground", category: "layout", intent: "Interactive experimentation surface.", spec: PlaygroundSpec, preferredContexts: ["docs", "internal-tools"] },
  { name: "ProgressCircle", category: "data-display", intent: "Circular completion progress indicator.", spec: ProgressCircleSpec, preferredContexts: ["status", "dashboard"] },
  { name: "ProgressIndicator", category: "data-display", intent: "Linear progress indicator.", spec: ProgressIndicatorSpec, preferredContexts: ["loaders", "step-flows"] },
  { name: "Radio", category: "form", intent: "Single-select option control.", spec: RadioSpec, preferredContexts: ["forms", "filters"], accessibilityRole: "radio", keyboardSupport: ["Tab", "ArrowUp", "ArrowDown", "Space"] },
  { name: "Slider", category: "form", intent: "Bounded numeric range control.", spec: SliderSpec, preferredContexts: ["filters", "settings"], accessibilityRole: "slider", keyboardSupport: ["Tab", "ArrowLeft", "ArrowRight"] },
  { name: "Status", category: "data-display", intent: "Text + status color indicator.", spec: StatusSpec, preferredContexts: ["tables", "cards"] },
  { name: "Steps", category: "navigation", intent: "Multi-step flow progress tracker.", spec: StepsSpec, preferredContexts: ["wizards", "onboarding"], maxPerSection: 1 },
  { name: "Table", category: "data-display", intent: "Structured multi-column data presentation.", spec: TableSpec, preferredContexts: ["admin", "reporting"], maxPerSection: 1, slots: { row: { required: true }, cell: { required: true }, header: { required: true } }, tokenDependencies: ["--uds-spacing-8", "--uds-spacing-12", "--uds-color-neutral-100", "--uds-color-neutral-700"], accessibilityRole: "table", keyboardSupport: ["Tab", "ArrowUp", "ArrowDown"] },
  { name: "Tabs", category: "navigation", intent: "Switch between peer content panels.", spec: TabsSpec, preferredContexts: ["details", "settings"], maxPerSection: 1, accessibilityRole: "tablist", keyboardSupport: ["Tab", "ArrowLeft", "ArrowRight", "Enter"] },
  { name: "Tag", category: "data-display", intent: "Categorical metadata marker.", spec: TagSpec, preferredContexts: ["tables", "cards"], maxPerSection: 10 },
  { name: "Text", category: "data-display", intent: "Semantic typography primitive.", spec: TextSpec, preferredContexts: ["all-content"], maxPerSection: 999 },
  { name: "TextInput", category: "form", intent: "Single-line text entry control.", spec: TextInputSpec, preferredContexts: ["forms", "search"], accessibilityRole: "textbox", keyboardSupport: ["Tab"] },
  { name: "Textarea", category: "form", intent: "Multi-line text entry control.", spec: TextareaSpec, preferredContexts: ["forms"], accessibilityRole: "textbox", keyboardSupport: ["Tab"] },
  { name: "Toast", category: "feedback", intent: "Transient non-blocking notification.", spec: ToastSpec, preferredContexts: ["system-feedback"], maxPerSection: 3, constraints: { disallowedChildren: ["Modal", "Dialog"] }, accessibilityRole: "status" },
  { name: "Toggle", category: "form", intent: "Binary on/off switch control.", spec: ToggleSpec, preferredContexts: ["settings", "filters"], accessibilityRole: "switch", keyboardSupport: ["Tab", "Space"] },
  { name: "Tooltip", category: "feedback", intent: "Contextual hover/focus helper text.", spec: TooltipSpec, preferredContexts: ["dense-actions", "icons"], maxPerSection: 12, accessibilityRole: "tooltip" },
];

export const ComponentRegistry: ComponentRegistryType = Object.fromEntries(
  componentSeeds.map((seed) => [seed.name, buildItem(seed)])
);
