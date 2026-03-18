import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { NumberInput } from "./NumberInput";

const meta = {
  title: "Components/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "compact"],
      description: "Input size variant",
    },
    state: {
      control: "select",
      options: ["default", "focused", "error", "disabled"],
      description: "Visual state of the input",
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    helperText: {
      control: "text",
    },
    errorText: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
    onChange: { action: "onChange" },
  },
  args: {
    size: "default",
    state: "default",
    disabled: false,
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Years of Experience",
    placeholder: "0",
  },
};

export const WithValue: Story = {
  args: {
    label: "Shift Length (hours)",
    value: 12,
    helperText: "Typical shift lengths are 8, 10, or 12 hours.",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Positions Available",
    value: 3,
    min: 1,
    max: 50,
    helperText: "Must be between 1 and 50.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Weekly Hours",
    value: 100,
    state: "error",
    errorText: "Weekly hours cannot exceed 80.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Approved Positions",
    value: 5,
    disabled: true,
    helperText: "This value is set by your staffing coordinator.",
  },
};

export const CompactSize: Story = {
  args: {
    label: "Quantity",
    size: "compact",
    value: 1,
    min: 1,
  },
};

export const WithStep: Story = {
  args: {
    label: "Compensation (per $500)",
    value: 5000,
    step: 500,
    min: 0,
    helperText: "Adjust in $500 increments.",
  },
};
