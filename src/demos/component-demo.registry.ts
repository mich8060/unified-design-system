export interface ComponentDemoDefinition {
  slug: string;
  label: string;
  category: "components";
  kind: "module" | "placeholder";
  moduleFile?: string;
  exportName?: string;
  placeholderName?: string;
}

const moduleDemo = (
  slug: string,
  label: string,
  moduleFile: string,
  exportName: string
): ComponentDemoDefinition => ({
  slug,
  label,
  category: "components",
  kind: "module",
  moduleFile,
  exportName,
});

const placeholderDemo = (
  slug: string,
  label: string,
  placeholderName: string
): ComponentDemoDefinition => ({
  slug,
  label,
  category: "components",
  kind: "placeholder",
  placeholderName,
});

export const COMPONENT_DEMOS: readonly ComponentDemoDefinition[] = [
  moduleDemo("accordion", "Accordion", "AccordionDemoPage", "AccordionDemoPage"),
  moduleDemo("action-menu", "ActionMenu", "ActionMenuDemoPage", "ActionMenuDemoPage"),
  moduleDemo("app-shell", "AppShell", "AppShellDemoPage", "AppShellDemoPage"),
  moduleDemo("avatar", "Avatar", "AvatarDemoPage", "AvatarDemoPage"),
  moduleDemo("badge", "Badge", "BadgeDemoPage", "BadgeDemoPage"),
  moduleDemo("branding", "Branding", "BrandingDemoPage", "BrandingDemoPage"),
  placeholderDemo("breadcrumb", "Breadcrumb", "Breadcrumb"),
  moduleDemo("button", "Button", "ButtonDemoPage", "ButtonDemoPage"),
  moduleDemo("button-group", "ButtonGroup", "ButtonGroupDemoPage", "ButtonGroupDemoPage"),
  placeholderDemo("calendar", "Calendar", "Calendar"),
  moduleDemo("checkbox", "Checkbox", "CheckboxDemoPage", "CheckboxDemoPage"),
  moduleDemo("checkbox-group", "CheckboxGroup", "CheckboxGroupDemoPage", "CheckboxGroupDemoPage"),
  placeholderDemo("chip", "Chip", "Chip"),
  placeholderDemo("code", "Code", "Code"),
  moduleDemo("container", "Container", "ContainerDemoPage", "ContainerDemoPage"),
  moduleDemo("currency-input", "CurrencyInput", "CurrencyInputDemoPage", "CurrencyInputDemoPage"),
  moduleDemo("date-input", "DateInput", "DateInputDemoPage", "DateInputDemoPage"),
  moduleDemo("date-range-input", "DateRangeInput", "DateRangeInputDemoPage", "DateRangeInputDemoPage"),
  placeholderDemo("datepicker", "Datepicker", "Datepicker"),
  moduleDemo("description-list", "DescriptionList", "DescriptionListDemoPage", "DescriptionListDemoPage"),
  placeholderDemo("dialog", "Dialog", "Dialog"),
  moduleDemo("divider", "Divider", "DividerDemoPage", "DividerDemoPage"),
  placeholderDemo("dot-status", "DotStatus", "DotStatus"),
  placeholderDemo("dropdown", "Dropdown", "Dropdown"),
  placeholderDemo("empty-state", "EmptyState", "EmptyState"),
  placeholderDemo("event-card", "EventCard", "EventCard"),
  moduleDemo("field", "Field", "FieldDemoPage", "FieldDemoPage"),
  moduleDemo("file-upload", "FileUpload", "FileUploadDemoPage", "FileUploadDemoPage"),
  moduleDemo("flex", "Flex", "LayoutDemoPage", "LayoutDemoPage"),
  placeholderDemo("image-aspect", "ImageAspect", "ImageAspect"),
  moduleDemo("icon", "Icon", "IconDemoPage", "IconDemoPage"),
  placeholderDemo("key", "Key", "Key"),
  moduleDemo("layout", "Layout", "LayoutDemoPage", "LayoutDemoPage"),
  placeholderDemo("link", "Link", "Link"),
  moduleDemo("medallion", "Medallion", "MedallionDemoPage", "MedallionDemoPage"),
  moduleDemo("menu", "Menu", "MenuDemoPage", "MenuDemoPage"),
  placeholderDemo("micro-calendar", "MicroCalendar", "MicroCalendar"),
  moduleDemo("modal", "Modal", "ModalDemoPage", "ModalDemoPage"),
  placeholderDemo("number-input", "NumberInput", "NumberInput"),
  moduleDemo("pagination", "Pagination", "PaginationDemoPage", "PaginationDemoPage"),
  moduleDemo("password-input", "PasswordInput", "PasswordInputDemoPage", "PasswordInputDemoPage"),
  moduleDemo("phone-input", "PhoneInput", "PhoneInputDemoPage", "PhoneInputDemoPage"),
  placeholderDemo("progress-circle", "ProgressCircle", "ProgressCircle"),
  moduleDemo(
    "progress-indicator",
    "ProgressIndicator",
    "ProgressIndicatorDemoPage",
    "ProgressIndicatorDemoPage"
  ),
  placeholderDemo("radio", "Radio", "Radio"),
  moduleDemo("radio-group", "RadioGroup", "RadioGroupDemoPage", "RadioGroupDemoPage"),
  moduleDemo("search-input", "SearchInput", "SearchInputDemoPage", "SearchInputDemoPage"),
  moduleDemo("scroll-view", "ScrollView", "ScrollViewDemoPage", "ScrollViewDemoPage"),
  moduleDemo("section-header", "SectionHeader", "SectionHeaderDemoPage", "SectionHeaderDemoPage"),
  moduleDemo("selectable-card", "SelectableCard", "SelectableCardDemoPage", "SelectableCardDemoPage"),
  moduleDemo("slider", "Slider", "SliderDemoPage", "SliderDemoPage"),
  moduleDemo("status", "Status", "StatusDemoPage", "StatusDemoPage"),
  moduleDemo("statistics", "Statistics", "StatisticsDemoPage", "StatisticsDemoPage"),
  placeholderDemo("steps", "Steps", "Steps"),
  moduleDemo("tabs", "Tabs", "TabsDemoPage", "TabsDemoPage"),
  moduleDemo("tag", "Tag", "TagDemoPage", "TagDemoPage"),
  moduleDemo("table", "Table", "TableDemoPage", "TableDemoPage"),
  moduleDemo("text", "Text", "TextDemoPage", "TextDemoPage"),
  moduleDemo("text-input", "TextInput", "TextInputDemoPage", "TextInputDemoPage"),
  placeholderDemo("textarea", "Textarea", "Textarea"),
  placeholderDemo("token-input", "TokenInput", "TokenInput"),
  moduleDemo("time-input", "TimeInput", "TimeInputDemoPage", "TimeInputDemoPage"),
  moduleDemo("toolbar", "Toolbar", "ToolbarDemoPage", "ToolbarDemoPage"),
  moduleDemo("toast", "Toast", "ToastDemoPage", "ToastDemoPage"),
  moduleDemo("toggle", "Toggle", "ToggleDemoPage", "ToggleDemoPage"),
  moduleDemo("tooltip", "Tooltip", "TooltipDemoPage", "TooltipDemoPage"),
  moduleDemo("url-input", "URLInput", "URLInputDemoPage", "URLInputDemoPage"),
];

export const COMPONENT_DEMO_NAV_ITEMS = COMPONENT_DEMOS
  .filter((entry) => entry.slug !== "layout" && entry.slug !== "app-shell" && entry.slug !== "icon")
  .map((entry) => ({
    label: entry.label,
    path: `/components/${entry.slug}`,
  }));

export function getComponentDemoBySlug(slug: string): ComponentDemoDefinition | undefined {
  return COMPONENT_DEMOS.find((entry) => entry.slug === slug);
}
