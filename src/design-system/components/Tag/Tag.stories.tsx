import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Tag from "./Tag";
import type { TagColor } from "./Tag.types";

const ALL_COLORS: TagColor[] = [
  "transparent",
  "neutral",
  "red",
  "orange",
  "yellow",
  "emerald",
  "green",
  "sky",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "fuchsia",
  "magenta",
  "inverse",
];

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Text content of the tag.",
    },
    appearance: {
      control: "select",
      options: ["label-only", "icon-left"],
      description: "Visual appearance: label only or with a leading icon.",
    },
    size: {
      control: "select",
      options: ["compact", "default"],
      description: "Size of the tag.",
    },
    color: {
      control: "select",
      options: ALL_COLORS,
      description: "Color variant.",
    },
    rounded: {
      control: "boolean",
      description: "Whether to apply fully rounded corners.",
    },
    solid: {
      control: "boolean",
      description: "Solid filled background treatment.",
    },
    outlined: {
      control: "boolean",
      description: "Outlined border treatment (ignored when solid is true).",
    },
    pastel: {
      control: "boolean",
      description: "Lighter pastel background (ignored when solid or outlined).",
    },
    icon: {
      control: "text",
      description: "Icon name (used when appearance is icon-left).",
    },
    onClick: {
      action: "clicked",
      description: "Optional click handler — renders the tag as a button when provided.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
  },
  args: {
    label: "Tag Label",
    appearance: "label-only",
    size: "compact",
    color: "blue",
    rounded: true,
    solid: false,
    outlined: false,
    pastel: false,
    className: "",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {};

export const LabelOnly: Story = {
  name: "Label Only",
  args: {
    appearance: "label-only",
    label: "In Review",
    color: "blue",
  },
};

export const WithIcon: Story = {
  name: "With Leading Icon",
  args: {
    appearance: "icon-left",
    icon: "CheckCircle",
    label: "Approved",
    color: "green",
  },
};

export const SizeVariants: Story = {
  name: "Size Variants",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Tag label="Compact" size="compact" color="blue" />
      <Tag label="Default" size="default" color="blue" />
    </div>
  ),
};

export const SolidTreatment: Story = {
  name: "Solid Background",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {ALL_COLORS.filter((c) => c !== "transparent").map((color) => (
        <Tag key={color} label={color} color={color} solid />
      ))}
    </div>
  ),
};

export const OutlinedTreatment: Story = {
  name: "Outlined",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {ALL_COLORS.filter((c) => c !== "transparent").map((color) => (
        <Tag key={color} label={color} color={color} outlined />
      ))}
    </div>
  ),
};

export const PastelTreatment: Story = {
  name: "Pastel",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {ALL_COLORS.filter((c) => c !== "transparent").map((color) => (
        <Tag key={color} label={color} color={color} pastel />
      ))}
    </div>
  ),
};

export const AllColorVariants: Story = {
  name: "All Color Variants (Default)",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {ALL_COLORS.map((color) => (
        <Tag key={color} label={color} color={color} />
      ))}
    </div>
  ),
};

export const WithIconAllColors: Story = {
  name: "With Icon — All Colors",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {ALL_COLORS.filter((c) => c !== "transparent").map((color) => (
        <Tag key={color} label={color} color={color} appearance="icon-left" icon="Tag" pastel />
      ))}
    </div>
  ),
};

export const Clickable: Story = {
  name: "Clickable (Button Render)",
  args: {
    label: "Click me",
    color: "indigo",
    appearance: "icon-left",
    icon: "ArrowRight",
    onClick: undefined,
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export const NotRounded: Story = {
  name: "Square Corners",
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Tag label="Rounded" color="sky" rounded />
      <Tag label="Square" color="sky" rounded={false} />
    </div>
  ),
};

export const StatusLabels: Story = {
  name: "Status Label Examples",
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Tag label="Active" color="green" solid size="compact" />
      <Tag label="Pending" color="yellow" pastel size="compact" />
      <Tag label="Rejected" color="red" outlined size="compact" />
      <Tag label="On Hold" color="orange" pastel size="compact" />
      <Tag label="Closed" color="neutral" size="compact" />
    </div>
  ),
};
