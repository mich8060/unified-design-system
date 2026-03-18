import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../Icon";
import { Status } from "../Status";
import { SelectableCard } from "./SelectableCard";

const meta = {
  title: "Components/SelectableCard",
  component: SelectableCard,
  tags: ["autodocs"],
  args: {
    title: "Document row",
    description: "Compact metadata and actions for list layouts",
    leading: <Icon name="File" size={20} />,
    status: <Status label="Ready" variant="green" />,
  },
} satisfies Meta<typeof SelectableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
