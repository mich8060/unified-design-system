import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('button')

const meta = {
  title: 'UDS/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function renderExample(index: number) {
  const example = examples[index]
  if (!example) return <p className="text-sm text-neutral-600">Example not found.</p>
  return example.previewInner
}

export const Variants: Story = {
  render: () => renderExample(0),
}

export const Sizes: Story = {
  render: () => renderExample(1),
}

export const WithIcons: Story = {
  render: () => renderExample(2),
}

export const IconOnly: Story = {
  render: () => renderExample(3),
}

export const WithBadges: Story = {
  render: () => renderExample(4),
}
