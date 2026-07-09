import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('progress')

const meta = {
  title: 'UDS/Progress',
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

export const Value: Story = {
  render: () => renderExample(0),
}

export const WithLabel: Story = {
  render: () => renderExample(1),
}

export const TooltipBar: Story = {
  render: () => renderExample(2),
}

export const TooltipIcon: Story = {
  render: () => renderExample(3),
}
