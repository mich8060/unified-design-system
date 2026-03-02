import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Avatar from "./Avatar";

const DEMO_IMAGE =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL.",
    },
    initials: {
      control: "text",
      description: "Initials shown when no image is available.",
    },
    name: {
      control: "text",
      description: "Full name used to auto-generate initials.",
    },
    status: {
      control: "boolean",
      description: "Shows online status indicator dot.",
    },
    showCameraButton: {
      control: "boolean",
      description: "Shows bottom-right camera action button variant.",
    },
    cameraButtonAriaLabel: {
      control: "text",
      description: "Accessible label for camera action button.",
    },
    onCameraClick: {
      action: "cameraClick",
      description: "Called when camera action button is clicked.",
    },
    size: {
      control: "select",
      options: ["small", "default", "large"],
      description: "Avatar size variant.",
    },
    alt: {
      control: "text",
      description: "Image alt text (used when src is set).",
    },
    className: {
      control: "text",
      description: "Additional CSS classes on avatar root.",
    },
  },
  args: {
    src: "",
    initials: "EB",
    name: "",
    status: false,
    showCameraButton: false,
    cameraButtonAriaLabel: "Change avatar photo",
    size: "default",
    alt: "User avatar",
    className: "",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithImage: Story = {
  args: {
    src: DEMO_IMAGE,
    initials: "",
    alt: "Emily Brown profile photo",
  },
};

export const WithInitials: Story = {
  args: {
    src: "",
    initials: "JD",
    name: "",
  },
};

export const AutoInitialsFromName: Story = {
  args: {
    src: "",
    initials: "",
    name: "Jane Smith",
  },
};

export const StatusIndicator: Story = {
  args: {
    src: "",
    initials: "ON",
    status: true,
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Avatar initials="SM" size="small" />
      <Avatar initials="DF" size="default" />
      <Avatar initials="LG" size="large" />
    </div>
  ),
};

export const ImageAndStatus: Story = {
  args: {
    src: DEMO_IMAGE,
    initials: "",
    status: true,
    alt: "Online user avatar",
  },
};

export const InitialsPriorityOverName: Story = {
  args: {
    src: "",
    initials: "ZZ",
    name: "Alice Johnson",
  },
};

export const FallbackUnknown: Story = {
  args: {
    src: "",
    initials: "",
    name: "",
  },
};

export const CameraButtonVariant: Story = {
  args: {
    src: DEMO_IMAGE,
    initials: "",
    showCameraButton: true,
    cameraButtonAriaLabel: "Update profile photo",
  },
};

export const CameraButtonSizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Avatar initials="SM" size="small" showCameraButton />
      <Avatar initials="MD" size="default" showCameraButton />
      <Avatar initials="LG" size="large" showCameraButton />
    </div>
  ),
};
