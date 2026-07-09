import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('pagination')

const meta = {
  title: 'UDS/Pagination',
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

export const Pages: Story = {
  render: () => renderExample(0),
}

export const DefaultVariant: Story = {
  render: () => renderExample(1),
}

export const LineVariant: Story = {
  render: () => renderExample(2),
}

export const Jump: Story = {
  render: () => renderExample(3),
}

export const LineJump: Story = {
  render: () => renderExample(4),
}

export const LineBoundary: Story = {
  render: () => renderExample(5),
}

export const SmallPages: Story = {
  render: () => renderExample(6),
}
