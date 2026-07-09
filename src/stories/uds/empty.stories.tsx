import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('empty')

const meta = {
  title: 'UDS/Empty',
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

export const State: Story = {
  render: () => renderExample(0),
}

export const SingleAction: Story = {
  render: () => renderExample(1),
}

export const TwoActions: Story = {
  render: () => renderExample(2),
}

export const Search404: Story = {
  render: () => renderExample(3),
}
