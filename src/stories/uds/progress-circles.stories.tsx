import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('progress-circles')

const meta = {
  title: 'UDS/Progress Circles',
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

export const Radial: Story = {
  render: () => renderExample(0),
}

export const Sizing: Story = {
  render: () => renderExample(1),
}
