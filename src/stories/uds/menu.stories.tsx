import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Menu } from '@chghealthcare/unified-design-system'

const meta = {
  title: 'UDS/Menu',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function MenuDemo() {
  const [activeId, setActiveId] = useState('dashboard')
  return (
    <div className="h-[640px] w-[280px] border border-neutral-200">
      <Menu defaultExpanded activeId={activeId} onNavigationSelect={setActiveId} brand="chg" />
    </div>
  )
}

export const Default: Story = {
  render: () => <MenuDemo />,
}
