import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { PhoneInput } from "./PhoneInput";

const meta = {
  title: "Components/PhoneInput",
  component: PhoneInput,
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
    maxDigits: {
      control: "number",
      description: "Maximum number of digits allowed (default 10)",
    },
    onChange: { action: "onChange" },
    onValidityChange: { action: "onValidityChange" },
  },
  args: {
    size: "default",
    state: "default",
    disabled: false,
    placeholder: "(555) 123-4567",
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
  },
};

export const WithValue: Story = {
  args: {
    label: "Mobile Number",
    value: "(602) 555-0198",
    helperText: "Used for shift alerts and two-factor authentication.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Contact Phone",
    value: "(602) 555",
    state: "error",
    errorText: "Please enter a valid 10-digit phone number.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Facility Contact",
    value: "(800) 555-0147",
    disabled: true,
    helperText: "Contact your recruiter to update this number.",
  },
};

export const CompactSize: Story = {
  args: {
    label: "Phone",
    size: "compact",
    placeholder: "(555) 000-0000",
  },
};

export const CustomErrorText: Story = {
  args: {
    label: "Emergency Contact Phone",
    placeholder: "(555) 123-4567",
    errorText: "This phone number is required for emergency contact.",
    helperText: "Must be a US 10-digit number.",
  },
};
