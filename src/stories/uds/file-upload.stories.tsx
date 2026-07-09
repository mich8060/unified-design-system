import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('file-upload')

const meta = {
  title: 'UDS/File Upload',
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

export const Basic: Story = {
  render: () => renderExample(0),
}

export const Small: Story = {
  render: () => renderExample(1),
}

export const Xs: Story = {
  render: () => renderExample(2),
}
