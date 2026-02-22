import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Box } from './Box'
import { Button } from '../Button'

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
}

export const Container: Story = {
  args: {
    bg: 'container',
    children: 'container',
    className: 'p-4',
  },
}

export const Surface: Story = {
  args: {
    bg: 'surface',
    children: 'surface',
    className: 'p-4',
  },
}

export const Layered: Story = {
  render: () => (
    <div>
      <Box bg="background" className="p-10">
        <Box bg="container" className="p-10 rounded-xl">
          <Box bg="surface" className="p-10 rounded-xl flex gap-2">
            <Button>Primary</Button>
            <Button variant={'secondary'}>Secondary</Button>
          </Box>
        </Box>
      </Box>
      <Box bg="background" className="p-10 mt-4">
        <Box bg="surface" className="p-10 rounded-xl flex gap-2">
          <Button>Primary</Button>
          <Button variant={'secondary'}>Secondary</Button>
        </Box>
      </Box>
      <Box bg="background" className="p-10 mt-4 flex gap-2">
        <Button>Primary</Button>
        <Button variant={'secondary'}>Secondary</Button>
      </Box>
    </div>
  ),
}

export const AsSection: Story = {
  args: {
    as: 'section',
    children: 'section element',
    className: 'p-4',
  },
}
