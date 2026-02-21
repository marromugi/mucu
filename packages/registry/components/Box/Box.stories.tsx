import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Box } from './Box'

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
}

export default meta
type Story = StoryObj<typeof Box>

export const Background: Story = {
  args: {
    bg: 'background',
    children: 'background',
    className: 'p-4',
  },
  play: async ({ canvas }) => {
    const el = canvas.getByText('background')
    await expect(el.tagName).toBe('DIV')
    await expect(el).toHaveClass('bg-background')
    await expect(el).toHaveClass('p-4')
  },
}

export const Container: Story = {
  args: {
    bg: 'container',
    children: 'container',
    className: 'p-4',
  },
  play: async ({ canvas }) => {
    const el = canvas.getByText('container')
    await expect(el).toHaveClass('bg-container')
  },
}

export const Surface: Story = {
  args: {
    bg: 'surface',
    children: 'surface',
    className: 'p-4',
  },
  play: async ({ canvas }) => {
    const el = canvas.getByText('surface')
    await expect(el).toHaveClass('bg-surface')
  },
}

export const Layered: Story = {
  render: () => (
    <div>
      <Box bg="background" className="p-10">
        <Box bg="container" className="p-10 rounded-xl">
          <Box bg="surface" className="p-10 rounded-xl">
            surface
          </Box>
        </Box>
      </Box>
      <Box bg="background" className="p-10">
        <Box bg="surface" className="p-10 rounded-xl">
          surface
        </Box>
      </Box>
    </div>
  ),
  play: async ({ canvas }) => {
    const surface = canvas.getByText('surface')
    await expect(surface).toHaveClass('bg-surface')
    await expect(surface.parentElement).toHaveClass('bg-container')
    await expect(surface.parentElement?.parentElement).toHaveClass(
      'bg-background',
    )
  },
}

export const AsSection: Story = {
  args: {
    as: 'section',
    children: 'section element',
    className: 'p-4',
  },
  play: async ({ canvas }) => {
    const el = canvas.getByText('section element')
    await expect(el.tagName).toBe('SECTION')
  },
}
