import { useState } from 'react'
import { Checkbox } from '.'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent } from 'storybook/test'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'チェックボックスのサイズ',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    checked: {
      control: 'boolean',
      description: 'チェック状態',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'チェックボックス',
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).not.toBeChecked()

    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()

    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
}

export const Checked: Story = {
  args: {
    label: 'チェック済み',
    defaultChecked: true,
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).toBeChecked()
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: '無効状態',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).toBeDisabled()
  },
}

export const DisabledChecked: Story = {
  args: {
    label: '無効 + チェック済み',
    disabled: true,
    defaultChecked: true,
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).toBeDisabled()
    await expect(checkbox).toBeChecked()
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Checkbox
          label={`必須: ${checked ? 'はい' : 'いいえ'}`}
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>
    )
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox')
    await expect(canvas.getByText('必須: いいえ')).toBeInTheDocument()

    await userEvent.click(checkbox)
    await expect(canvas.getByText('必須: はい')).toBeInTheDocument()
  },
}

export const WithoutLabel: Story = {
  args: {},
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).toBeInTheDocument()
    await expect(canvas.queryByRole('label')).toBeNull()
  },
}
