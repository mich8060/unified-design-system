import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DateRangeInput } from "./DateRangeInput";

const meta = {
  title: "Components/DateRangeInput",
  component: DateRangeInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "compact"],
      description: "Size applied to both date inputs",
    },
    state: {
      control: "select",
      options: ["default", "focused", "error", "disabled"],
      description: "Visual state applied to both date inputs",
    },
    disabled: {
      control: "boolean",
    },
    startLabel: {
      control: "text",
    },
    endLabel: {
      control: "text",
    },
    startPlaceholder: {
      control: "text",
    },
    endPlaceholder: {
      control: "text",
    },
    onStartChange: { action: "onStartChange" },
    onEndChange: { action: "onEndChange" },
  },
  args: {
    size: "default",
    state: "default",
    disabled: false,
    startPlaceholder: "Start date",
    endPlaceholder: "End date",
  },
} satisfies Meta<typeof DateRangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startLabel: "From",
    endLabel: "To",
  },
};

export const WithValues: Story = {
  args: {
    startLabel: "Assignment Start",
    endLabel: "Assignment End",
    startValue: "2026-06-01",
    endValue: "2026-09-30",
  },
};

export const ErrorState: Story = {
  args: {
    startLabel: "Check-in",
    endLabel: "Check-out",
    startValue: "2026-10-15",
    endValue: "2026-10-10",
    state: "error",
  },
};

export const Disabled: Story = {
  args: {
    startLabel: "Contract Start",
    endLabel: "Contract End",
    startValue: "2026-01-01",
    endValue: "2026-12-31",
    disabled: true,
  },
};

export const CompactSize: Story = {
  args: {
    size: "compact",
    startLabel: "From",
    endLabel: "To",
  },
};

export const CustomPlaceholders: Story = {
  args: {
    startLabel: "Availability Start",
    endLabel: "Availability End",
    startPlaceholder: "mm/dd/yyyy",
    endPlaceholder: "mm/dd/yyyy",
  },
};
