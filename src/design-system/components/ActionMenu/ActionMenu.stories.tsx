import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ActionMenu from "./ActionMenu";
import Button from "../Button/Button";

type Placement =
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top-end"
  | "right-start"
  | "right-end"
  | "left-start"
  | "left-end";

type MenuItem = {
  id?: string;
  label?: string;
  icon?: string;
  shortcut?: string;
  active?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  divider?: boolean;
  type?: "toggle";
  checked?: boolean;
  items?: MenuItem[];
  onClick?: (...args: unknown[]) => void;
  onChange?: (checked: boolean) => void;
};

const canvasStyle: React.CSSProperties = {
  minHeight: 380,
  padding: "120px 160px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "visible",
};

const BASE_ITEMS: MenuItem[] = [
  { label: "Edit", icon: "PencilSimple", shortcut: "E" },
  { label: "Duplicate", icon: "Copy", shortcut: "Cmd+D" },
  { divider: true },
  { label: "Delete", icon: "Trash", destructive: true },
];

const withCanvas = (node: React.ReactNode) => <div style={canvasStyle}>{node}</div>;

const meta = {
  title: "Components/ActionMenu",
  component: ActionMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    placement: {
      control: "select",
      options: [
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end",
        "right-start",
        "right-end",
        "left-start",
        "left-end",
      ] satisfies Placement[],
    },
    items: { control: "object" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    menuClassName: { control: "text" },
    onOpenChange: { action: "openChange" },
    trigger: { table: { disable: true } },
  },
  args: {
    placement: "bottom-end",
    items: BASE_ITEMS as unknown[],
    fullWidth: false,
    disabled: false,
    className: "",
    menuClassName: "",
  },
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) =>
    withCanvas(
      <ActionMenu
        {...args}
        trigger={<Button label="Actions" appearance="outline" icon="DotsThree" layout="icon-right" />}
      />,
    ),
};

export const ItemStates: Story = {
  args: {
    items: [
      { label: "Active item", icon: "Check", active: true },
      { label: "Shortcut item", icon: "Keyboard", shortcut: "Cmd+K" },
      { label: "Disabled item", icon: "Lock", disabled: true },
      { divider: true },
      { label: "Destructive item", icon: "Trash", destructive: true },
    ] as unknown[],
  },
  render: (args) =>
    withCanvas(
      <ActionMenu
        {...args}
        trigger={<Button label="Item States" appearance="outline" icon="DotsThree" layout="icon-right" />}
      />,
    ),
};

export const NestedSubmenus: Story = {
  args: {
    placement: "bottom-start",
    items: [
      { label: "Rename", icon: "PencilSimple" },
      {
        label: "Move to",
        icon: "FolderSimple",
        items: [
          { label: "Marketing", icon: "MegaphoneSimple" },
          { label: "Finance", icon: "CurrencyDollarSimple" },
          {
            label: "Archive",
            icon: "ArchiveBox",
            items: [
              { label: "2024", icon: "CalendarBlank" },
              { label: "2025", icon: "CalendarBlank" },
            ],
          },
        ],
      },
      { divider: true },
      { label: "Delete", icon: "Trash", destructive: true },
    ] as unknown[],
  },
  render: (args) =>
    withCanvas(
      <ActionMenu
        {...args}
        trigger={<Button label="Nested Menu" appearance="outline" icon="DotsThree" layout="icon-right" />}
      />,
    ),
};

export const ToggleItems: Story = {
  render: (args) => {
    const [email, setEmail] = React.useState(true);
    const [push, setPush] = React.useState(false);

    const items: MenuItem[] = [
      { label: "Email notifications", type: "toggle", checked: email, onChange: setEmail },
      { label: "Push notifications", type: "toggle", checked: push, onChange: setPush },
      { divider: true },
      { label: "Reset preferences", icon: "ArrowCounterClockwise" },
    ];

    return withCanvas(
      <ActionMenu
        {...args}
        items={items as unknown[]}
        trigger={<Button label="Preferences" appearance="outline" icon="SlidersHorizontal" layout="icon-right" />}
      />,
    );
  },
};

export const FullWidth: Story = {
  args: {
    placement: "bottom-start",
    fullWidth: true,
  },
  render: (args) =>
    withCanvas(
      <div style={{ width: 320 }}>
        <ActionMenu
          {...args}
          trigger={<Button label="Full Width Trigger" appearance="outline" layout="label-only" />}
        />
      </div>,
    ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) =>
    withCanvas(
      <ActionMenu
        {...args}
        trigger={<Button label="Disabled Menu" appearance="outline" icon="DotsThree" layout="icon-right" />}
      />,
    ),
};

export const PlacementGallery: Story = {
  render: () => {
    const placements: Placement[] = [
      "bottom-start",
      "bottom-end",
      "top-start",
      "top-end",
      "right-start",
      "right-end",
      "left-start",
      "left-end",
    ];

    return (
      <div
        style={{
          minHeight: 760,
          padding: "80px 120px",
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(320px, 1fr))",
          gap: 24,
          overflow: "visible",
        }}
      >
        {placements.map((placement) => (
          <div
            key={placement}
            style={{
              minHeight: 280,
              border: "1px dashed var(--uds-border-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <ActionMenu
              placement={placement}
              items={BASE_ITEMS as unknown[]}
              trigger={<Button label={placement} appearance="outline" icon="DotsThree" layout="icon-right" />}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const CustomClassNames: Story = {
  args: {
    className: "action-menu--custom-root",
    menuClassName: "action-menu--custom-panel",
  },
  render: (args) =>
    withCanvas(
      <ActionMenu
        {...args}
        trigger={<Button label="Custom Classes" appearance="outline" icon="DotsThree" layout="icon-right" />}
      />,
    ),
};

export const SectionedActions: Story = {
  args: {
    placement: "bottom-start",
    items: [
      { label: "Open", icon: "FolderOpen" },
      { label: "Open in new tab", icon: "ArrowSquareOut" },
      { divider: true },
      { label: "Share", icon: "ShareNetwork" },
      { label: "Copy link", icon: "LinkSimple" },
      { divider: true },
      { label: "Archive", icon: "ArchiveBox" },
      { label: "Delete", icon: "Trash", destructive: true },
    ] as unknown[],
  },
  render: (args) =>
    withCanvas(
      <ActionMenu
        {...args}
        trigger={<Button label="Sectioned Actions" appearance="outline" icon="List" layout="icon-right" />}
      />,
    ),
};

export const DenseListScrollable: Story = {
  args: {
    placement: "bottom-start",
    menuClassName: "action-menu--dense-list",
    items: Array.from({ length: 18 }, (_, index) => ({
      label: `Quick action ${index + 1}`,
      icon: index % 3 === 0 ? "Lightning" : index % 3 === 1 ? "ClockCounterClockwise" : "Star",
    })) as unknown[],
  },
  render: (args) =>
    withCanvas(
      <ActionMenu
        {...args}
        trigger={<Button label="Dense Action List" appearance="outline" icon="Rows" layout="icon-right" />}
      />,
    ),
};

export const IconOnlyTrigger: Story = {
  args: {
    placement: "bottom-end",
    items: [
      { label: "Rename", icon: "PencilSimple" },
      { label: "Duplicate", icon: "Copy" },
      { label: "Move", icon: "ArrowsOutCardinal" },
      { divider: true },
      { label: "Delete", icon: "Trash", destructive: true },
    ] as unknown[],
  },
  render: (args) =>
    withCanvas(
      <ActionMenu
        {...args}
        trigger={<Button icon="DotsThreeVertical" layout="icon-only" label="More actions" aria-label="More actions" />}
      />,
    ),
};
