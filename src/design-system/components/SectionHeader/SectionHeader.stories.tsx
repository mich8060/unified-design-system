import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { SectionHeader } from "./SectionHeader";
import { Button } from "../Button";
import { Tag } from "../Tag";
import { Layout } from "../Layout";
import { Text } from "../Text";
import { Icon } from "../Icon";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta = {
  title: "Components/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SectionHeader provides a structured page-section title block with optional eyebrow text, description, meta tags, and action buttons. Use it at the top of major content sections.",
      },
    },
  },
  argTypes: {
    eyebrow: {
      control: "text",
      description: "Small label displayed above the title — typically a category or context hint.",
    },
    title: {
      control: "text",
      description: "Primary heading text (rendered as `<h2>`).",
    },
    description: {
      control: "text",
      description: "Supporting text rendered below the title.",
    },
    divider: {
      control: "boolean",
      description: "Adds a bottom border divider beneath the section header.",
      table: { defaultValue: { summary: "false" } },
    },
    meta: {
      control: false,
      description: "Arbitrary ReactNode — intended for tags, badges, or status indicators.",
    },
    actions: {
      control: false,
      description: "Arbitrary ReactNode — intended for buttons or action controls.",
    },
  },
  args: {
    title: "Section Title",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Title Only",
  args: {
    title: "Open Requisitions",
  },
  parameters: {
    docs: {
      description: {
        story: "The minimum usage: a heading title with no additional content.",
      },
    },
  },
};

export const WithEyebrow: Story = {
  name: "With Eyebrow",
  args: {
    eyebrow: "Overview",
    title: "Open Requisitions",
  },
  parameters: {
    docs: {
      description: {
        story:
          "An eyebrow label adds visual hierarchy above the heading — use it for categories, workflows, or section context.",
      },
    },
  },
};

export const WithDescription: Story = {
  name: "With Eyebrow and Description",
  args: {
    eyebrow: "Overview",
    title: "Open Requisitions",
    description: "Track open roles and quickly create or export requisition details.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A description provides supporting copy beneath the title. Keep it concise — one to two sentences.",
      },
    },
  },
};

export const WithActions: Story = {
  name: "With Actions (Buttons)",
  args: {
    eyebrow: "Section Header",
    title: "Candidates",
    description: "Review active candidates and current handoff steps.",
    actions: (
      <>
        <Button label="Export" appearance="outline" />
        <Button label="New Candidate" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `actions` slot renders aligned to the right side. Place primary and secondary CTAs here.",
      },
    },
  },
};

export const WithMetaTags: Story = {
  name: "With Meta Tags",
  args: {
    title: "Cardiology — Denver",
    description: "Current status and assignment metadata for this workflow.",
    meta: (
      <>
        <Tag label="8 Active" color="green" />
        <Tag label="2 Needs Review" color="orange" />
        <Tag label="1 Critical" color="red" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `meta` slot sits beneath the title and description — use it for status tags, counts, or badges.",
      },
    },
  },
};

export const FullFeatured: Story = {
  name: "Fully Populated",
  args: {
    eyebrow: "Workflow",
    title: "Cardiology — Denver",
    description: "Current status and assignment metadata for this placement workflow.",
    meta: (
      <>
        <Tag label="8 Active" color="green" />
        <Tag label="2 Needs Review" color="orange" />
        <Tag label="1 Critical" color="red" />
      </>
    ),
    actions: (
      <>
        <Button label="Export" appearance="outline" icon="DownloadSimple" layout="icon-left" />
        <Button label="New Requisition" icon="Plus" layout="icon-left" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "All slots populated simultaneously: eyebrow, title, description, meta, and actions.",
      },
    },
  },
};

export const WithDivider: Story = {
  name: "With Divider",
  args: {
    eyebrow: "Settings",
    title: "Notification Preferences",
    description: "Control how and when you receive alerts.",
    divider: true,
    actions: (
      <Button label="Save Changes" />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "`divider={true}` draws a bottom border — useful to visually separate the header from content below.",
      },
    },
  },
};

export const TitleOnly: Story = {
  name: "Minimal — Title Only with Action",
  args: {
    title: "Recent Activity",
    actions: (
      <Button label="View All" appearance="outline" />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The simplest pairing: a title and a single action. The layout automatically right-aligns actions regardless of content length.",
      },
    },
  },
};

export const WithIconInActions: Story = {
  name: "Actions with Icon Buttons",
  args: {
    eyebrow: "Documents",
    title: "Credentialing Files",
    description: "Manage uploaded documents for this provider.",
    actions: (
      <>
        <Button appearance="text" label="Filter" icon="Funnel" layout="icon-left" />
        <Button appearance="outline" label="Upload" icon="Upload" layout="icon-left" />
        <Button label="Request Document" icon="Plus" layout="icon-left" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Three actions with icons: a text button, an outline button, and a primary button.",
      },
    },
  },
};

export const WithMetaAndActions: Story = {
  name: "Meta + Actions Combined",
  args: {
    title: "Provider Pipeline",
    meta: (
      <Layout direction="row" gap="8" alignItems="center">
        <Icon name="Clock" size={16} />
        <Text as="span" variant="body-14" leading="regular">
          Updated 5 min ago
        </Text>
        <Tag label="Live" color="green" />
      </Layout>
    ),
    actions: (
      <>
        <Button label="Refresh" appearance="outline" icon="ArrowClockwise" layout="icon-left" />
        <Button label="Add Provider" icon="Plus" layout="icon-left" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Meta and actions co-exist cleanly. Meta wraps below the title while actions stay right-aligned.",
      },
    },
  },
};

export const LongTitle: Story = {
  name: "Long Title and Description",
  args: {
    eyebrow: "Compliance",
    title: "Ongoing Credentialing and Licensure Verification Requirements",
    description:
      "This section tracks all open licensure verifications, primary source verifications, and compliance items required before a provider can be placed. Review each item and take action as needed.",
    actions: (
      <Button label="Start Review" />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Verifies layout integrity with a long title and multi-sentence description. Actions remain anchored to the right.",
      },
    },
  },
};

export const InPageContext: Story = {
  name: "In-Page Context (Multiple Headers)",
  render: () => (
    <Layout direction="column" gap="32" fullWidth>
      <SectionHeader
        eyebrow="Step 1"
        title="Provider Information"
        description="Enter the core details for this provider."
        divider
        actions={<Button label="Edit" appearance="outline" />}
      />
      <SectionHeader
        eyebrow="Step 2"
        title="Licensure &amp; Credentials"
        description="Upload and verify all required documents."
        divider
        meta={
          <>
            <Tag label="3 Pending" color="orange" />
            <Tag label="1 Expired" color="red" />
          </>
        }
        actions={<Button label="Review All" />}
      />
      <SectionHeader
        eyebrow="Step 3"
        title="Assignment Details"
        description="Review and confirm placement specifics before submission."
        divider
        meta={<Tag label="Ready" color="green" />}
        actions={<Button label="Submit" />}
      />
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple SectionHeaders stacked in a workflow page — demonstrates visual rhythm and consistent spacing across the page.",
      },
    },
  },
};
