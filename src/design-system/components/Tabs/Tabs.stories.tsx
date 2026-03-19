import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Tabs from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: "select",
      options: ["underline", "block", "block-inverted"],
      description: "Visual style variant of the tab bar",
      table: { defaultValue: { summary: "underline" } },
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout orientation of the tab list",
      table: { defaultValue: { summary: "horizontal" } },
    },
    activeTab: {
      control: { type: "number", min: 0, step: 1 },
      description: "Zero-based index of the currently active tab",
    },
    fill: {
      control: "boolean",
      description: "Whether tabs stretch to fill the available width",
      table: { defaultValue: { summary: "false" } },
    },
    scrollable: {
      control: "boolean",
      description: "Enable horizontal scroll when tabs overflow (horizontal only)",
      table: { defaultValue: { summary: "false" } },
    },
    onTabChange: {
      action: "tabChanged",
      description: "Callback fired when the active tab changes: (index, tab) => void",
    },
  },
  args: {
    activeTab: 0,
    appearance: "underline",
    orientation: "horizontal",
    fill: false,
    scrollable: false,
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const BASE_TABS = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details" },
  { id: "activity", label: "Activity" },
  { id: "settings", label: "Settings" },
];

const TABS_WITH_ICONS = [
  { id: "home", label: "Home", icon: "House" },
  { id: "profile", label: "Profile", icon: "User" },
  { id: "messages", label: "Messages", icon: "ChatCircle", tag: 4 },
  { id: "notifications", label: "Notifications", icon: "Bell" },
];

const MANY_TABS = [
  { id: "tab1", label: "Dashboard" },
  { id: "tab2", label: "Analytics" },
  { id: "tab3", label: "Reports" },
  { id: "tab4", label: "Campaigns" },
  { id: "tab5", label: "Audience" },
  { id: "tab6", label: "Integrations" },
  { id: "tab7", label: "Billing" },
  { id: "tab8", label: "Settings" },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Underline (Default)",
  args: {
    tabs: BASE_TABS,
    appearance: "underline",
    activeTab: 0,
  },
};

export const Block: Story = {
  name: "Block Appearance",
  args: {
    tabs: BASE_TABS,
    appearance: "block",
    activeTab: 0,
  },
};

export const BlockInverted: Story = {
  name: "Block Inverted Appearance",
  args: {
    tabs: BASE_TABS,
    appearance: "block-inverted",
    activeTab: 0,
  },
};

export const Vertical: Story = {
  name: "Vertical Orientation",
  args: {
    tabs: BASE_TABS,
    appearance: "underline",
    orientation: "vertical",
    activeTab: 0,
  },
};

export const VerticalBlock: Story = {
  name: "Vertical + Block Appearance",
  args: {
    tabs: BASE_TABS,
    appearance: "block",
    orientation: "vertical",
    activeTab: 1,
  },
};

export const WithIcons: Story = {
  name: "Tabs with Icons and Badge",
  args: {
    tabs: TABS_WITH_ICONS,
    appearance: "underline",
    activeTab: 0,
  },
};

export const FilledWidth: Story = {
  name: "Fill Available Width",
  args: {
    tabs: BASE_TABS,
    appearance: "block",
    fill: true,
    activeTab: 0,
  },
};

export const Scrollable: Story = {
  name: "Scrollable (Many Tabs)",
  args: {
    tabs: MANY_TABS,
    appearance: "underline",
    scrollable: true,
    activeTab: 0,
  },
};

export const OverflowDropdown: Story = {
  name: "Overflow Dropdown (7+ Tabs)",
  args: {
    tabs: MANY_TABS,
    appearance: "underline",
    activeTab: 0,
  },
};

export const SecondTabActive: Story = {
  name: "Pre-selected Tab (index 2)",
  args: {
    tabs: BASE_TABS,
    appearance: "underline",
    activeTab: 2,
  },
};
