import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { URLInput } from "./URLInput";

const meta = {
  title: "Components/URLInput",
  component: URLInput,
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
    placeholder: "https://",
  },
} satisfies Meta<typeof URLInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Website",
    placeholder: "https://",
  },
};

export const WithValue: Story = {
  args: {
    label: "Facility Website",
    value: "https://www.example-hospital.org",
    helperText: "Include the full URL with https://",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Profile Link",
    value: "not-a-valid-url",
    state: "error",
    errorText: "Please enter a valid URL starting with https://",
  },
};

export const Disabled: Story = {
  args: {
    label: "Organization URL",
    value: "https://www.comphealth.com",
    disabled: true,
    helperText: "Contact your administrator to update this URL.",
  },
};

export const CompactSize: Story = {
  args: {
    label: "Reference Link",
    size: "compact",
    placeholder: "https://",
  },
};

export const NoLabel: Story = {
  args: {
    placeholder: "https://your-portfolio.com",
    "aria-label": "Portfolio URL",
    helperText: "Link to your professional portfolio",
  },
};
