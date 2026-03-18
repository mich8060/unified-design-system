import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Text } from "./Text";

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "display-128",
        "display-96",
        "display-72",
        "display-60",
        "display-48",
        "display-36",
        "heading-32",
        "heading-28",
        "heading-24",
        "body-20",
        "body-16",
        "body-14",
        "body-12",
      ],
      description: "Type scale variant. Controls font size and line-height.",
    },
    weight: {
      control: { type: "inline-radio" },
      options: ["regular", "medium", "semibold", "bold"],
      description: "Font weight.",
    },
    leading: {
      control: { type: "inline-radio" },
      options: ["tight", "regular", "loose"],
      description: "Line-height modifier.",
    },
    tone: {
      control: { type: "inline-radio" },
      options: ["primary", "secondary", "tertiary", "muted", "placeholder", "disabled"],
      description: "Semantic color tone applied via CSS variable.",
    },
    as: {
      control: { type: "text" },
      description: "Polymorphic element override (e.g. \"h1\", \"span\", \"label\").",
    },
    clamp: {
      control: { type: "number" },
      description: "Number of lines before text is truncated with an ellipsis.",
    },
    children: {
      control: { type: "text" },
      description: "Text content.",
    },
  },
  args: {
    variant: "body-16",
    weight: "regular",
    leading: "regular",
    tone: "primary",
    children: "The quick brown fox jumps over the lazy dog.",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground — fully interactive, reflects all controls
// ---------------------------------------------------------------------------
export const Playground: Story = {};

// ---------------------------------------------------------------------------
// Display scale
// ---------------------------------------------------------------------------
export const DisplayScale: Story = {
  name: "Display Scale",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Text variant="display-128" as="h1">Display 128</Text>
      <Text variant="display-96" as="h1">Display 96</Text>
      <Text variant="display-72" as="h1">Display 72</Text>
      <Text variant="display-60" as="h1">Display 60</Text>
      <Text variant="display-48" as="h2">Display 48</Text>
      <Text variant="display-36" as="h2">Display 36</Text>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Heading scale
// ---------------------------------------------------------------------------
export const HeadingScale: Story = {
  name: "Heading Scale",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Text variant="heading-32" as="h2">Heading 32 — Section title</Text>
      <Text variant="heading-28" as="h3">Heading 28 — Sub-section title</Text>
      <Text variant="heading-24" as="h4">Heading 24 — Card title</Text>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Body scale
// ---------------------------------------------------------------------------
export const BodyScale: Story = {
  name: "Body Scale",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Text variant="body-20">Body 20 — Introductory paragraphs or lead copy that needs a little extra presence.</Text>
      <Text variant="body-16">Body 16 — Default reading size for most UI content, labels, and descriptions.</Text>
      <Text variant="body-14">Body 14 — Supporting text, metadata, and secondary information.</Text>
      <Text variant="body-12">Body 12 — Fine print, timestamps, captions, and helper text.</Text>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Weights
// ---------------------------------------------------------------------------
export const Weights: Story = {
  name: "All Weights",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text variant="body-16" weight="regular">Regular — The default reading weight used across body copy.</Text>
      <Text variant="body-16" weight="medium">Medium — Slightly elevated for emphasis within a sentence.</Text>
      <Text variant="body-16" weight="semibold">Semibold — Used for labels, nav items, and UI elements.</Text>
      <Text variant="body-16" weight="bold">Bold — High-contrast callouts and strong emphasis.</Text>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Tones
// ---------------------------------------------------------------------------
export const Tones: Story = {
  name: "All Tones",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text variant="body-16" tone="primary">Primary — Main content text.</Text>
      <Text variant="body-16" tone="secondary">Secondary — Supporting copy and captions.</Text>
      <Text variant="body-16" tone="tertiary">Tertiary — Low-emphasis labels and metadata.</Text>
      <Text variant="body-16" tone="muted">Muted — Supplemental information with reduced prominence.</Text>
      <Text variant="body-16" tone="placeholder">Placeholder — Input placeholder tone.</Text>
      <Text variant="body-16" tone="disabled">Disabled — Text that is not interactive.</Text>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Line-height (leading) options
// ---------------------------------------------------------------------------
export const LeadingOptions: Story = {
  name: "Leading (Line Height)",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <Text variant="body-12" tone="secondary">tight</Text>
        <Text variant="body-16" leading="tight">
          Tight leading condenses the space between lines, which works well for
          short UI labels and headings where vertical rhythm is not the primary concern.
        </Text>
      </div>
      <div>
        <Text variant="body-12" tone="secondary">regular</Text>
        <Text variant="body-16" leading="regular">
          Regular leading is the default for most body copy. It strikes a balance between
          readability and density, making it suitable for paragraphs of moderate length.
        </Text>
      </div>
      <div>
        <Text variant="body-12" tone="secondary">loose</Text>
        <Text variant="body-16" leading="loose">
          Loose leading increases breathing room between lines. Use it for longer-form
          content where sustained reading comfort matters more than vertical economy.
        </Text>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Line clamp / truncation
// ---------------------------------------------------------------------------
export const LineClamp: Story = {
  name: "Line Clamp",
  args: {
    variant: "body-16",
    clamp: 2,
    children:
      "This paragraph contains much more text than will fit in two lines when the container is narrow. The overflow is hidden and an ellipsis is appended automatically by the clamp prop, keeping the layout clean and predictable without any additional CSS from the consumer.",
  },
};

// ---------------------------------------------------------------------------
// Polymorphic element (as prop)
// ---------------------------------------------------------------------------
export const PolymorphicAs: Story = {
  name: "Polymorphic (as prop)",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text variant="heading-24" as="h1">Rendered as an &lt;h1&gt;</Text>
      <Text variant="body-16" as="span" weight="semibold">Rendered as a &lt;span&gt; with semibold weight</Text>
      <Text variant="body-14" as="label" tone="secondary">Rendered as a &lt;label&gt;</Text>
      <Text variant="body-12" as="p" tone="muted">Rendered as a &lt;p&gt; with muted tone</Text>
    </div>
  ),
};
