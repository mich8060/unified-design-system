import React from "react";
import { Button } from "../../design-system/components/Button";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import * as DesignSystem from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

interface ComponentPlaceholderDemoPageProps {
  componentName: string;
}

type VariantConfig = Record<string, string[]>;
type GenericComponentProps = Record<string, unknown>;

const COMPONENT_VARIANTS: Record<string, VariantConfig> = {
  Badge: {
    variant: ["blue", "cyan", "green", "magenta", "indigo", "rose", "neutral", "orange", "purple", "red", "sky", "yellow", "inverse", "lime"],
    appearance: ["solid", "outlined"],
    rounded: ["true", "false"],
  },
  Button: { layout: ["label-only", "icon-left", "icon-right", "icon-only", "only"], appearance: ["primary", "soft", "outline", "text", "ghost", "disabled", "destructive"], size: ["large", "default", "small", "xsmall"] },
  Chip: { selected: ["false", "true"], rounded: ["false", "true"], size: ["default", "compact"], iconplacement: ["both", "left", "right", "none"] },
  Code: { inline: ["false", "true"], language: ["tsx", "javascript", "json", "bash"] },
  Container: {
    surface: ["default", "panel", "subtle-panel", "list", "card-selectable", "scroll-region", "transparent"],
    border: ["default", "subtle", "none"],
    radius: ["none", "sm", "md", "lg"],
    overflow: ["visible", "hidden", "auto", "clip"],
    padding: ["none", "xsmall", "small", "default", "large", "xlarge"],
    paddingX: ["none", "xsmall", "small", "default", "large", "xlarge"],
    paddingY: ["none", "xsmall", "small", "default", "large", "xlarge"],
  },
  DescriptionList: { density: ["default", "compact"], labelWidth: ["sm", "md", "lg"], bordered: ["true", "false"] },
  CurrencyInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  DateInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  DateRangeInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"], disabled: ["false", "true"] },
  Divider: { alignment: ["left", "center", "right"], variant: ["line", "solid"] },
  DotStatus: { variant: ["red", "blue", "inverse", "orange", "sky", "indigo", "rose", "neutral", "celery", "lime", "yellow", "green", "cyan", "purple", "fuchsia"], size: ["small", "medium", "large"], outline: ["false", "true"] },
  Dropdown: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  EventCard: {
    type: ["travel", "assignment", "unassigned"],
    status: ["active", "past", "pending"],
    color: ["transparent", "neutral", "red", "orange", "yellow", "emerald", "green", "sky", "cyan", "blue", "indigo", "purple", "fuchsia", "magenta", "inverse"],
  },
  Flex: { fullWidth: ["true", "false"], fullHeight: ["true", "false"], wrap: ["true", "false"] },
  ImageAspect: { aspectratio: ["square", "video", "4-3", "3-2", "21-9", "portrait", "auto"] },
  Key: { appearance: ["light", "dark"] },
  Link: { appearance: ["primary", "secondary", "prominent", "external"], underline: ["always", "hover", "none"], disabled: ["false", "true"], external: ["false", "true"] },
  Modal: {
    size: ["small", "default", "large", "fullscreen"],
    dismissible: ["false", "true"],
    headerAlign: ["start", "center", "space-between"],
    footerAlign: ["start", "center", "end", "space-between"],
    bodyPadding: ["none", "compact", "default"],
  },
  NumberInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  PasswordInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  PhoneInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  ProgressCircle: { shape: ["circle", "half-circle"], size: ["xxs", "xs", "sm", "md", "lg"] },
  ProgressIndicator: {
    labelPosition: ["false", "right", "bottom", "top-floating", "bottom-floating"],
    variant: ["default", "blue", "green", "success", "orange", "warning", "red", "error", "purple"],
    size: ["small", "medium", "large"],
  },
  Status: { appearance: ["light-gray", "white"], shape: ["pill", "rounded"] },
  Steps: { orientation: ["horizontal", "vertical"], status: ["complete", "active", "incomplete", "disabled", "error"], size: ["default", "compact"] },
  Tag: { appearance: ["label-only", "icon-left"], size: ["compact", "default"], color: ["transparent", "neutral", "red", "orange", "yellow", "emerald", "green", "sky", "cyan", "blue", "indigo", "purple", "fuchsia", "magenta", "inverse"] },
  SearchInput: {
    size: ["compact", "default"],
    state: ["default", "focused", "error", "disabled"],
    width: ["sm", "md", "lg", "full"],
    context: ["default", "toolbar"],
  },
  SelectableCard: { selected: ["false", "true"], disabled: ["false", "true"] },
  Text: { tone: ["primary", "secondary", "tertiary", "muted", "placeholder", "disabled"], leading: ["tight", "regular", "loose"] },
  TextInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  Textarea: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  TokenInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  TimeInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  Toast: { variant: ["success", "error", "warning", "info"] },
  Toggle: { size: ["large", "small"] },
  Tooltip: { placement: ["top", "bottom", "left", "right"] },
};

const VARIANT_PROP_ALIASES: Record<string, Record<string, string>> = {
  Chip: { iconplacement: "iconPlacement" },
  ImageAspect: { aspectratio: "ratio" },
};

const COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  ActionMenu: DesignSystem.ActionMenu as React.ComponentType<Record<string, unknown>>,
  Badge: DesignSystem.Badge as React.ComponentType<Record<string, unknown>>,
  Breadcrumb: DesignSystem.Breadcrumb as React.ComponentType<Record<string, unknown>>,
  Calendar: DesignSystem.Calendar as React.ComponentType<Record<string, unknown>>,
  Checkbox: DesignSystem.Checkbox as React.ComponentType<Record<string, unknown>>,
  Chip: DesignSystem.Chip as React.ComponentType<Record<string, unknown>>,
  Code: DesignSystem.Code as React.ComponentType<Record<string, unknown>>,
  Container: DesignSystem.Container as React.ComponentType<Record<string, unknown>>,
  DescriptionList: DesignSystem.DescriptionList as React.ComponentType<Record<string, unknown>>,
  CurrencyInput: DesignSystem.CurrencyInput as React.ComponentType<Record<string, unknown>>,
  DateInput: DesignSystem.DateInput as React.ComponentType<Record<string, unknown>>,
  DateRangeInput: DesignSystem.DateRangeInput as React.ComponentType<Record<string, unknown>>,
  Datepicker: DesignSystem.Datepicker as React.ComponentType<Record<string, unknown>>,
  Dialog: DesignSystem.Dialog as React.ComponentType<Record<string, unknown>>,
  DotStatus: DesignSystem.DotStatus as React.ComponentType<Record<string, unknown>>,
  Dropdown: DesignSystem.Dropdown as React.ComponentType<Record<string, unknown>>,
  EmptyState: DesignSystem.EmptyState as unknown as React.ComponentType<Record<string, unknown>>,
  EventCard: DesignSystem.EventCard as React.ComponentType<Record<string, unknown>>,
  Field: DesignSystem.Field as React.ComponentType<Record<string, unknown>>,
  FileUpload: DesignSystem.FileUpload as React.ComponentType<Record<string, unknown>>,
  Flex: DesignSystem.Layout as React.ComponentType<Record<string, unknown>>,
  ImageAspect: DesignSystem.ImageAspect as React.ComponentType<Record<string, unknown>>,
  Key: DesignSystem.Key as React.ComponentType<Record<string, unknown>>,
  Link: DesignSystem.Link as React.ComponentType<Record<string, unknown>>,
  Menu: DesignSystem.Menu as React.ComponentType<Record<string, unknown>>,
  MicroCalendar: DesignSystem.MicroCalendar as React.ComponentType<Record<string, unknown>>,
  Modal: DesignSystem.Modal as React.ComponentType<Record<string, unknown>>,
  NumberInput: DesignSystem.NumberInput as React.ComponentType<Record<string, unknown>>,
  Pagination: DesignSystem.Pagination as React.ComponentType<Record<string, unknown>>,
  PasswordInput: DesignSystem.PasswordInput as React.ComponentType<Record<string, unknown>>,
  PhoneInput: DesignSystem.PhoneInput as React.ComponentType<Record<string, unknown>>,
  ProgressCircle: DesignSystem.ProgressCircle as React.ComponentType<Record<string, unknown>>,
  ProgressIndicator: DesignSystem.ProgressIndicator as React.ComponentType<Record<string, unknown>>,
  Radio: DesignSystem.Radio as React.ComponentType<Record<string, unknown>>,
  SearchInput: DesignSystem.SearchInput as React.ComponentType<Record<string, unknown>>,
  SelectableCard: DesignSystem.SelectableCard as React.ComponentType<Record<string, unknown>>,
  Slider: DesignSystem.Slider as React.ComponentType<Record<string, unknown>>,
  Status: DesignSystem.Status as React.ComponentType<Record<string, unknown>>,
  Steps: DesignSystem.Steps as React.ComponentType<Record<string, unknown>>,
  Table: DesignSystem.Table as React.ComponentType<Record<string, unknown>>,
  Tabs: DesignSystem.Tabs as React.ComponentType<Record<string, unknown>>,
  Tag: DesignSystem.Tag as React.ComponentType<Record<string, unknown>>,
  Textarea: DesignSystem.Textarea as React.ComponentType<Record<string, unknown>>,
  TokenInput: DesignSystem.TokenInput as React.ComponentType<Record<string, unknown>>,
  TimeInput: DesignSystem.TimeInput as React.ComponentType<Record<string, unknown>>,
  Toast: DesignSystem.Toast as React.ComponentType<Record<string, unknown>>,
  Tooltip: DesignSystem.Tooltip as React.ComponentType<Record<string, unknown>>,
};

const BASE_PROPS: Record<string, Record<string, unknown>> = {
  ActionMenu: {
    trigger: <Button appearance="outline" label="Actions" />,
    items: [{ label: "Edit", icon: "PencilSimple" }, { label: "Delete", icon: "Trash", destructive: true }],
  },
  Badge: { count: 8 },
  Breadcrumb: {
    items: [
      { label: "Unified Design System", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Button" },
    ],
  },
  Calendar: { events: [{ id: "1", title: "Interview", date: new Date(), type: "assignment", status: "active" }], size: "compact" },
  Checkbox: { label: "Checkbox option" },
  Chip: { label: "Chip label", icon: "Star", badge: "2" },
  Code: { language: "tsx", code: `<Button label="Save" appearance="primary" />` },
  Container: { children: <Text as="span" variant="body-14" leading="regular">Container content</Text> },
  DescriptionList: {
    items: [
      { label: "Provider", value: "Dr. Jane Smith" },
      { label: "Status", value: "Active" },
    ],
  },
  CurrencyInput: { placeholder: "0.00" },
  DateInput: { placeholder: "Select date" },
  DateRangeInput: { startPlaceholder: "Start date", endPlaceholder: "End date" },
  Datepicker: { placeholder: "Select date" },
  Dialog: {
    intent: "info",
    title: "Dialog title",
    description: "Dialog content preview",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  },
  DotStatus: { variant: "green", size: "medium", outline: true },
  Dropdown: { options: [{ value: "1", label: "Option One" }, { value: "2", label: "Option Two" }], placeholder: "Select option" },
  EmptyState: {
    icon: "FolderOpen",
    title: "No results found",
    description: "Try adjusting your filters or create a new item.",
    action: <Button label="Create item" />,
    secondaryAction: <Button label="Clear filters" appearance="outline" />,
    align: "center",
  },
  EventCard: { title: "Event title", type: "assignment", status: "active", badge: "Today" },
  Field: { label: "Field label", helperText: "Helper text", children: <DesignSystem.TextInput placeholder="Input inside field" /> },
  FileUpload: { accept: ["image/png", "image/jpeg"], acceptText: "PNG, JPG", maxSize: 5 },
  Flex: { direction: "row", gap: "8", children: <Text as="span" variant="body-14" leading="regular">Flex content</Text> },
  ImageAspect: { src: "https://picsum.photos/640/360", alt: "Example image", ratio: "video" },
  Key: { label: "Cmd+K" },
  Link: { href: "#", children: "View details", appearance: "external", iconTrailing: "ArrowSquareOut" },
  Menu: {
    navItems: [
      { label: "Overview", icon: "House", path: "/getting-started" },
      {
        label: "Foundations",
        icon: "Palette",
        children: [
          { label: "Colors", path: "/foundations/colors-primitives" },
          { label: "Design Tokens", path: "/docs/tokens" },
        ],
      },
      {
        label: "Components",
        icon: "SquaresFour",
        children: [
          { label: "Button", path: "/components/button" },
          { label: "Flex", path: "/components/flex" },
          { label: "Field", path: "/components/field" },
          { label: "Menu", path: "/components/menu" },
        ],
      },
    ],
    brands: ["default", "comphealth", "weatherby", "connect", "chg", "wireframe"],
    activeBrand: "default",
    onBrandChange: () => {},
    showBrandSwitcher: true,
    showModeToggle: true,
    showSearch: true,
    showUser: true,
    showBrand: true,
    userName: "Emily Brown",
    userInitials: "EB",
    identity: "design-system",
    accountMenuItems: [
      {
        label: "Profile",
        icon: "UserCircle",
        onClick: () => {
          window.location.assign("/sample-item");
        },
      },
      {
        label: "Settings",
        icon: "Gear",
        onClick: () => {
          window.location.assign("/docs/tokens");
        },
      },
      { divider: true },
      {
        label: "View Components",
        icon: "SquaresFour",
        onClick: () => {
          window.location.assign("/components/button");
        },
      },
      {
        label: "Sign out",
        icon: "SignOut",
        destructive: true,
        onClick: () => {
          window.location.assign("/getting-started");
        },
      },
    ],
  },
  MicroCalendar: { defaultDate: new Date() },
  NumberInput: { placeholder: "0" },
  Pagination: { currentPage: 3, totalPages: 10 },
  PasswordInput: { placeholder: "Enter password" },
  PhoneInput: { placeholder: "(555) 123-4567" },
  ProgressCircle: { value: 65, max: 100, label: "Progress", showLabel: true },
  ProgressIndicator: { value: 45, max: 100, label: "Loading", showLabel: false },
  Radio: { label: "Radio option", checked: true },
  SearchInput: { placeholder: "Search...", width: "md", context: "default" },
  SelectableCard: { title: "Document row", description: "Compact selectable row" },
  Slider: { value: 40, min: 0, max: 100 },
  Status: { label: "In Progress" },
  Steps: {
    steps: [
      { label: "Step 1", status: "complete" },
      { label: "Step 2", status: "active" },
      { label: "Step 3", status: "incomplete" },
    ],
  },
  Table: {
    columns: [{ key: "name", label: "Name" }, { key: "role", label: "Role" }],
    data: [{ name: "Jane Doe", role: "Designer" }, { name: "John Smith", role: "Engineer" }],
  },
  Tabs: { tabs: [{ id: "overview", label: "Overview" }, { id: "details", label: "Details" }, { id: "activity", label: "Activity" }] },
  Tag: { label: "Tag label" },
  Textarea: { placeholder: "Enter details..." },
  TokenInput: { tokens: ["alpha", "beta"], placeholder: "Add tokens..." },
  TimeInput: { placeholder: "Select time" },
  Toast: { title: "Notification", message: "Toast message preview" },
  Tooltip: { content: "Tooltip content", children: <Button label="Hover me" appearance="outline" /> },
};

const DIALOG_PROP_ROWS: ComponentPropRow[] = [
  {
    prop: "intent",
    type: `"info" | "success" | "warning" | "destructive"`,
    defaultValue: `"info"`,
    description: "Controls icon and action styling.",
  },
  {
    prop: "title",
    type: "string",
    defaultValue: "-",
    description: "Dialog heading text.",
  },
  {
    prop: "description",
    type: "string",
    defaultValue: "-",
    description: "Supporting body text below the heading.",
  },
  {
    prop: "confirmLabel",
    type: "string",
    defaultValue: `"Confirm"`,
    description: "Primary action button label.",
  },
  {
    prop: "cancelLabel",
    type: "string",
    defaultValue: `"Cancel"`,
    description: "Secondary action button label.",
  },
  {
    prop: "showCancel",
    type: "boolean",
    defaultValue: "true",
    description: "Shows or hides the cancel action.",
  },
  {
    prop: "loading",
    type: "boolean",
    defaultValue: "false",
    description: "Shows loading state on the confirm action.",
  },
  {
    prop: "closeOnBackdrop",
    type: "boolean",
    defaultValue: "true",
    description: "Closes when the scrim is clicked.",
  },
  {
    prop: "closeOnEscape",
    type: "boolean",
    defaultValue: "true",
    description: "Closes when Escape is pressed.",
  },
];

const CONTAINER_BASIC_SNIPPET = `<Container>
  <Text as="span" variant="body-14" leading="regular">
    Container content
  </Text>
</Container>`;

const CONTAINER_APPEARANCE_SNIPPET = `<Container appearance="default">Default surface</Container>
<Container appearance="transparent">Transparent surface</Container>`;

const CONTAINER_PADDING_SNIPPET = `<Container padding="none">No padding</Container>
<Container padding="small">Small padding</Container>
<Container padding="default">Default padding</Container>
<Container padding="large">Large padding</Container>`;

const CONTAINER_AXIS_PADDING_SNIPPET = `<Container appearance="default" paddingX="large" paddingY="small">
  Horizontal: large, Vertical: small
</Container>
<Container appearance="default" paddingX="small" paddingY="xlarge">
  Horizontal: small, Vertical: xlarge
</Container>`;

const DROPDOWN_BASIC_SNIPPET = `<Dropdown
  options={[
    { value: "all", label: "All Departments" },
    { value: "engineering", label: "Engineering" },
    { value: "product", label: "Product" },
  ]}
  placeholder="Select a department"
/>`;

const DROPDOWN_PLACEHOLDER_SNIPPET = `<Dropdown
  placeholder="Department"
  options={[
    { value: "engineering", label: "Engineering" },
    { value: "product", label: "Product" },
    { value: "design", label: "Design" },
  ]}
/>;
// Use placeholder for in-field text.`;

const DROPDOWN_CONTROLLED_SNIPPET = `const [department, setDepartment] = useState("engineering");

<Dropdown
  placeholder="Select a department"
  value={department}
  onChange={setDepartment}
  options={[
    { value: "engineering", label: "Engineering" },
    { value: "product", label: "Product" },
    { value: "design", label: "Design" },
  ]}
/>`;

const DROPDOWN_STATE_SNIPPET = `<Dropdown
  placeholder="Status"
  state="error"
  options={[
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
  ]}
/>

<Dropdown
  placeholder="Archived"
  disabled
  options={[
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]}
/>`;

const CODE_INLINE_SNIPPET = `Use <Code inline language="tsx" code="<Button />" /> inside a sentence.`;

const CODE_BLOCK_TSX_SNIPPET = `<Code
  language="tsx"
  code={\`<Layout direction="row" gap="8">
  <Button label="Cancel" appearance="outline" />
  <Button label="Save" appearance="primary" />
</Layout>\`}
/>`;

const CODE_BLOCK_JSON_SNIPPET = `<Code
  language="json"
  code={\`{
  "brand": "comphealth",
  "theme": "light",
  "layout": "default"
}\`}
/>`;

const BREADCRUMB_TIERS_SNIPPET = `<Breadcrumb
  items={[
    // Tier 1
    { label: "Unified Design System", href: "/" },
    // Tier 2
    { label: "Components", href: "/components" },
    // Tier 3 (current page, no href)
    { label: "Button" },
  ]}
/>\n// Tier depth comes from item order (index).`;

const BREADCRUMB_DEEPER_TIERS_SNIPPET = `<Breadcrumb
  items={[
    // Tier 1
    { label: "Unified Design System", href: "/" },
    // Tier 2
    { label: "Modules", href: "/modules" },
    // Tier 3
    { label: "Credentialing", href: "/modules/credentialing" },
    // Tier 4 (current page)
    { label: "Review & Sign" },
  ]}
/>\n// Last item is always the current page.`;

const BREADCRUMB_PROP_ROWS: ComponentPropRow[] = [
  {
    prop: "items",
    type: "Array<{ label: string; href?: string }>",
    defaultValue: "-",
    description:
      "Ordered breadcrumb tiers. Tier depth is positional (index order), and the last item is rendered as the current page.",
  },
];

class PreviewErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Text as="p" variant="body-14" leading="regular">
          Preview unavailable for this configuration.
        </Text>
      );
    }
    return this.props.children;
  }
}

function InteractiveChipPreview({ props }: { props: GenericComponentProps }) {
  const initialSelected = typeof props.selected === "boolean" ? props.selected : false;
  const [selected, setSelected] = React.useState<boolean>(initialSelected);

  React.useEffect(() => {
    if (typeof props.selected === "boolean") {
      setSelected(props.selected);
    }
  }, [props.selected]);

  const externalOnClick =
    typeof props.onClick === "function"
      ? (props.onClick as (event: React.MouseEvent<HTMLElement>) => void)
      : undefined;

  return (
    <DesignSystem.Chip
      {...props}
      selected={selected}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        setSelected((previous) => !previous);
        externalOnClick?.(event);
      }}
    />
  );
}

function InteractiveDialogPreview({ props }: { props: GenericComponentProps }) {
  const [open, setOpen] = React.useState(false);
  const [showBodyExample, setShowBodyExample] = React.useState(false);
  const [showLoadingExample, setShowLoadingExample] = React.useState(false);
  const [isConfirming, setIsConfirming] = React.useState(false);
  const confirmTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const onClose = () => {
    if (confirmTimeoutRef.current) {
      clearTimeout(confirmTimeoutRef.current);
      confirmTimeoutRef.current = null;
    }
    setIsConfirming(false);
    setOpen(false);
  };
  const onConfirm = () => {
    if (showLoadingExample) {
      setIsConfirming(true);
      confirmTimeoutRef.current = setTimeout(() => {
        setIsConfirming(false);
        setOpen(false);
      }, 1500);
      return;
    }

    setOpen(false);
  };
  const providedChildren = props.children as React.ReactNode;
  React.useEffect(() => {
    return () => {
      if (confirmTimeoutRef.current) {
        clearTimeout(confirmTimeoutRef.current);
      }
    };
  }, []);

  const bodyContent = (
    <Layout direction="column" gap="8">
      <Text as="p" variant="body-14" leading="regular">
        This is custom content passed through the dialog body slot.
      </Text>
      <Text as="p" variant="body-14" leading="regular">
        Use it for extra details, warnings, or simple form controls.
      </Text>
    </Layout>
  );

  return (
    <Layout direction="column" gap="12" alignItems="flex-start">
      <Layout alignItems="center" gap="8" wrap>
        <Button
          label="Open Dialog"
          onClick={() => {
            setShowBodyExample(false);
            setShowLoadingExample(false);
            setIsConfirming(false);
            setOpen(true);
          }}
        />
        <Button
          label="Open Dialog (With Body)"
          appearance="outline"
          onClick={() => {
            setShowBodyExample(true);
            setShowLoadingExample(false);
            setIsConfirming(false);
            setOpen(true);
          }}
        />
        <Button
          label="Open Dialog (Loading)"
          appearance="outline"
          onClick={() => {
            setShowBodyExample(false);
            setShowLoadingExample(true);
            setIsConfirming(false);
            setOpen(true);
          }}
        />
      </Layout>
      <DesignSystem.Dialog
        {...props}
        open={open}
        onClose={onClose}
        onConfirm={onConfirm}
        loading={showLoadingExample && isConfirming}
      >
        {showBodyExample ? bodyContent : providedChildren}
      </DesignSystem.Dialog>
    </Layout>
  );
}

function InteractiveDropdownPreview({ props }: { props: GenericComponentProps }) {
  const [selectedValue, setSelectedValue] = React.useState<unknown>(props.value);

  React.useEffect(() => {
    setSelectedValue(props.value);
  }, [props.value]);

  const externalOnChange =
    typeof props.onChange === "function"
      ? (props.onChange as (value: unknown) => void)
      : undefined;

  return (
    <DesignSystem.Dropdown
      {...props}
      value={selectedValue}
      onChange={(value: unknown) => {
        setSelectedValue(value);
        externalOnChange?.(value);
      }}
    />
  );
}

function MenuPreview({ props }: { props: GenericComponentProps }) {
  const existingClassName = typeof props.className === "string" ? props.className : "";
  const frameStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: "720px",
    border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
    borderRadius: "var(--uds-radius-4)",
    overflow: "hidden",
    background: "var(--uds-surface-primary)",
  };

  return (
    <div style={frameStyle}>
      <DesignSystem.Menu
        {...props}
        className={[existingClassName, "example"].filter(Boolean).join(" ")}
      />
    </div>
  );
}

const toTitleCase = (value: string): string =>
  value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export function ComponentPlaceholderDemoPage({ componentName }: ComponentPlaceholderDemoPageProps) {
  const Component = COMPONENTS[componentName];
  const variantConfig = COMPONENT_VARIANTS[componentName] ?? {};
  const aliasConfig = VARIANT_PROP_ALIASES[componentName] ?? {};
  const baseProps = BASE_PROPS[componentName] ?? {};
  const variantEntries = Object.entries(variantConfig);

  const propsRows: ComponentPropRow[] = variantEntries.map(([key, values]) => ({
    prop: aliasConfig[key] ?? key,
    type: values.map((value) => `"${value}"`).join(" | "),
    defaultValue: "-",
    description: `Variant values for ${aliasConfig[key] ?? key}.`,
  }));
  const bottomPropsRows =
    componentName === "Dialog"
      ? DIALOG_PROP_ROWS
      : componentName === "Breadcrumb"
      ? BREADCRUMB_PROP_ROWS
      : propsRows;

  const buildVariantProps = (key: string, value: string): Record<string, unknown> => {
    const resolvedProp = aliasConfig[key] ?? key;
    const normalizedValue =
      value === "true" ? true : value === "false" ? false : value;
    const nextProps: Record<string, unknown> = {
      ...baseProps,
      [resolvedProp]: normalizedValue,
    };

    if (componentName === "Steps" && key === "status") {
      nextProps.steps = [
        { label: "Step 1", status: value },
        { label: "Step 2", status: "incomplete" },
        { label: "Step 3", status: "incomplete" },
      ];
    }

    if (componentName === "Container" && (key === "padding" || key === "paddingX" || key === "paddingY")) {
      nextProps.appearance = "default";
    }

    return nextProps;
  };

  const renderPreview = (props: Record<string, unknown>) => {
    if (componentName === "Modal") {
      return (
        <Text as="p" variant="body-14" leading="regular">
          Modal is interactive/portal-based. Use its dedicated docs for open/close behavior.
        </Text>
      );
    }

    if (!Component) {
      return (
        <Text as="p" variant="body-14" leading="regular">
          Component preview not available.
        </Text>
      );
    }

    if (componentName === "Chip") {
      return (
        <PreviewErrorBoundary>
          <InteractiveChipPreview props={props} />
        </PreviewErrorBoundary>
      );
    }

    if (componentName === "Dialog") {
      return (
        <PreviewErrorBoundary>
          <InteractiveDialogPreview props={props} />
        </PreviewErrorBoundary>
      );
    }

    if (componentName === "Dropdown") {
      return (
        <PreviewErrorBoundary>
          <InteractiveDropdownPreview props={props} />
        </PreviewErrorBoundary>
      );
    }

    if (componentName === "Menu") {
      return (
        <PreviewErrorBoundary>
          <MenuPreview props={props} />
        </PreviewErrorBoundary>
      );
    }

    return (
      <PreviewErrorBoundary>
        <Component {...props} />
      </PreviewErrorBoundary>
    );
  };

  return (
    <DocPageLayout
      title={componentName}
      description={`${componentName} component demo with base usage and variant coverage.`}
    >
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Base Example
          </Text>
          {renderPreview(baseProps)}
        </Layout>

        {(componentName === "Container" ||
          componentName === "Dropdown" ||
          componentName === "Code" ||
          componentName === "Breadcrumb") && (
          <>
            <Divider variant="solid" />
            <Layout direction="column" gap="12">
              <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                Code Samples
              </Text>
              {componentName === "Container" && (
                <>
                  <Code language="tsx" code={CONTAINER_BASIC_SNIPPET} />
                  <Code language="tsx" code={CONTAINER_APPEARANCE_SNIPPET} />
                  <Code language="tsx" code={CONTAINER_PADDING_SNIPPET} />
                  <Code language="tsx" code={CONTAINER_AXIS_PADDING_SNIPPET} />
                </>
              )}
              {componentName === "Dropdown" && (
                <>
                  <Code language="tsx" code={DROPDOWN_BASIC_SNIPPET} />
                  <Code language="tsx" code={DROPDOWN_PLACEHOLDER_SNIPPET} />
                  <Code language="tsx" code={DROPDOWN_CONTROLLED_SNIPPET} />
                  <Code language="tsx" code={DROPDOWN_STATE_SNIPPET} />
                </>
              )}
              {componentName === "Code" && (
                <>
                  <Code language="tsx" code={CODE_INLINE_SNIPPET} />
                  <Code language="tsx" code={CODE_BLOCK_TSX_SNIPPET} />
                  <Code language="tsx" code={CODE_BLOCK_JSON_SNIPPET} />
                </>
              )}
              {componentName === "Breadcrumb" && (
                <>
                  <Code language="tsx" code={BREADCRUMB_TIERS_SNIPPET} />
                  <Code language="tsx" code={BREADCRUMB_DEEPER_TIERS_SNIPPET} />
                </>
              )}
            </Layout>
          </>
        )}

        {variantEntries.length > 0 && <Divider variant="solid" />}

        {variantEntries.map(([variantKey, values]) => (
          <Layout key={`${componentName}-${variantKey}`} direction="column" gap="12">
            <Text as="h2" variant="heading-24" weight="medium" leading="regular">
              {toTitleCase(aliasConfig[variantKey] ?? variantKey)} Variants
            </Text>
            {componentName === "Chip" && variantKey === "size" ? (
              <Layout direction="column" gap="12">
                <Layout direction="column" alignItems="flex-start" gap="16">
                  {values.map((value) => (
                    <Layout key={`${variantKey}-${value}`} direction="column" gap="8">
                      {renderPreview(buildVariantProps(variantKey, value))}
                      <Text as="span" variant="body-12" leading="regular">
                        {value}
                      </Text>
                    </Layout>
                  ))}
                </Layout>
                <Layout direction="column" alignItems="flex-start" gap="16">
                  {values.map((value) => (
                    <Layout key={`${variantKey}-${value}-rounded-false`} direction="column" gap="8">
                      {renderPreview({
                        ...buildVariantProps(variantKey, value),
                        rounded: false,
                      })}
                      <Text as="span" variant="body-12" leading="regular">
                        {`${value} (rounded=false)`}
                      </Text>
                    </Layout>
                  ))}
                </Layout>
              </Layout>
            ) : componentName === "ProgressCircle" && variantKey === "shape" ? (
              <Layout direction="column" gap="16">
                <Layout direction="column" alignItems="flex-start" gap="16">
                  {values.map((value) => (
                    <Layout key={`${variantKey}-${value}`} direction="column" gap="8">
                      {renderPreview(buildVariantProps(variantKey, value))}
                      <Text as="span" variant="body-12" leading="regular">
                        {value}
                      </Text>
                    </Layout>
                  ))}
                </Layout>

                <Layout direction="column" gap="8">
                  <Text as="span" variant="body-12" leading="regular">
                    Circle sizes
                  </Text>
                  <Layout direction="column" alignItems="flex-start" gap="16">
                    {(variantConfig.size ?? ["xxs", "xs", "sm", "md", "lg"]).map((size) => (
                      <Layout key={`circle-${size}`} direction="column" gap="8">
                        {renderPreview({
                          ...baseProps,
                          shape: "circle",
                          size,
                        })}
                        <Text as="span" variant="body-12" leading="regular">
                          {size}
                        </Text>
                      </Layout>
                    ))}
                  </Layout>
                </Layout>

                <Layout direction="column" gap="8">
                  <Text as="span" variant="body-12" leading="regular">
                    Half-circle sizes
                  </Text>
                  <Layout direction="column" alignItems="flex-start" gap="16">
                    {(variantConfig.size ?? ["xxs", "xs", "sm", "md", "lg"]).map((size) => (
                      <Layout key={`half-circle-${size}`} direction="column" gap="8">
                        {renderPreview({
                          ...baseProps,
                          shape: "half-circle",
                          size,
                        })}
                        <Text as="span" variant="body-12" leading="regular">
                          {size}
                        </Text>
                      </Layout>
                    ))}
                  </Layout>
                </Layout>
              </Layout>
            ) : componentName === "Steps" ? (
              <Layout direction="column" gap="16" style={{ width: "100%" }}>
                {values.map((value) => (
                  <Layout key={`${variantKey}-${value}`} direction="column" gap="8" style={{ width: "100%" }}>
                    {renderPreview(buildVariantProps(variantKey, value))}
                    <Text as="span" variant="body-12" leading="regular">
                      {value}
                    </Text>
                  </Layout>
                ))}
              </Layout>
            ) : (
              <Layout direction="column" alignItems="flex-start" gap="16">
                {values.map((value) => (
                  <Layout key={`${variantKey}-${value}`} direction="column" gap="8">
                    {renderPreview(buildVariantProps(variantKey, value))}
                    <Text as="span" variant="body-12" leading="regular">
                      {value}
                    </Text>
                  </Layout>
                ))}
              </Layout>
            )}
          </Layout>
        ))}
      </Layout>

      {bottomPropsRows.length > 0 && (
        <>
          <Divider variant="solid" />
          <ComponentPropsTable
            rows={bottomPropsRows}
            title={componentName === "Dialog" ? "Props" : "Variant Props"}
          />
        </>
      )}
    </DocPageLayout>
  );
}
