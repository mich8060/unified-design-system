import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('combobox')

const meta = {
  title: 'UDS/Combobox',
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

export const Default: Story = {
  render: () => renderExample(0),
}

export const Compact: Story = {
  render: () => renderExample(1),
}

export const Search: Story = {
  render: () => renderExample(2),
}
