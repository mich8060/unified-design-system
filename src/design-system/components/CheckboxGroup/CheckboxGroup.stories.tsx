import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { CheckboxGroup } from "./CheckboxGroup";

const meta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Layout direction of the checkbox list",
    },
    disabled: {
      control: "boolean",
      description: "Disables all checkboxes in the group",
    },
    label: {
      control: "text",
      description: "Group label rendered above the options",
    },
    onChange: { action: "onChange" },
  },
  args: {
    orientation: "vertical",
    disabled: false,
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Specialties",
    options: [
      { value: "anesthesiology", label: "Anesthesiology" },
      { value: "cardiology", label: "Cardiology" },
      { value: "neurology", label: "Neurology" },
      { value: "oncology", label: "Oncology" },
    ],
  },
};

export const WithInitialValues: Story = {
  args: {
    label: "Preferred Work Settings",
    defaultValues: ["remote", "hybrid"],
    options: [
      { value: "remote", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "onsite", label: "On-site" },
      { value: "travel", label: "Travel" },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    label: "Available Days",
    orientation: "horizontal",
    defaultValues: ["monday", "tuesday", "wednesday"],
    options: [
      { value: "monday", label: "Mon" },
      { value: "tuesday", label: "Tue" },
      { value: "wednesday", label: "Wed" },
      { value: "thursday", label: "Thu" },
      { value: "friday", label: "Fri" },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: "License Types",
    disabled: true,
    defaultValues: ["md"],
    options: [
      { value: "md", label: "MD" },
      { value: "do", label: "DO" },
      { value: "np", label: "NP" },
      { value: "pa", label: "PA" },
    ],
  },
};

export const PartiallyDisabled: Story = {
  args: {
    label: "Notification Preferences",
    defaultValues: ["email"],
    options: [
      { value: "email", label: "Email" },
      { value: "sms", label: "SMS" },
      { value: "push", label: "Push notifications", disabled: true },
      { value: "inapp", label: "In-app", disabled: true },
    ],
  },
};

export const NoLabel: Story = {
  args: {
    options: [
      { value: "terms", label: "I agree to the Terms of Service" },
      { value: "privacy", label: "I agree to the Privacy Policy" },
      { value: "marketing", label: "Send me marketing emails" },
    ],
  },
};

export const AllSelected: Story = {
  args: {
    label: "Shift Types",
    defaultValues: ["days", "evenings", "nights", "weekends"],
    options: [
      { value: "days", label: "Days" },
      { value: "evenings", label: "Evenings" },
      { value: "nights", label: "Nights" },
      { value: "weekends", label: "Weekends" },
    ],
  },
};
