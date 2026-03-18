import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import Pagination from "./Pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "The currently active page (1-indexed).",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages.",
    },
    onPageChange: {
      action: "pageChange",
      description: "Callback fired when the user navigates to a new page.",
    },
    variant: {
      control: "select",
      options: ["default", "line"],
      description: "Visual style of the pagination.",
    },
    showJumpInput: {
      control: "boolean",
      description: "Shows a jump-to-page input field in place of ellipsis.",
    },
    showDoubleButtons: {
      control: "boolean",
      description: "Shows first/last page skip buttons.",
    },
    showFirstLast: {
      control: "boolean",
      description: "Alias for showDoubleButtons — shows first/last skip buttons.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes on the pagination root.",
    },
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: "default",
    showJumpInput: false,
    showDoubleButtons: false,
    showFirstLast: false,
    className: "",
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stateful wrapper for interactive demos ───────────────────────────────────

function StatefulPagination(props: React.ComponentProps<typeof Pagination>) {
  const [page, setPage] = useState(props.currentPage ?? 1);
  return (
    <Pagination
      {...props}
      currentPage={page}
      onPageChange={(next) => {
        setPage(next as number);
        (props.onPageChange as (...args: unknown[]) => void)?.(next);
      }}
    />
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {};

export const DefaultVariant: Story = {
  name: "Default Variant",
  render: (args) => <StatefulPagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: "default",
  },
};

export const LineVariant: Story = {
  name: "Line Variant",
  render: (args) => <StatefulPagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: "line",
  },
};

export const WithDoubleButtons: Story = {
  name: "With First / Last Buttons",
  render: (args) => <StatefulPagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: "default",
    showDoubleButtons: true,
  },
};

export const WithJumpInput: Story = {
  name: "With Jump-to-Page Input",
  render: (args) => <StatefulPagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 50,
    variant: "default",
    showJumpInput: true,
  },
};

export const AllFeaturesEnabled: Story = {
  name: "All Features Enabled",
  render: (args) => <StatefulPagination {...args} />,
  args: {
    currentPage: 10,
    totalPages: 50,
    variant: "default",
    showDoubleButtons: true,
    showJumpInput: true,
  },
};

export const FewPages: Story = {
  name: "Few Pages (≤ 5)",
  render: (args) => <StatefulPagination {...args} />,
  args: {
    currentPage: 2,
    totalPages: 4,
    variant: "default",
  },
};

export const MidRangeActive: Story = {
  name: "Mid-Range Active Page",
  render: (args) => <StatefulPagination {...args} />,
  args: {
    currentPage: 8,
    totalPages: 20,
    variant: "default",
  },
};

export const LastPageActive: Story = {
  name: "Last Page Active",
  render: (args) => <StatefulPagination {...args} />,
  args: {
    currentPage: 20,
    totalPages: 20,
    variant: "default",
  },
};

export const LineVariantWithDoubleButtons: Story = {
  name: "Line Variant + First/Last Buttons",
  render: (args) => <StatefulPagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 15,
    variant: "line",
    showDoubleButtons: true,
  },
};
