import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('page-header')

const meta = {
  title: 'UDS/Page Header',
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

export const InlineInApp: Story = {
  render: () => renderExample(0),
}

export const BlockInApp: Story = {
  render: () => renderExample(1),
}

export const BlockExpanded: Story = {
  render: () => renderExample(2),
}

export const TitleOnly: Story = {
  render: () => renderExample(3),
}

export const CustomActions: Story = {
  render: () => renderExample(4),
}

export const ActionsBelow: Story = {
  render: () => renderExample(5),
}
