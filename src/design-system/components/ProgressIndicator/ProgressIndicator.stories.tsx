import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import ProgressIndicator from "./ProgressIndicator";

const meta = {
  title: "Components/ProgressIndicator",
  component: ProgressIndicator,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value (0–100)",
      table: { defaultValue: { summary: "0" } },
    },
    max: {
      control: { type: "number" },
      description: "Maximum value used for percentage calculation",
      table: { defaultValue: { summary: "100" } },
    },
    variant: {
      control: "select",
      options: [
        "default",
        "blue",
        "green",
        "success",
        "orange",
        "warning",
        "red",
        "error",
        "purple",
      ],
      description: "Color variant of the progress fill",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Height of the progress bar track",
      table: { defaultValue: { summary: "medium" } },
    },
    labelPosition: {
      control: "select",
      options: ["false", "right", "bottom", "top-floating", "bottom-floating"],
      description: "Position of the percentage value display",
    },
    showValue: {
      control: "boolean",
      description:
        "Shorthand to show the percentage value to the right of the bar (sets labelPosition='right' when no labelPosition is provided)",
      table: { defaultValue: { summary: "false" } },
    },
    showLabel: {
      control: "boolean",
      description: "Show the text label above the bar (if a label is provided)",
      table: { defaultValue: { summary: "true" } },
    },
    label: {
      control: "text",
      description: "Text label rendered above the progress bar",
    },
  },
  args: {
    value: 60,
    max: 100,
    variant: "default",
    size: "medium",
    showValue: false,
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1.5rem", maxWidth: "560px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default",
  args: {
    value: 60,
    label: "Upload Progress",
  },
};

export const WithValueRight: Story = {
  name: "Value Label — Right",
  args: {
    value: 72,
    label: "Storage Used",
    labelPosition: "right",
  },
};

export const WithValueBottom: Story = {
  name: "Value Label — Bottom",
  args: {
    value: 45,
    label: "Download Progress",
    labelPosition: "bottom",
  },
};

export const WithFloatingTopLabel: Story = {
  name: "Value Label — Top Floating",
  args: {
    value: 55,
    label: "Profile Completion",
    labelPosition: "top-floating",
  },
};

export const WithFloatingBottomLabel: Story = {
  name: "Value Label — Bottom Floating",
  args: {
    value: 80,
    label: "Sync Status",
    labelPosition: "bottom-floating",
  },
};

export const SizeSmall: Story = {
  name: "Size — Small",
  args: {
    value: 40,
    size: "small",
    label: "Small bar",
    labelPosition: "right",
  },
};

export const SizeLarge: Story = {
  name: "Size — Large",
  args: {
    value: 40,
    size: "large",
    label: "Large bar",
    labelPosition: "right",
  },
};

export const VariantGreen: Story = {
  name: "Variant — Green (Success)",
  args: {
    value: 85,
    variant: "green",
    label: "Task Complete",
    labelPosition: "right",
  },
};

export const VariantOrange: Story = {
  name: "Variant — Orange (Warning)",
  args: {
    value: 55,
    variant: "orange",
    label: "Disk Usage",
    labelPosition: "right",
  },
};

export const VariantRed: Story = {
  name: "Variant — Red (Error)",
  args: {
    value: 30,
    variant: "red",
    label: "Error Rate",
    labelPosition: "right",
  },
};

export const VariantPurple: Story = {
  name: "Variant — Purple",
  args: {
    value: 65,
    variant: "purple",
    label: "Processing",
    labelPosition: "right",
  },
};

export const VariantBlue: Story = {
  name: "Variant — Blue",
  args: {
    value: 50,
    variant: "blue",
    label: "Loading",
    labelPosition: "right",
  },
};

export const NoLabel: Story = {
  name: "No Label",
  args: {
    value: 70,
    showLabel: false,
    labelPosition: "right",
  },
};

export const AllVariants: Story = {
  name: "All Color Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {(
        [
          "default",
          "blue",
          "green",
          "orange",
          "red",
          "purple",
        ] as const
      ).map((variant) => (
        <ProgressIndicator
          key={variant}
          value={65}
          variant={variant}
          label={variant.charAt(0).toUpperCase() + variant.slice(1)}
          labelPosition="right"
          size="medium"
        />
      ))}
    </div>
  ),
};
