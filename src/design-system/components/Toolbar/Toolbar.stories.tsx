import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { action } from "@storybook/addon-actions";
import { Toolbar } from "./Toolbar";
import { Button } from "../Button";
import { Branding } from "../Branding";
import { Text } from "../Text";
import { Tag } from "../Tag";
import { SearchInput } from "../SearchInput";
import { Layout } from "../Layout";
import { Icon } from "../Icon";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Toolbar is a top-of-page action bar with three composable slots: `left`, `center`, and `right`. Use it for page-level navigation, branding, and primary actions.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--uds-color-surface-primary)" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    left: {
      control: false,
      description: "ReactNode rendered in the left slot — typically navigation or a back button.",
    },
    center: {
      control: false,
      description: "ReactNode rendered in the center slot — typically a title or brand.",
    },
    right: {
      control: false,
      description: "ReactNode rendered in the right slot — typically primary actions.",
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default (Back / Title / Primary Action)",
  args: {
    left: (
      <Button
        appearance="outline"
        label="Back"
        icon="ArrowLeft"
        layout="icon-left"
        onClick={action("back")}
      />
    ),
    center: "Candidates",
    right: (
      <Button
        label="Add Candidate"
        icon="Plus"
        layout="icon-left"
        onClick={action("add-candidate")}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The most common toolbar pattern: a back button on the left, a page title in the centre, and a primary action on the right.",
      },
    },
  },
};

export const WithBrandingCenter: Story = {
  name: "Brand Symbol Centered",
  args: {
    left: (
      <Button
        appearance="outline"
        label="Menu"
        icon="List"
        layout="icon-left"
        onClick={action("menu")}
      />
    ),
    center: <Branding brand="connect" symbol />,
    right: (
      <Button
        appearance="soft"
        label="Export"
        icon="DownloadSimple"
        layout="icon-left"
        onClick={action("export")}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A brand symbol centred in the toolbar — typical for mobile or focused views where the brand mark anchors the navigation.",
      },
    },
  },
};

export const LeftOnly: Story = {
  name: "Left Slot Only",
  args: {
    left: (
      <>
        <Button
          appearance="text"
          label="Back"
          icon="ArrowLeft"
          layout="icon-left"
          onClick={action("back")}
        />
        <Text as="span" variant="heading-24" weight="medium" leading="regular">
          Provider Details
        </Text>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "When only the left slot is populated, it aligns to the start of the toolbar — useful for sub-page breadcrumb-style navigation.",
      },
    },
  },
};

export const RightOnly: Story = {
  name: "Right Slot Only",
  args: {
    right: (
      <>
        <Button appearance="text" label="Cancel" onClick={action("cancel")} />
        <Button appearance="outline" label="Save Draft" onClick={action("save-draft")} />
        <Button label="Submit" onClick={action("submit")} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Only the right slot populated — commonly used for form action rows at the top of a page.",
      },
    },
  },
};

export const CenterOnly: Story = {
  name: "Center Slot Only (Title)",
  args: {
    center: (
      <Text as="h1" variant="heading-24" weight="semibold" leading="regular">
        Dashboard
      </Text>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Only the centre slot is set, producing a centered page title bar.",
      },
    },
  },
};

export const WithSearchLeft: Story = {
  name: "Search in Left Slot",
  args: {
    left: (
      <div style={{ width: 280 }}>
        <SearchInput
          placeholder="Search candidates..."
          onChange={action("search")}
        />
      </div>
    ),
    right: (
      <>
        <Button
          appearance="outline"
          label="Filter"
          icon="Funnel"
          layout="icon-left"
          onClick={action("filter")}
        />
        <Button
          label="Add New"
          icon="Plus"
          layout="icon-left"
          onClick={action("add")}
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A search input in the left slot paired with filter and add actions on the right — a typical table-page toolbar.",
      },
    },
  },
};

export const WithStatusMeta: Story = {
  name: "Title with Status Tags (Center)",
  args: {
    left: (
      <Button
        appearance="text"
        label="All Requisitions"
        icon="ArrowLeft"
        layout="icon-left"
        onClick={action("back")}
      />
    ),
    center: (
      <Layout direction="row" gap="8" alignItems="center">
        <Text as="span" variant="heading-24" weight="semibold" leading="regular">
          REQ-2024-0183
        </Text>
        <Tag label="Open" color="green" />
      </Layout>
    ),
    right: (
      <>
        <Button
          appearance="outline"
          label="Download"
          icon="DownloadSimple"
          layout="icon-left"
          onClick={action("download")}
        />
        <Button
          label="Edit"
          icon="PencilSimple"
          layout="icon-left"
          onClick={action("edit")}
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A record ID with a status tag in the centre slot — shows how rich content can be composed inside any slot.",
      },
    },
  },
};

export const AllThreeSlotsFull: Story = {
  name: "All Three Slots — Rich Content",
  args: {
    left: (
      <>
        <Button
          appearance="text"
          label="Menu"
          icon="List"
          layout="icon-only"
          aria-label="Open menu"
          onClick={action("menu")}
        />
        <Branding brand="comphealth" />
      </>
    ),
    center: (
      <div style={{ width: 320 }}>
        <SearchInput
          placeholder="Search across everything..."
          onChange={action("global-search")}
        />
      </div>
    ),
    right: (
      <>
        <Button
          appearance="text"
          label="Notifications"
          icon="Bell"
          layout="icon-only"
          aria-label="Notifications"
          onClick={action("notifications")}
        />
        <Button
          appearance="text"
          label="Help"
          icon="Question"
          layout="icon-only"
          aria-label="Help"
          onClick={action("help")}
        />
        <Button
          label="New Placement"
          icon="Plus"
          layout="icon-left"
          onClick={action("new-placement")}
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A fully loaded application header: branding on the left, global search in the centre, utility and primary actions on the right.",
      },
    },
  },
};

export const IconActionsRight: Story = {
  name: "Icon-Only Actions (Right Slot)",
  args: {
    left: (
      <Text as="h1" variant="heading-24" weight="semibold" leading="regular">
        Reports
      </Text>
    ),
    right: (
      <>
        <Button
          appearance="text"
          label="Refresh"
          icon="ArrowClockwise"
          layout="icon-only"
          aria-label="Refresh"
          onClick={action("refresh")}
        />
        <Button
          appearance="text"
          label="Share"
          icon="ShareNetwork"
          layout="icon-only"
          aria-label="Share"
          onClick={action("share")}
        />
        <Button
          appearance="text"
          label="Download"
          icon="DownloadSimple"
          layout="icon-only"
          aria-label="Download"
          onClick={action("download")}
        />
        <Button
          appearance="outline"
          label="Settings"
          icon="Gear"
          layout="icon-left"
          onClick={action("settings")}
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compact icon-only utility buttons on the right keep the toolbar clean for content-heavy pages.",
      },
    },
  },
};

export const MultipleLeftActions: Story = {
  name: "Multiple Left Actions (Bulk Operations)",
  args: {
    left: (
      <>
        <Text as="span" variant="body-14" weight="semibold" leading="regular">
          3 selected
        </Text>
        <Button
          appearance="outline"
          label="Assign"
          icon="UserPlus"
          layout="icon-left"
          onClick={action("assign")}
        />
        <Button
          appearance="outline"
          label="Export"
          icon="DownloadSimple"
          layout="icon-left"
          onClick={action("export")}
        />
        <Button
          appearance="outline"
          label="Archive"
          icon="Archive"
          layout="icon-left"
          onClick={action("archive")}
        />
      </>
    ),
    right: (
      <Button
        appearance="text"
        label="Clear selection"
        onClick={action("clear-selection")}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A contextual toolbar for bulk table operations: a selection count on the left, bulk action buttons, and a clear selection link on the right.",
      },
    },
  },
};

export const WithCustomCenter: Story = {
  name: "Custom Center — Breadcrumb-Style",
  args: {
    left: (
      <Button
        appearance="text"
        label="Back"
        icon="ArrowLeft"
        layout="icon-only"
        aria-label="Go back"
        onClick={action("back")}
      />
    ),
    center: (
      <Layout direction="row" gap="4" alignItems="center">
        <Text as="span" variant="body-14" leading="regular" style={{ opacity: 0.6 }}>
          Placements
        </Text>
        <Icon name="CaretRight" size={14} />
        <Text as="span" variant="body-14" leading="regular" style={{ opacity: 0.6 }}>
          Cardiology
        </Text>
        <Icon name="CaretRight" size={14} />
        <Text as="span" variant="body-14" weight="semibold" leading="regular">
          Dr. Sarah Chen
        </Text>
      </Layout>
    ),
    right: (
      <>
        <Button appearance="outline" label="Notes" icon="Note" layout="icon-left" onClick={action("notes")} />
        <Button label="Edit Profile" icon="PencilSimple" layout="icon-left" onClick={action("edit")} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A custom breadcrumb-style path composed inside the center slot — demonstrates how any ReactNode can fill any slot.",
      },
    },
  },
};
