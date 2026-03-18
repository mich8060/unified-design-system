import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { TimeInput } from "./TimeInput";

const meta = {
  title: "Components/TimeInput",
  component: TimeInput,
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
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Shift Start Time",
  },
};

export const WithValue: Story = {
  args: {
    label: "Check-in Time",
    value: "07:00",
    helperText: "Arrival time at the facility.",
  },
};

export const NightShift: Story = {
  args: {
    label: "Night Shift Start",
    value: "19:00",
    helperText: "Night shifts typically begin at 7:00 PM.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Shift End Time",
    value: "06:00",
    state: "error",
    errorText: "End time must be after the start time.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Scheduled Start",
    value: "08:00",
    disabled: true,
    helperText: "Shift time is fixed and cannot be changed.",
  },
};

export const CompactSize: Story = {
  args: {
    label: "Time",
    size: "compact",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Preferred Start Time",
    min: "06:00",
    max: "18:00",
    helperText: "Day shifts are available between 6:00 AM and 6:00 PM.",
  },
};
