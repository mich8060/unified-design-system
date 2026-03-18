import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Datepicker from "./Datepicker";

const meta = {
  title: "Components/Datepicker",
  component: Datepicker,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["desktop", "mobile"],
      description: "Calendar size variant",
    },
    showWeekdays: {
      control: "boolean",
      description: "Show the weekday header row",
    },
    onDateSelect: { action: "onDateSelect" },
  },
  args: {
    size: "desktop",
    showWeekdays: true,
  },
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    month: new Date(2026, 2, 1), // March 2026
  },
};

export const WithSelectedDate: Story = {
  args: {
    month: new Date(2026, 2, 1),
    value: new Date(2026, 2, 18),
  },
};

export const WithDateRange: Story = {
  args: {
    month: new Date(2026, 2, 1),
    startDate: new Date(2026, 2, 10),
    endDate: new Date(2026, 2, 20),
  },
};

export const WithUnavailableDates: Story = {
  args: {
    month: new Date(2026, 2, 1),
    unavailableDates: [
      new Date(2026, 2, 5),
      new Date(2026, 2, 6),
      new Date(2026, 2, 7),
      new Date(2026, 2, 14),
      new Date(2026, 2, 15),
    ],
  },
};

export const WithDateData: Story = {
  args: {
    month: new Date(2026, 2, 1),
    dateData: {
      "2026-03-10": { travel: true },
      "2026-03-11": { onAssignment: true },
      "2026-03-12": { onAssignment: true },
      "2026-03-13": { onAssignment: true, travel: true },
      "2026-03-17": { travel: true },
    },
  },
};

export const MobileSize: Story = {
  args: {
    size: "mobile",
    month: new Date(2026, 2, 1),
    value: new Date(2026, 2, 18),
  },
};

export const NoWeekdayHeader: Story = {
  args: {
    month: new Date(2026, 2, 1),
    showWeekdays: false,
  },
};
