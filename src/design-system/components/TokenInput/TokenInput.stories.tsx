import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { TokenInput } from "./TokenInput";

const meta = {
  title: "Components/TokenInput",
  component: TokenInput,
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
    allowDuplicates: {
      control: "boolean",
      description: "Allow the same token to be added more than once",
    },
    maxTokens: {
      control: "number",
      description: "Maximum number of tokens allowed",
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
    onTokensChange: { action: "onTokensChange" },
    onInputValueChange: { action: "onInputValueChange" },
  },
  args: {
    size: "default",
    state: "default",
    disabled: false,
    allowDuplicates: false,
    placeholder: "Type and press comma, tab, or enter",
  },
} satisfies Meta<typeof TokenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Keywords",
    placeholder: "Add a keyword and press enter",
  },
};

export const WithInitialTokens: Story = {
  args: {
    label: "Specialties",
    defaultTokens: ["Cardiology", "Anesthesiology", "Neurology"],
    helperText: "Type a specialty and press enter to add it.",
  },
};

export const EmailAddresses: Story = {
  args: {
    label: "Share With",
    defaultTokens: ["dr.smith@hospital.org", "j.chen@clinic.com"],
    placeholder: "Add an email address",
    helperText: "Recipients will receive a copy of the report.",
  },
};

export const WithMaxTokens: Story = {
  args: {
    label: "Top Skills (max 5)",
    defaultTokens: ["Leadership", "Communication", "Critical Thinking"],
    maxTokens: 5,
    helperText: "Add up to 5 skills that best describe you.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Required Tags",
    defaultTokens: [],
    state: "error",
    errorText: "At least one tag is required.",
    placeholder: "Add a tag",
  },
};

export const Disabled: Story = {
  args: {
    label: "Assigned Facilities",
    defaultTokens: ["Phoenix General", "Mesa Regional", "Scottsdale Memorial"],
    disabled: true,
    helperText: "Facility assignments are managed by your coordinator.",
  },
};

export const CompactSize: Story = {
  args: {
    label: "Filters",
    size: "compact",
    defaultTokens: ["Remote", "Full-time"],
    placeholder: "Add filter",
  },
};

export const AllowDuplicates: Story = {
  args: {
    label: "Tags",
    allowDuplicates: true,
    placeholder: "Add a tag",
    helperText: "Duplicate tags are allowed in this field.",
  },
};
