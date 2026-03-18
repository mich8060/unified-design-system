import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ButtonGroup } from "./ButtonGroup";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout direction of the button group",
    },
    size: {
      control: "select",
      options: ["large", "default", "small", "xsmall"],
      description: "Size applied to all buttons that do not override it",
    },
    disabled: {
      control: "boolean",
      description: "Disables all buttons in the group",
    },
  },
  args: {
    orientation: "horizontal",
    size: "default",
    disabled: false,
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { id: "cancel", label: "Cancel" },
      { id: "save", label: "Save" },
    ],
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    options: [
      { id: "draft", label: "Save Draft" },
      { id: "publish", label: "Publish" },
      { id: "archive", label: "Archive" },
      { id: "delete", label: "Delete" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      { id: "edit", label: "Edit", icon: "PencilSimple", layout: "icon-left" },
      { id: "copy", label: "Copy", icon: "Copy", layout: "icon-left" },
      { id: "delete", label: "Delete", icon: "Trash", layout: "icon-left" },
    ],
  },
};

export const IconOnly: Story = {
  args: {
    options: [
      { id: "bold", label: "Bold", icon: "TextB", layout: "icon-only" },
      { id: "italic", label: "Italic", icon: "TextItalic", layout: "icon-only" },
      { id: "underline", label: "Underline", icon: "TextUnderline", layout: "icon-only" },
      { id: "strikethrough", label: "Strikethrough", icon: "TextStrikethrough", layout: "icon-only" },
    ],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { id: "back", label: "Back" },
      { id: "next", label: "Next" },
      { id: "finish", label: "Finish" },
    ],
  },
};

export const PartiallyDisabled: Story = {
  args: {
    options: [
      { id: "view", label: "View" },
      { id: "edit", label: "Edit", disabled: true },
      { id: "delete", label: "Delete", disabled: true },
    ],
  },
};

export const CompactSize: Story = {
  args: {
    size: "small",
    options: [
      { id: "day", label: "Day" },
      { id: "week", label: "Week" },
      { id: "month", label: "Month" },
    ],
  },
};

export const Loading: Story = {
  args: {
    options: [
      { id: "cancel", label: "Cancel" },
      { id: "save", label: "Save", loading: true },
    ],
  },
};
