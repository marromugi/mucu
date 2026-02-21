import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    const spinner = canvas.getByRole('status')
    await expect(spinner).toBeInTheDocument()
    await expect(spinner).toHaveAttribute('aria-label', 'Loading')
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Spinner size="xxs" />
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
  play: async ({ canvas }) => {
    const spinners = canvas.getAllByRole('status')
    await expect(spinners).toHaveLength(5)
  },
}

export const CustomLabel: Story = {
  args: {
    label: 'データを読み込み中',
  },
  play: async ({ canvas }) => {
    const spinner = canvas.getByRole('status')
    await expect(spinner).toHaveAttribute('aria-label', 'データを読み込み中')
  },
}

export const InheritColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      <div className="text-text-body">
        <Spinner size="lg" />
      </div>
      <div className="text-text-description">
        <Spinner size="lg" />
      </div>
      <div className="text-primary-500">
        <Spinner size="lg" />
      </div>
      <div className="text-alert-500">
        <Spinner size="lg" />
      </div>
      <div className="text-success-500">
        <Spinner size="lg" />
      </div>
    </div>
  ),
}

export const CustomSize: Story = {
  args: {
    className: 'h-10 w-10',
    label: 'Loading large content',
  },
  play: async ({ canvas }) => {
    const spinner = canvas.getByRole('status')
    await expect(spinner).toHaveClass('h-10')
    await expect(spinner).toHaveClass('w-10')
  },
}
