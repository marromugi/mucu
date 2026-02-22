import { useState } from 'react'
import { expect, userEvent, waitFor } from 'storybook/test'
import { Popover } from './Popover'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'ポップオーバーの内容',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '表示位置',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '揃え位置',
    },
    arrow: {
      control: 'boolean',
      description: '矢印の表示',
    },
    offset: {
      control: 'number',
      description: 'トリガーからの距離（px）',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '8rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: {
    content: <p>ポップオーバーの内容です</p>,
    children: <button>クリックして開く</button>,
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByText('クリックして開く')

    // 初期状態ではポップオーバーは表示されない
    await expect(canvas.queryByRole('dialog')).toBeNull()

    // クリックで表示
    await userEvent.click(trigger)
    await expect(canvas.getByRole('dialog')).toHaveTextContent('ポップオーバーの内容です')

    // 再クリックで非表示
    await userEvent.click(trigger)
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull())
  },
}

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <Popover content={<p>上に表示</p>} placement="top">
        <button>Top</button>
      </Popover>
      <Popover content={<p>下に表示</p>} placement="bottom">
        <button>Bottom</button>
      </Popover>
      <Popover content={<p>左に表示</p>} placement="left">
        <button>Left</button>
      </Popover>
      <Popover content={<p>右に表示</p>} placement="right">
        <button>Right</button>
      </Popover>
    </div>
  ),
}

export const Alignments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '3rem' }}>
        <Popover content={<p>Start</p>} placement="bottom" align="start">
          <button>Bottom Start</button>
        </Popover>
        <Popover content={<p>Center</p>} placement="bottom" align="center">
          <button>Bottom Center</button>
        </Popover>
        <Popover content={<p>End</p>} placement="bottom" align="end">
          <button>Bottom End</button>
        </Popover>
      </div>
      <div style={{ display: 'flex', gap: '3rem' }}>
        <Popover content={<p>Start</p>} placement="top" align="start">
          <button>Top Start</button>
        </Popover>
        <Popover content={<p>Center</p>} placement="top" align="center">
          <button>Top Center</button>
        </Popover>
        <Popover content={<p>End</p>} placement="top" align="end">
          <button>Top End</button>
        </Popover>
      </div>
    </div>
  ),
}

export const WithArrow: Story = {
  args: {
    content: <p>矢印付きポップオーバー</p>,
    arrow: true,
    children: <button>矢印付き</button>,
  },
  play: async ({ canvas, canvasElement }) => {
    const trigger = canvas.getByText('矢印付き')
    await userEvent.click(trigger)
    const arrow = canvasElement.querySelector('.rotate-45')
    await expect(arrow).toBeTruthy()
  },
}

export const WithoutArrow: Story = {
  args: {
    content: <p>矢印なしポップオーバー</p>,
    arrow: false,
    children: <button>矢印なし</button>,
  },
  play: async ({ canvas, canvasElement }) => {
    const trigger = canvas.getByText('矢印なし')
    await userEvent.click(trigger)
    const arrow = canvasElement.querySelector('.rotate-45')
    await expect(arrow).toBeNull()
  },
}

export const RichContent: Story = {
  args: {
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px' }}>
        <p style={{ fontWeight: 'bold', margin: 0 }}>メニュー</p>
        <button>編集</button>
        <button>削除</button>
        <a href="#">詳細を見る</a>
      </div>
    ),
    children: <button>メニューを開く</button>,
  },
}

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Popover content={<p>制御されたポップオーバー</p>} open={isOpen} onOpenChange={setIsOpen}>
          <button>トリガー</button>
        </Popover>
        <button onClick={() => setIsOpen(!isOpen)}>外部から{isOpen ? '閉じる' : '開く'}</button>
        <span>状態: {isOpen ? '開' : '閉'}</span>
      </div>
    )
  },
}

export const WithOffset: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <Popover content={<p>デフォルト</p>} placement="bottom">
        <button>Default</button>
      </Popover>
      <Popover content={<p>0px</p>} placement="bottom" offset={0}>
        <button>Offset 0</button>
      </Popover>
      <Popover content={<p>16px</p>} placement="bottom" offset={16}>
        <button>Offset 16</button>
      </Popover>
      <Popover content={<p>24px</p>} placement="bottom" offset={24}>
        <button>Offset 24</button>
      </Popover>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    content: <p>表示されない</p>,
    disabled: true,
    children: <button>無効状態</button>,
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByText('無効状態')
    await userEvent.click(trigger)
    await expect(canvas.queryByRole('dialog')).toBeNull()
  },
}

export const AriaAttributes: Story = {
  args: {
    content: <p>ARIA テスト</p>,
    children: <button>ARIA trigger</button>,
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByText('ARIA trigger').closest('span[role="button"]')!

    // 初期状態: aria-expanded="false"
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')

    // クリック後: aria-expanded="true", aria-controls がダイアログの ID に一致
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const dialog = canvas.getByRole('dialog')
    await expect(trigger).toHaveAttribute('aria-controls', dialog.id)
  },
}

export const EscapeClose: Story = {
  args: {
    content: <p>Escape で閉じる</p>,
    children: <button>Escape テスト</button>,
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByText('Escape テスト')
    await userEvent.click(trigger)
    await expect(canvas.getByRole('dialog')).toBeTruthy()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull())
  },
}

export const Nested: Story = {
  render: () => (
    <Popover
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '180px' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>親ポップオーバー</p>
          <Popover content={<p>子ポップオーバー</p>} placement="right">
            <button>子を開く</button>
          </Popover>
        </div>
      }
    >
      <button>親を開く</button>
    </Popover>
  ),
  play: async ({ canvas }) => {
    // 親ポップオーバーを開く
    await userEvent.click(canvas.getByText('親を開く'))
    await expect(canvas.getByText('親ポップオーバー')).toBeTruthy()

    // 子ポップオーバーを開く
    await userEvent.click(canvas.getByText('子を開く'))
    await expect(canvas.getByText('子ポップオーバー')).toBeTruthy()

    // 両方が同時に表示されている
    await expect(canvas.getByText('親ポップオーバー')).toBeTruthy()
    await expect(canvas.getByText('子ポップオーバー')).toBeTruthy()

    // 親コンテンツをクリック → 子だけ閉じる（親は残る）
    await userEvent.click(canvas.getByText('親ポップオーバー'))
    await waitFor(() => expect(canvas.queryByText('子ポップオーバー')).toBeNull())
    await expect(canvas.getByText('親ポップオーバー')).toBeTruthy()

    // 子を再度開く
    await userEvent.click(canvas.getByText('子を開く'))
    await expect(canvas.getByText('子ポップオーバー')).toBeTruthy()

    // Escape で子だけ閉じる（親は残る）
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(canvas.queryByText('子ポップオーバー')).toBeNull())
    await expect(canvas.getByText('親ポップオーバー')).toBeTruthy()

    // もう一度 Escape で親も閉じる
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(canvas.queryByText('親ポップオーバー')).toBeNull())
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        <Popover content={<p>Top</p>} placement="top">
          <button>Top</button>
        </Popover>
        <Popover content={<p>Bottom</p>} placement="bottom">
          <button>Bottom</button>
        </Popover>
        <Popover content={<p>Left</p>} placement="left">
          <button>Left</button>
        </Popover>
        <Popover content={<p>Right</p>} placement="right">
          <button>Right</button>
        </Popover>
      </div>
      <div style={{ display: 'flex', gap: '3rem' }}>
        <Popover content={<p>矢印あり</p>} placement="bottom" arrow>
          <button>Arrow</button>
        </Popover>
        <Popover content={<p>矢印なし</p>} placement="bottom" arrow={false}>
          <button>No Arrow</button>
        </Popover>
        <Popover content={<p>Offset 16</p>} placement="bottom" offset={16}>
          <button>Offset</button>
        </Popover>
      </div>
    </div>
  ),
}
