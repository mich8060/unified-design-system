import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppShellDemoCanvas } from '@/docs/app-shell-demo/AppShellDemoCanvas'
import '@/docs/app-shell-demo/app-shell-demo.css'

const meta = {
  title: 'UDS/AppShell',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  render: () => <AppShellDemoCanvas />,
}
