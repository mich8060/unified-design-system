import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UDS/Sidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => <p className="text-sm text-neutral-600">No examples registered for Sidebar.</p>,
}
