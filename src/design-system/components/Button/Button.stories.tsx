import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: { type: "inline-radio" },
      options: ["primary", "soft", "outline", "text", "ghost", "disabled", "destructive"],
      description: "Visual style variant of the button.",
    },
    layout: {
      control: { type: "inline-radio" },
      options: ["label-only", "icon-left", "icon-right", "icon-only", "only"],
      description: "Controls how the label and icon are arranged.",
    },
    size: {
      control: { type: "inline-radio" },
      options: ["large", "default", "small", "xsmall"],
      description: "Size of the button.",
    },
    label: {
      control: { type: "text" },
      description: "Text content displayed inside the button.",
    },
    icon: {
      control: { type: "text" },
      description: "Phosphor icon name (string) or a ReactNode.",
    },
    iconSize: {
      control: { type: "number" },
      description: "Pixel size passed directly to the Icon component.",
    },
    loading: {
      control: { type: "boolean" },
      description: "When true, shows a spinning loader and disables the button.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "HTML disabled attribute; also disables click handling.",
    },
    onClick: {
      action: "clicked",
      description: "Callback fired when the button is clicked.",
    },
  },
  args: {
    label: "Save changes",
    appearance: "primary",
    layout: "label-only",
    size: "default",
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground — fully interactive, reflects all controls
// ---------------------------------------------------------------------------
export const Playground: Story = {};

// ---------------------------------------------------------------------------
// Appearances
// ---------------------------------------------------------------------------
export const AllAppearances: Story = {
  name: "All Appearances",
  render: (_args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
      <Button appearance="primary" label="Primary" />
      <Button appearance="soft" label="Soft" />
      <Button appearance="outline" label="Outline" />
      <Button appearance="text" label="Text" />
      <Button appearance="ghost" label="Ghost" />
      <Button appearance="destructive" label="Destructive" />
      <Button appearance="disabled" label="Disabled" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------
export const AllSizes: Story = {
  name: "All Sizes",
  render: (_args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
      <Button size="large" label="Large" />
      <Button size="default" label="Default" />
      <Button size="small" label="Small" />
      <Button size="xsmall" label="X-Small" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Layouts with icons
// ---------------------------------------------------------------------------
export const IconLayouts: Story = {
  name: "Icon Layouts",
  render: (_args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
      <Button layout="label-only" label="Label only" />
      <Button layout="icon-left" icon="ArrowLeft" label="Back to results" />
      <Button layout="icon-right" icon="ArrowRight" label="Continue" />
      <Button layout="icon-only" icon="MagnifyingGlass" label="Search" aria-label="Search" />
      <Button layout="only" icon="Plus" aria-label="Add item" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------
export const LoadingState: Story = {
  name: "Loading",
  args: {
    label: "Submitting…",
    appearance: "primary",
    loading: true,
  },
};

// ---------------------------------------------------------------------------
// Destructive / danger actions
// ---------------------------------------------------------------------------
export const Destructive: Story = {
  name: "Destructive",
  args: {
    label: "Delete account",
    appearance: "destructive",
    layout: "icon-left",
    icon: "Trash",
  },
};

// ---------------------------------------------------------------------------
// Disabled state (via prop, not appearance)
// ---------------------------------------------------------------------------
export const DisabledProp: Story = {
  name: "Disabled (prop)",
  args: {
    label: "Not available",
    appearance: "primary",
    disabled: true,
  },
};

// ---------------------------------------------------------------------------
// Icon-only variants across sizes
// ---------------------------------------------------------------------------
export const IconOnlySizes: Story = {
  name: "Icon Only — All Sizes",
  render: (_args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
      <Button size="large" layout="icon-only" icon="Gear" label="Settings" />
      <Button size="default" layout="icon-only" icon="Gear" label="Settings" />
      <Button size="small" layout="icon-only" icon="Gear" label="Settings" />
      <Button size="xsmall" layout="icon-only" icon="Gear" label="Settings" />
    </div>
  ),
};
