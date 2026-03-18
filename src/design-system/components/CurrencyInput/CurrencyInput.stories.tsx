import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { CurrencyInput } from "./CurrencyInput";

const meta = {
  title: "Components/CurrencyInput",
  component: CurrencyInput,
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
    onChange: { action: "onChange" },
  },
  args: {
    size: "default",
    state: "default",
    disabled: false,
    placeholder: "0.00",
  },
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Hourly Rate",
    placeholder: "0.00",
  },
};

export const WithValue: Story = {
  args: {
    label: "Contract Amount",
    value: "12500.00",
    helperText: "Total payment for the assignment period",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Compensation",
    value: "abc",
    state: "error",
    errorText: "Please enter a valid dollar amount.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Base Salary",
    value: "95000.00",
    disabled: true,
    helperText: "Salary is set by your contract and cannot be changed here.",
  },
};

export const CompactSize: Story = {
  args: {
    label: "Per Diem",
    size: "compact",
    placeholder: "0.00",
    helperText: "Daily expense allowance",
  },
};

export const NoLabel: Story = {
  args: {
    placeholder: "Enter amount",
    "aria-label": "Payment amount",
  },
};
