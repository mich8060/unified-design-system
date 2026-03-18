import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Slider from "./Slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Minimum value of the slider",
      table: { defaultValue: { summary: "0" } },
    },
    max: {
      control: { type: "number" },
      description: "Maximum value of the slider",
      table: { defaultValue: { summary: "100" } },
    },
    step: {
      control: { type: "number", min: 1 },
      description: "Step increment between selectable values",
      table: { defaultValue: { summary: "1" } },
    },
    range: {
      control: "boolean",
      description: "Enable range mode (two handles — min and max)",
      table: { defaultValue: { summary: "false" } },
    },
    showLabels: {
      control: "boolean",
      description: "Show value labels below the track",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Disable all user interaction with the slider",
      table: { defaultValue: { summary: "false" } },
    },
    label: {
      control: "text",
      description: "Optional label rendered above the slider track",
    },
    onChange: {
      action: "changed",
      description:
        "Callback fired when the value changes. Receives a number (single) or [number, number] (range).",
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    range: false,
    showLabels: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", maxWidth: "480px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Single Slider",
  args: {
    value: 40,
    label: "Volume",
  },
};

export const WithLabels: Story = {
  name: "With Value Labels",
  args: {
    value: 60,
    label: "Brightness",
    showLabels: true,
  },
};

export const Range: Story = {
  name: "Range Slider",
  args: {
    value: [20, 75],
    range: true,
    label: "Price Range",
  },
};

export const RangeWithLabels: Story = {
  name: "Range Slider with Labels",
  args: {
    value: [15, 85],
    range: true,
    label: "Temperature Range",
    showLabels: true,
  },
};

export const Disabled: Story = {
  name: "Disabled State",
  args: {
    value: 50,
    label: "Opacity",
    disabled: true,
  },
};

export const DisabledRange: Story = {
  name: "Disabled Range Slider",
  args: {
    value: [25, 70],
    range: true,
    label: "Date Range",
    disabled: true,
  },
};

export const CustomStep: Story = {
  name: "Custom Step (10)",
  args: {
    value: 30,
    step: 10,
    label: "Quantity (steps of 10)",
    showLabels: true,
  },
};

export const CustomMinMax: Story = {
  name: "Custom Min / Max",
  args: {
    value: 50,
    min: -50,
    max: 50,
    label: "Balance (-50 to 50)",
    showLabels: true,
  },
};

export const NoLabel: Story = {
  name: "Without Label",
  args: {
    value: 33,
  },
};
