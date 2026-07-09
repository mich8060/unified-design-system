import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('accordion')

const meta = {
  title: 'UDS/Accordion',
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

export const Boxed: Story = {
  render: () => renderExample(0),
}

export const BoxedFilled: Story = {
  render: () => renderExample(1),
}

export const Divided: Story = {
  render: () => renderExample(2),
}

export const Multiple: Story = {
  render: () => renderExample(3),
}
