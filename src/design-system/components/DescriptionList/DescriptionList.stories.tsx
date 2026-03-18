import type { Meta, StoryObj } from "@storybook/react-vite";
import { DescriptionList } from "./DescriptionList";

const meta = {
  title: "Components/DescriptionList",
  component: DescriptionList,
  tags: ["autodocs"],
  args: {
    density: "default",
    labelWidth: "md",
    variant: "default",
    bordered: true,
    fullWidth: true,
    items: [
      { label: "Provider", value: "Dr. Jane Smith" },
      { label: "Status", value: "Active" },
      { label: "Specialty", value: "Cardiology" },
    ],
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    density: "compact",
    labelWidth: "sm",
  },
};

export const AutoWidth: Story = {
  args: {
    fullWidth: false,
  },
};

export const SeparatorsOnly: Story = {
  args: {
    bordered: false,
    variant: "separators",
  },
};
