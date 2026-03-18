import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Status from "./Status";
import type { StatusAppearance, StatusShape } from "./Status.types";

// Variants come from DotStatus — enumerate all valid values
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

const ALL_APPEARANCES: StatusAppearance[] = ["light-gray", "white", "transparent"];
const ALL_SHAPES: StatusShape[] = ["pill", "rounded"];

const meta = {
  title: "Components/Status",
  component: Status,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Text label shown next to the status dot.",
    },
    variant: {
      control: "select",
      options: ALL_VARIANTS,
      description: "Color variant of the status dot.",
    },
    appearance: {
      control: "select",
      options: ALL_APPEARANCES,
      description: "Background color of the status container.",
    },
    shape: {
      control: "select",
      options: ALL_SHAPES,
      description: "Corner radius style: pill (fully rounded) or rounded (slight radius).",
    },
    disabled: {
      control: "boolean",
      description: "Disables click interaction and applies disabled styling.",
    },
    onClick: {
      action: "clicked",
      description: "Optional click handler — renders the status as a button when provided.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
  },
  args: {
    label: "Active",
    variant: "green",
    appearance: "light-gray",
    shape: "pill",
    disabled: false,
    className: "",
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {};

export const Default: Story = {
  name: "Default (Light Gray, Pill)",
  args: {
    label: "Active",
    variant: "green",
    appearance: "light-gray",
    shape: "pill",
  },
};

export const WhiteBackground: Story = {
  name: "White Appearance",
  args: {
    label: "Pending",
    variant: "yellow",
    appearance: "white",
    shape: "pill",
  },
};

export const TransparentBackground: Story = {
  name: "Transparent Appearance",
  args: {
    label: "Inactive",
    variant: "neutral",
    appearance: "transparent",
    shape: "pill",
  },
};

export const RoundedShape: Story = {
  name: "Rounded Shape",
  args: {
    label: "In Review",
    variant: "blue",
    appearance: "light-gray",
    shape: "rounded",
  },
};

export const DisabledState: Story = {
  name: "Disabled",
  args: {
    label: "Unavailable",
    variant: "neutral",
    appearance: "light-gray",
    disabled: true,
  },
};

export const ClickableStatus: Story = {
  name: "Clickable (Button Render)",
  argTypes: {
    onClick: { action: "statusClicked" },
  },
  args: {
    label: "Click to update",
    variant: "sky",
    appearance: "light-gray",
  },
};

export const AllVariants: Story = {
  name: "All Dot Variants",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {ALL_VARIANTS.map((variant) => (
        <Status key={variant} label={variant} variant={variant} appearance="light-gray" shape="pill" />
      ))}
    </div>
  ),
};

export const AllAppearances: Story = {
  name: "All Appearances",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16, background: "#f0f0f0" }}>
      {ALL_APPEARANCES.map((appearance) => (
        <div key={appearance} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 120, fontSize: 12 }}>{appearance}</span>
          <Status label="Active" variant="green" appearance={appearance} shape="pill" />
          <Status label="Pending" variant="yellow" appearance={appearance} shape="pill" />
          <Status label="Inactive" variant="neutral" appearance={appearance} shape="pill" />
        </div>
      ))}
    </div>
  ),
};

export const AllShapes: Story = {
  name: "Pill vs Rounded",
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Status label="Pill shape" variant="indigo" appearance="light-gray" shape="pill" />
      <Status label="Rounded shape" variant="indigo" appearance="light-gray" shape="rounded" />
    </div>
  ),
};

export const ClinicalStatusExamples: Story = {
  name: "Clinical Status Examples",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Status label="Available" variant="green" appearance="light-gray" shape="pill" />
      <Status label="On Assignment" variant="blue" appearance="light-gray" shape="pill" />
      <Status label="Pending Credentialing" variant="yellow" appearance="light-gray" shape="pill" />
      <Status label="Not Available" variant="red" appearance="light-gray" shape="pill" />
      <Status label="Do Not Use" variant="rose" appearance="light-gray" shape="pill" />
      <Status label="Retired" variant="neutral" appearance="light-gray" shape="pill" />
    </div>
  ),
};
