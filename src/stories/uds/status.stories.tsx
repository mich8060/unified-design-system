import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('status')

const meta = {
  title: 'UDS/Status',
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

export const WithoutDot: Story = {
  render: () => renderExample(1),
}

export const Compact: Story = {
  render: () => renderExample(2),
}
