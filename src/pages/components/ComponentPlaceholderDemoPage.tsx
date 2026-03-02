import React from "react";
import { Button, Divider, Flex, Icon, Text } from "../../design-system";
import * as DesignSystem from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

interface ComponentPlaceholderDemoPageProps {
  componentName: string;
}

type VariantConfig = Record<string, string[]>;

const COMPONENT_VARIANTS: Record<string, VariantConfig> = {
  Badge: { variant: ["red", "orange", "yellow", "green", "dark-green", "blue", "dark-blue", "purple", "pink", "gray", "outline"] },
  Button: { layout: ["label-only", "icon-left", "icon-right", "icon-only", "only"], appearance: ["primary", "soft", "outline", "text", "ghost", "disabled", "destructive"], size: ["large", "default", "small", "xsmall"] },
  Chip: { appearance: ["outline", "primary"], shape: ["pill", "rounded"], iconplacement: ["both", "left", "right", "none"] },
  Divider: { alignment: ["left", "center", "right"], variant: ["line", "solid"] },
  DotStatus: { variant: ["light-gray", "red", "orange", "yellow", "light-green", "green", "blue", "dark-blue", "teal", "purple", "pink", "magenta", "dark-red", "dark-gray"], size: ["small", "medium", "large"] },
  Dropdown: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  ImageAspect: { aspectratio: ["square", "video", "4-3", "3-2", "21-9", "portrait", "auto"] },
  Key: { appearance: ["light", "dark"] },
  Modal: { size: ["small", "default", "large", "fullscreen"] },
  ProgressCircle: { size: ["xxs", "xs", "sm", "md", "lg"], shape: ["circle", "half-circle"] },
  ProgressIndicator: { variant: ["default", "blue", "green", "success", "orange", "warning", "red", "error", "purple"], size: ["small", "medium", "large"] },
  Status: { appearance: ["light-gray", "white"], shape: ["pill", "rounded"] },
  Steps: { orientation: ["horizontal", "vertical"], status: ["complete", "active", "incomplete", "disabled", "error", "warning"], size: ["default", "compact"] },
  Tag: { appearance: ["label-only", "icon-left"], size: ["compact", "default"], color: ["transparent", "neutral", "red", "orange", "yellow", "emerald", "green", "sky", "cyan", "blue", "indigo", "purple", "fuchsia", "magenta", "inverse"] },
  TextInput: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
  Textarea: { size: ["compact", "default"], state: ["default", "focused", "error", "disabled"] },
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
  Card: DesignSystem.Card as React.ComponentType<Record<string, unknown>>,
  Checkbox: DesignSystem.Checkbox as React.ComponentType<Record<string, unknown>>,
  Chip: DesignSystem.Chip as React.ComponentType<Record<string, unknown>>,
  Datepicker: DesignSystem.Datepicker as React.ComponentType<Record<string, unknown>>,
  Dialog: DesignSystem.Dialog as React.ComponentType<Record<string, unknown>>,
  DotStatus: DesignSystem.DotStatus as React.ComponentType<Record<string, unknown>>,
  Dropdown: DesignSystem.Dropdown as React.ComponentType<Record<string, unknown>>,
  EventCard: DesignSystem.EventCard as React.ComponentType<Record<string, unknown>>,
  Field: DesignSystem.Field as React.ComponentType<Record<string, unknown>>,
  FileUpload: DesignSystem.FileUpload as React.ComponentType<Record<string, unknown>>,
  Flex: DesignSystem.Flex as React.ComponentType<Record<string, unknown>>,
  ImageAspect: DesignSystem.ImageAspect as React.ComponentType<Record<string, unknown>>,
  Key: DesignSystem.Key as React.ComponentType<Record<string, unknown>>,
  Menu: DesignSystem.Menu as React.ComponentType<Record<string, unknown>>,
  MicroCalendar: DesignSystem.MicroCalendar as React.ComponentType<Record<string, unknown>>,
  Modal: DesignSystem.Modal as React.ComponentType<Record<string, unknown>>,
  Pagination: DesignSystem.Pagination as React.ComponentType<Record<string, unknown>>,
  PillToggle: DesignSystem.PillToggle as React.ComponentType<Record<string, unknown>>,
  Playground: DesignSystem.Playground as React.ComponentType<Record<string, unknown>>,
  ProgressCircle: DesignSystem.ProgressCircle as React.ComponentType<Record<string, unknown>>,
  ProgressIndicator: DesignSystem.ProgressIndicator as React.ComponentType<Record<string, unknown>>,
  Radio: DesignSystem.Radio as React.ComponentType<Record<string, unknown>>,
  Slider: DesignSystem.Slider as React.ComponentType<Record<string, unknown>>,
  Status: DesignSystem.Status as React.ComponentType<Record<string, unknown>>,
  Steps: DesignSystem.Steps as React.ComponentType<Record<string, unknown>>,
  Table: DesignSystem.Table as React.ComponentType<Record<string, unknown>>,
  Tabs: DesignSystem.Tabs as React.ComponentType<Record<string, unknown>>,
  Tag: DesignSystem.Tag as React.ComponentType<Record<string, unknown>>,
  Textarea: DesignSystem.Textarea as React.ComponentType<Record<string, unknown>>,
  Toast: DesignSystem.Toast as React.ComponentType<Record<string, unknown>>,
  Tooltip: DesignSystem.Tooltip as React.ComponentType<Record<string, unknown>>,
};

const BASE_PROPS: Record<string, Record<string, unknown>> = {
  ActionMenu: {
    trigger: <Button appearance="outline" label="Actions" />,
    items: [{ label: "Edit", icon: "PencilSimple" }, { label: "Delete", icon: "Trash", destructive: true }],
  },
  Badge: { count: 8 },
  Breadcrumb: { items: [{ label: "Home", href: "/" }, { label: "Components", href: "/components/button" }, { label: "Current Page" }] },
  Calendar: { events: [{ id: "1", title: "Interview", date: new Date(), type: "assignment", status: "active" }], size: "compact" },
  Card: { to: "/components/button", title: "Card Title", description: "Card description", icon: <Icon name="SquaresFour" size={20} /> },
  Checkbox: { label: "Checkbox option" },
  Chip: { label: "Chip label", icon: "Star", badge: "2" },
  Datepicker: { placeholder: "Select date" },
  Dialog: { title: "Dialog title", description: "Dialog content preview" },
  DotStatus: { variant: "green", size: "medium" },
  Dropdown: { options: [{ value: "1", label: "Option One" }, { value: "2", label: "Option Two" }], placeholder: "Select option" },
  EventCard: { title: "Event title", type: "assignment", status: "active", badge: "Today" },
  Field: { label: "Field label", helperText: "Helper text", children: <DesignSystem.TextInput placeholder="Input inside field" /> },
  FileUpload: { accept: ["image/png", "image/jpeg"], acceptText: "PNG, JPG", maxSize: 5 },
  Flex: { direction: "row", gap: "8", children: <Text as="span" variant="body-14" leading="regular">Flex content</Text> },
  ImageAspect: { src: "https://picsum.photos/640/360", alt: "Example image", ratio: "video" },
  Key: { label: "Cmd+K" },
  Menu: { navItems: [{ label: "Overview", icon: "House", path: "/" }], showBrandSwitcher: false, showModeToggle: false, showSearch: false, showUser: false, showBrand: false },
  MicroCalendar: { defaultDate: new Date() },
  Pagination: { currentPage: 3, totalPages: 10 },
  PillToggle: { label: "Selected", selected: true },
  Playground: {},
  ProgressCircle: { value: 65, max: 100, label: "Progress", showLabel: true },
  ProgressIndicator: { value: 45, max: 100, label: "Loading", showLabel: true },
  Radio: { label: "Radio option", checked: true },
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
  Toast: { title: "Notification", message: "Toast message preview" },
  Tooltip: { content: "Tooltip content", children: <Button label="Hover me" appearance="outline" /> },
};

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

  const buildVariantProps = (key: string, value: string): Record<string, unknown> => {
    const resolvedProp = aliasConfig[key] ?? key;
    const nextProps: Record<string, unknown> = {
      ...baseProps,
      [resolvedProp]: value,
    };

    if (componentName === "Steps" && key === "status") {
      nextProps.steps = [
        { label: "Step 1", status: value },
        { label: "Step 2", status: "incomplete" },
        { label: "Step 3", status: "incomplete" },
      ];
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
      <Flex direction="column" gap="24">
        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Base Example
          </Text>
          {renderPreview(baseProps)}
        </Flex>

        {variantEntries.length > 0 && <Divider variant="solid" />}

        {variantEntries.map(([variantKey, values]) => (
          <Flex key={`${componentName}-${variantKey}`} direction="column" gap="12">
            <Text as="h2" variant="heading-24" weight="medium" leading="regular">
              {toTitleCase(aliasConfig[variantKey] ?? variantKey)} Variants
            </Text>
            <Flex alignItems="center" gap="16" wrap>
              {values.map((value) => (
                <Flex key={`${variantKey}-${value}`} direction="column" gap="8">
                  {renderPreview(buildVariantProps(variantKey, value))}
                  <Text as="span" variant="body-12" leading="regular">
                    {value}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>

      {propsRows.length > 0 && (
        <>
          <Divider variant="solid" />
          <ComponentPropsTable rows={propsRows} title="Variant Props" />
        </>
      )}
    </DocPageLayout>
  );
}
