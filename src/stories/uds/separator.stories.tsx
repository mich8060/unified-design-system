import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('separator')

const meta = {
  title: 'UDS/Separator',
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

export const Horizontal: Story = {
  render: () => renderExample(0),
}

export const Vertical: Story = {
  render: () => renderExample(1),
}

export const WithLabel: Story = {
  render: () => renderExample(2),
}

export const Band: Story = {
  render: () => renderExample(3),
}
