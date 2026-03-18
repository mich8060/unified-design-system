import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import ProgressCircle from "./ProgressCircle";

const meta = {
  title: "Components/ProgressCircle",
  component: ProgressCircle,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value (0–100)",
      table: { defaultValue: { summary: "40" } },
    },
    max: {
      control: { type: "number" },
      description: "Maximum value used for percentage calculation",
      table: { defaultValue: { summary: "100" } },
    },
    size: {
      control: "select",
      options: ["xxs", "xs", "sm", "md", "lg"],
      description: "Size of the SVG circle",
      table: { defaultValue: { summary: "md" } },
    },
    shape: {
      control: "radio",
      options: ["circle", "half-circle"],
      description: "Full circle or semi-circular arc",
      table: { defaultValue: { summary: "circle" } },
    },
    label: {
      control: "text",
      description: "Optional descriptive label rendered inside the circle",
    },
    valueLabel: {
      control: "text",
      description:
        "Override the center value text. Defaults to the calculated percentage.",
    },
    showLabel: {
      control: "boolean",
      description: "Show the label text (if provided)",
      table: { defaultValue: { summary: "true" } },
    },
  },
  args: {
    value: 65,
    max: 100,
    size: "md",
    shape: "circle",
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", padding: "1.5rem", alignItems: "flex-start" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Circle — Default (md)",
  args: {
    value: 65,
    size: "md",
    shape: "circle",
  },
};

export const WithLabel: Story = {
  name: "Circle with Label",
  args: {
    value: 75,
    size: "md",
    shape: "circle",
    label: "Completed",
  },
};

export const WithCustomValueLabel: Story = {
  name: "Custom Center Text",
  args: {
    value: 42,
    size: "md",
    shape: "circle",
    label: "Tasks",
    valueLabel: "42 / 100",
  },
};

export const HalfCircle: Story = {
  name: "Half-Circle Shape",
  args: {
    value: 70,
    size: "md",
    shape: "half-circle",
    label: "Score",
  },
};

export const HalfCircleSmall: Story = {
  name: "Half-Circle — Small",
  args: {
    value: 55,
    size: "sm",
    shape: "half-circle",
  },
};

export const SizeXxs: Story = {
  name: "Size — XXS",
  args: {
    value: 60,
    size: "xxs",
    shape: "circle",
  },
};

export const SizeXs: Story = {
  name: "Size — XS",
  args: {
    value: 60,
    size: "xs",
    shape: "circle",
  },
};

export const SizeSm: Story = {
  name: "Size — SM",
  args: {
    value: 60,
    size: "sm",
    shape: "circle",
  },
};

export const SizeLg: Story = {
  name: "Size — LG",
  args: {
    value: 60,
    size: "lg",
    shape: "circle",
    label: "Progress",
  },
};

export const LowValue: Story = {
  name: "Low Value (10%)",
  args: {
    value: 10,
    size: "md",
    shape: "circle",
    label: "Started",
  },
};

export const Complete: Story = {
  name: "Completed (100%)",
  args: {
    value: 100,
    size: "md",
    shape: "circle",
    label: "Done",
  },
};

export const AllSizes: Story = {
  name: "All Sizes — Circle",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center" }}>
      {(["xxs", "xs", "sm", "md", "lg"] as const).map((size) => (
        <ProgressCircle key={size} value={65} size={size} shape="circle" label={size.toUpperCase()} />
      ))}
    </div>
  ),
};

export const AllSizesHalfCircle: Story = {
  name: "All Sizes — Half Circle",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "flex-end" }}>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <ProgressCircle key={size} value={65} size={size} shape="half-circle" label={size.toUpperCase()} />
      ))}
    </div>
  ),
};
