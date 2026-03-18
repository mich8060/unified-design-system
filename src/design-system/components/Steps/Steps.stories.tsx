import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Steps from "./Steps";

const meta = {
  title: "Components/Steps",
  component: Steps,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout direction of the step list",
      table: { defaultValue: { summary: "horizontal" } },
    },
    size: {
      control: "radio",
      options: ["default", "compact"],
      description: "Size variant of the step indicators",
      table: { defaultValue: { summary: "default" } },
    },
    displayLabel: {
      control: "boolean",
      description: "Whether to render the text labels beneath each step",
      table: { defaultValue: { summary: "true" } },
    },
    steps: {
      control: "object",
      description:
        "Array of step objects. Each item: { label, optionalLabel, status }. Status values: complete | active | incomplete | disabled | error",
    },
  },
  args: {
    orientation: "horizontal",
    size: "default",
    displayLabel: true,
  },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Shared step data
// ---------------------------------------------------------------------------

const BASIC_STEPS = [
  { label: "Account Info", status: "complete" },
  { label: "Plan Selection", status: "active" },
  { label: "Payment", status: "incomplete" },
  { label: "Confirmation", status: "incomplete" },
];

const STEPS_WITH_OPTIONAL = [
  { label: "Personal Details", optionalLabel: "Required", status: "complete" },
  { label: "Address", optionalLabel: "Optional", status: "complete" },
  { label: "Documents", optionalLabel: "Optional", status: "active" },
  { label: "Review", status: "incomplete" },
  { label: "Submit", status: "incomplete" },
];

const STEPS_WITH_ERROR = [
  { label: "Personal Info", status: "complete" },
  { label: "Verification", status: "error" },
  { label: "Payment", status: "incomplete" },
  { label: "Done", status: "incomplete" },
];

const STEPS_WITH_DISABLED = [
  { label: "Step One", status: "complete" },
  { label: "Step Two", status: "active" },
  { label: "Step Three", status: "disabled" },
  { label: "Step Four", status: "disabled" },
];

const ALL_STATUSES = [
  { label: "Complete", status: "complete" },
  { label: "Active", status: "active" },
  { label: "Incomplete", status: "incomplete" },
  { label: "Error", status: "error" },
  { label: "Disabled", status: "disabled" },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Horizontal (Default)",
  args: {
    steps: BASIC_STEPS,
    orientation: "horizontal",
    size: "default",
  },
};

export const Vertical: Story = {
  name: "Vertical Orientation",
  args: {
    steps: BASIC_STEPS,
    orientation: "vertical",
    size: "default",
  },
};

export const Compact: Story = {
  name: "Compact Size",
  args: {
    steps: BASIC_STEPS,
    orientation: "horizontal",
    size: "compact",
  },
};

export const CompactVertical: Story = {
  name: "Compact + Vertical",
  args: {
    steps: BASIC_STEPS,
    orientation: "vertical",
    size: "compact",
  },
};

export const WithOptionalLabels: Story = {
  name: "With Optional Sub-labels",
  args: {
    steps: STEPS_WITH_OPTIONAL,
    orientation: "horizontal",
    size: "default",
  },
};

export const WithError: Story = {
  name: "Error State",
  args: {
    steps: STEPS_WITH_ERROR,
    orientation: "horizontal",
    size: "default",
  },
};

export const WithDisabled: Story = {
  name: "Disabled Steps",
  args: {
    steps: STEPS_WITH_DISABLED,
    orientation: "horizontal",
    size: "default",
  },
};

export const AllStatuses: Story = {
  name: "All Status Variants",
  args: {
    steps: ALL_STATUSES,
    orientation: "horizontal",
    size: "default",
  },
};

export const NoLabels: Story = {
  name: "Without Labels",
  args: {
    steps: BASIC_STEPS,
    orientation: "horizontal",
    size: "default",
    displayLabel: false,
  },
};

export const LongFlow: Story = {
  name: "Long Multi-step Flow (Vertical)",
  args: {
    steps: [
      { label: "Create Account", status: "complete" },
      { label: "Verify Email", status: "complete" },
      { label: "Set Up Profile", status: "complete" },
      { label: "Choose Plan", status: "active" },
      { label: "Add Payment Method", status: "incomplete" },
      { label: "Review & Confirm", status: "incomplete" },
    ],
    orientation: "vertical",
    size: "default",
  },
};
