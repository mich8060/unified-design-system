import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Badge from "./Badge";
import type { BadgeVariant } from "./Badge.types";

const ALL_VARIANTS: BadgeVariant[] = [
  "blue",
  "cyan",
  "green",
  "magenta",
  "indigo",
  "rose",
  "neutral",
  "orange",
  "purple",
  "red",
  "sky",
  "yellow",
  "inverse",
  "lime",
];

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: "number",
      description: "The numeric count to display. Hidden when 0 or falsy.",
    },
    variant: {
      control: "select",
      options: ALL_VARIANTS,
      description: "Color variant of the badge.",
    },
    appearance: {
      control: "select",
      options: ["solid", "outlined"],
      description: "Visual style: filled solid or outlined.",
    },
    rounded: {
      control: "boolean",
      description: "Fully rounded pill shape vs squared corners.",
    },
    maxCount: {
      control: "number",
      description: "Count ceiling — values above this show as maxCount+.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
  },
  args: {
    count: 5,
    variant: "red",
    appearance: "solid",
    rounded: true,
    maxCount: 99,
    className: "",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {};

export const SolidDefault: Story = {
  name: "Solid (Default)",
  args: {
    count: 7,
    variant: "red",
    appearance: "solid",
    rounded: true,
  },
};

export const Outlined: Story = {
  name: "Outlined",
  args: {
    count: 7,
    variant: "blue",
    appearance: "outlined",
    rounded: true,
  },
};

export const SquareCorners: Story = {
  name: "Square Corners",
  args: {
    count: 12,
    variant: "indigo",
    appearance: "solid",
    rounded: false,
  },
};

export const OverflowCount: Story = {
  name: "Overflow Count (99+)",
  args: {
    count: 200,
    variant: "red",
    appearance: "solid",
    maxCount: 99,
  },
};

export const CustomMaxCount: Story = {
  name: "Custom Max Count (9+)",
  args: {
    count: 42,
    variant: "orange",
    appearance: "solid",
    maxCount: 9,
  },
};

export const AllSolidVariants: Story = {
  name: "All Solid Variants",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      {ALL_VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Badge count={8} variant={variant} appearance="solid" />
          <span style={{ fontSize: 11 }}>{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllOutlinedVariants: Story = {
  name: "All Outlined Variants",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      {ALL_VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Badge count={8} variant={variant} appearance="outlined" />
          <span style={{ fontSize: 11 }}>{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const NotificationCountExamples: Story = {
  name: "Notification Count Examples",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Badge count={1} variant="red" />
      <Badge count={9} variant="red" />
      <Badge count={42} variant="red" />
      <Badge count={100} variant="red" />
      <Badge count={999} variant="red" maxCount={999} />
    </div>
  ),
};

export const ZeroHidden: Story = {
  name: "Zero / Falsy — Hidden",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <span>count=0 (hidden):</span>
      <Badge count={0} variant="red" />
      <span>count=5 (visible):</span>
      <Badge count={5} variant="red" />
    </div>
  ),
};
