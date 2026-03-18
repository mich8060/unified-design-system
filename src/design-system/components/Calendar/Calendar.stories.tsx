import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Calendar from "./Calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    view: {
      control: "radio",
      options: ["month", "week"],
      description: "Calendar view mode",
    },
    size: {
      control: "radio",
      options: ["default", "compact"],
      description: "Calendar size variant",
    },
    maxEventsPerDay: {
      control: "number",
      description: "Maximum number of event rows shown per day cell before overflow",
    },
    showWeekNumbers: {
      control: "boolean",
      description: "Show ISO week number column",
    },
    onDateSelect: { action: "onDateSelect" },
    onEventClick: { action: "onEventClick" },
  },
  args: {
    view: "month",
    size: "default",
    maxEventsPerDay: 3,
    showWeekNumbers: false,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultDate: new Date(2026, 2, 1), // March 2026
  },
};

export const WithSelectedDate: Story = {
  args: {
    defaultDate: new Date(2026, 2, 1),
    value: new Date(2026, 2, 18),
  },
};

export const WithEvents: Story = {
  args: {
    defaultDate: new Date(2026, 2, 1),
    events: [
      {
        id: "1",
        title: "Travel to Phoenix",
        startDate: new Date(2026, 2, 9),
        endDate: new Date(2026, 2, 9),
        type: "travel",
        status: "active",
      },
      {
        id: "2",
        title: "Cardiology Assignment",
        startDate: new Date(2026, 2, 10),
        endDate: new Date(2026, 2, 20),
        type: "assignment",
        status: "active",
      },
      {
        id: "3",
        title: "Return Travel",
        startDate: new Date(2026, 2, 21),
        endDate: new Date(2026, 2, 21),
        type: "travel",
        status: "active",
      },
      {
        id: "4",
        title: "Pending Shift",
        startDate: new Date(2026, 2, 25),
        endDate: new Date(2026, 2, 27),
        type: "assignment",
        status: "pending",
      },
    ],
  },
};

export const WeekView: Story = {
  args: {
    view: "week",
    defaultDate: new Date(2026, 2, 16),
    events: [
      {
        id: "1",
        title: "Morning Rounds",
        startDate: new Date(2026, 2, 16),
        startTime: "07:00",
        type: "assignment",
        status: "active",
      },
      {
        id: "2",
        title: "Conference",
        startDate: new Date(2026, 2, 17),
        endDate: new Date(2026, 2, 18),
        type: "travel",
        status: "active",
      },
    ],
  },
};

export const CompactSize: Story = {
  args: {
    size: "compact",
    defaultDate: new Date(2026, 2, 1),
    events: [
      {
        id: "1",
        title: "Assignment",
        startDate: new Date(2026, 2, 10),
        endDate: new Date(2026, 2, 14),
        type: "assignment",
        status: "active",
      },
    ],
  },
};

export const WithWeekNumbers: Story = {
  args: {
    defaultDate: new Date(2026, 2, 1),
    showWeekNumbers: true,
    events: [
      {
        id: "1",
        title: "ICU Rotation",
        startDate: new Date(2026, 2, 2),
        endDate: new Date(2026, 2, 8),
        type: "assignment",
        status: "active",
      },
    ],
  },
};

export const DenseEvents: Story = {
  args: {
    defaultDate: new Date(2026, 2, 1),
    maxEventsPerDay: 2,
    events: [
      {
        id: "1",
        title: "Shift A",
        startDate: new Date(2026, 2, 16),
        type: "assignment",
        status: "active",
      },
      {
        id: "2",
        title: "Shift B",
        startDate: new Date(2026, 2, 16),
        type: "assignment",
        status: "pending",
      },
      {
        id: "3",
        title: "Shift C",
        startDate: new Date(2026, 2, 16),
        type: "travel",
        status: "active",
      },
      {
        id: "4",
        title: "Shift D",
        startDate: new Date(2026, 2, 16),
        type: "assignment",
        status: "active",
      },
    ],
  },
};
