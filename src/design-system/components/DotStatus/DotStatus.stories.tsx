import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import DotStatus from "./DotStatus";

const ALL_VARIANTS = [
  "red",
  "blue",
  "inverse",
  "orange",
  "sky",
  "indigo",
  "rose",
  "neutral",
  "celery",
  "lime",
  "yellow",
  "green",
  "cyan",
  "purple",
  "fuchsia",
] as const;

const ALL_SIZES = ["small", "medium", "large"] as const;

const meta = {
  title: "Components/DotStatus",
  component: DotStatus,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ALL_VARIANTS,
      description: "Color variant of the dot.",
    },
    size: {
      control: "select",
      options: ALL_SIZES,
      description: "Size of the dot indicator.",
    },
    outline: {
      control: "boolean",
      description: "Adds a visible border around the dot.",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for screen readers. Defaults to \"<variant> status\".",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
  },
  args: {
    variant: "blue",
    size: "medium",
    outline: false,
    className: "",
  },
} satisfies Meta<typeof DotStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {};

export const Default: Story = {
  name: "Default (Blue, Medium)",
  args: {
    variant: "blue",
    size: "medium",
    outline: false,
  },
};

export const SizeVariants: Story = {
  name: "Size Variants",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {ALL_SIZES.map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DotStatus variant="green" size={size} />
          <span style={{ fontSize: 11 }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const WithOutline: Story = {
  name: "With Outline",
  args: {
    variant: "green",
    size: "medium",
    outline: true,
  },
};

export const OutlineVsNoOutline: Story = {
  name: "Outline vs No Outline",
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <DotStatus variant="blue" size="large" outline={false} />
        <span style={{ fontSize: 11 }}>No outline</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <DotStatus variant="blue" size="large" outline />
        <span style={{ fontSize: 11 }}>With outline</span>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  name: "All Color Variants",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      {ALL_VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DotStatus variant={variant} size="medium" />
          <span style={{ fontSize: 11 }}>{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllVariantsWithOutline: Story = {
  name: "All Color Variants — Outlined",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      {ALL_VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DotStatus variant={variant} size="medium" outline />
          <span style={{ fontSize: 11 }}>{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const SmallDots: Story = {
  name: "Small Dots — All Colors",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      {ALL_VARIANTS.map((variant) => (
        <DotStatus key={variant} variant={variant} size="small" aria-label={`${variant} status`} />
      ))}
    </div>
  ),
};

export const LargeDots: Story = {
  name: "Large Dots — All Colors",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      {ALL_VARIANTS.map((variant) => (
        <DotStatus key={variant} variant={variant} size="large" aria-label={`${variant} status`} />
      ))}
    </div>
  ),
};

export const InlineWithText: Story = {
  name: "Inline With Text Label",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { variant: "green", label: "Available for assignment" },
        { variant: "yellow", label: "Pending credentialing" },
        { variant: "red", label: "Not available" },
        { variant: "neutral", label: "Retired" },
        { variant: "blue", label: "On assignment" },
      ].map(({ variant, label }) => (
        <div key={variant} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <DotStatus variant={variant} size="small" aria-label={`${variant} status`} />
          <span style={{ fontSize: 14 }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};
