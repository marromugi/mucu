import { TextArea } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'テキストエリアのサイズ',
    },
    error: {
      control: 'boolean',
      description: 'エラー状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダー',
    },
    rows: {
      control: 'number',
      description: '行数',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'both'],
      description: 'リサイズ方向',
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
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    placeholder: '入力してください',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextArea size="sm" placeholder="Small" />
      <TextArea size="md" placeholder="Medium" />
      <TextArea size="lg" placeholder="Large" />
    </div>
  ),
}

export const WithValue: Story = {
  args: {
    defaultValue: '複数行のテキスト入力済み\n2行目\n3行目',
  },
}

export const Error: Story = {
  args: {
    error: true,
    placeholder: 'エラー状態',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '無効状態',
  },
}

export const NoResize: Story = {
  args: {
    resize: 'none',
    placeholder: 'リサイズ不可',
  },
}
