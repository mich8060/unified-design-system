import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DateInput } from "./DateInput";

const meta = {
  title: "Components/DateInput",
  component: DateInput,
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
    onChange: { action: "onChange" },
  },
  args: {
    size: "default",
    state: "default",
    disabled: false,
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Start Date",
  },
};

export const WithValue: Story = {
  args: {
    label: "Assignment Start Date",
    value: "2026-04-01",
    helperText: "Date when the assignment begins",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Date of Birth",
    value: "2030-01-01",
    state: "error",
    errorText: "Date of birth cannot be in the future.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Contract End Date",
    value: "2026-12-31",
    disabled: true,
    helperText: "This date is locked by your contract.",
  },
};

export const CompactSize: Story = {
  args: {
    label: "Effective Date",
    size: "compact",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Preferred Start Date",
    min: "2026-03-18",
    max: "2026-12-31",
    helperText: "Must be within the current year.",
  },
};
