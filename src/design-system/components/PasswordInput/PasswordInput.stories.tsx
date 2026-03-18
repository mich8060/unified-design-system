import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { PasswordInput } from "./PasswordInput";

const meta = {
  title: "Components/PasswordInput",
  component: PasswordInput,
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
    showToggle: {
      control: "boolean",
      description: "Show the eye icon to toggle password visibility",
    },
    initiallyVisible: {
      control: "boolean",
      description: "Start with the password text visible",
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
    showToggle: true,
    initiallyVisible: false,
    placeholder: "Enter password",
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
  },
};

export const WithValue: Story = {
  args: {
    label: "Current Password",
    value: "MySecretPassword123!",
    helperText: "At least 8 characters with a number and special character.",
  },
};

export const InitiallyVisible: Story = {
  args: {
    label: "New Password",
    value: "MyNewPassword456!",
    initiallyVisible: true,
  },
};

export const WithoutToggle: Story = {
  args: {
    label: "PIN",
    placeholder: "Enter your PIN",
    showToggle: false,
    helperText: "Your 4–6 digit PIN.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Password",
    value: "weak",
    state: "error",
    errorText: "Password must be at least 8 characters.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Password",
    value: "LockedPassword!",
    disabled: true,
    helperText: "Contact support to reset your password.",
  },
};

export const CompactSize: Story = {
  args: {
    label: "API Key",
    size: "compact",
    placeholder: "sk-...",
    helperText: "Your secret API key. Never share this.",
  },
};
