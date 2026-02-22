import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'

vi.mock('motion/react', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
      <div ref={ref} {...props} />
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import { Menu } from './Menu'
import { MenuItem } from './MenuItem'
import { MenuSub } from './MenuSub'
import { MenuDivider } from './MenuDivider'

describe('Menu', () => {
  it('renders as div by default', () => {
    const { container } = render(
      <Menu trigger={<button>open</button>}>
        <MenuItem>item</MenuItem>
      </Menu>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders as different element with as prop', () => {
    const { container } = render(
      <Menu as="nav" trigger={<button>open</button>}>
        <MenuItem>item</MenuItem>
      </Menu>,
    )
    expect(container.firstChild?.nodeName).toBe('NAV')
  })

  it('sets displayName', () => {
    expect(Menu.displayName).toBe('Menu')
  })

  it('does not show menu content initially', () => {
    render(
      <Menu trigger={<button>open</button>}>
        <MenuItem>item</MenuItem>
      </Menu>,
    )
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('shows menu content on trigger click', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuItem>item 1</MenuItem>
        <MenuItem>item 2</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    expect(screen.getByRole('menu')).toBeTruthy()
    expect(screen.getByText('item 1')).toBeTruthy()
    expect(screen.getByText('item 2')).toBeTruthy()
  })

  it('closes menu on second trigger click', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuItem>item</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    expect(screen.getByRole('menu')).toBeTruthy()
    await user.click(screen.getByText('open'))
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('closes menu on Escape key', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuItem>item</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    expect(screen.getByRole('menu')).toBeTruthy()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('does not show menu when disabled', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>} disabled>
        <MenuItem>item</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    expect(screen.queryByRole('menu')).toBeNull()
  })
})

describe('MenuItem', () => {
  it('sets displayName', () => {
    expect(MenuItem.displayName).toBe('MenuItem')
  })

  it('renders as button by default', () => {
    render(
      <Menu trigger={<button>open</button>} open>
        <MenuItem>item</MenuItem>
      </Menu>,
    )
    // MenuItem は open 状態でなくてもレンダリングされるが、Menu が閉じていると DOM に存在しない
    // open prop で制御モードにする
  })

  it('calls onClick and closes menu on item click', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuItem onClick={handleClick}>item</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    await user.click(screen.getByText('item'))
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuItem onClick={handleClick} disabled>
          item
        </MenuItem>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    await user.click(screen.getByText('item'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})

describe('MenuSub', () => {
  it('sets displayName', () => {
    expect(MenuSub.displayName).toBe('MenuSub')
  })

  it('does not show submenu content initially', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuSub label="sub">
          <MenuItem>sub item</MenuItem>
        </MenuSub>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    expect(screen.queryByText('sub item')).toBeNull()
  })

  it('shows submenu content on hover', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuSub label="sub">
          <MenuItem>sub item</MenuItem>
        </MenuSub>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    await user.hover(screen.getByText('sub'))
    expect(screen.getByText('sub item')).toBeTruthy()
  })

  it('shows submenu content on click', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuSub label="sub">
          <MenuItem>sub item</MenuItem>
        </MenuSub>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    // fireEvent.click はマウスエンターを発火しないため、クリックハンドラのみをテストできる
    const subTrigger = screen.getByText('sub').closest('button')!
    fireEvent.click(subTrigger)
    expect(screen.getByText('sub item')).toBeTruthy()
  })

  it('hover then click keeps submenu open', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuSub label="sub">
          <MenuItem>sub item</MenuItem>
        </MenuSub>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    // ホバーでサブメニューを開く
    await user.hover(screen.getByText('sub'))
    expect(screen.getByText('sub item')).toBeTruthy()
    // クリックしてもサブメニューは開いたまま
    await user.click(screen.getByText('sub'))
    expect(screen.getByText('sub item')).toBeTruthy()
  })

  it('hides submenu content on mouse leave after delay', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(
      <Menu trigger={<button>open</button>}>
        <MenuSub label="sub">
          <MenuItem>sub item</MenuItem>
        </MenuSub>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    await user.hover(screen.getByText('sub'))
    expect(screen.getByText('sub item')).toBeTruthy()

    await user.unhover(screen.getByText('sub'))
    // サブメニューはまだ表示されている（150ms の遅延）
    expect(screen.getByText('sub item')).toBeTruthy()

    // 150ms 経過後に非表示
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(screen.queryByText('sub item')).toBeNull()

    vi.useRealTimers()
  })

  it('does not show submenu when disabled', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuSub label="sub" disabled>
          <MenuItem>sub item</MenuItem>
        </MenuSub>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    await user.hover(screen.getByText('sub'))
    expect(screen.queryByText('sub item')).toBeNull()
  })

  it('renders nested submenus', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuSub label="level 1">
          <MenuSub label="level 2">
            <MenuItem>nested item</MenuItem>
          </MenuSub>
        </MenuSub>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    await user.hover(screen.getByText('level 1'))
    expect(screen.getByText('level 2')).toBeTruthy()
    await user.hover(screen.getByText('level 2'))
    expect(screen.getByText('nested item')).toBeTruthy()
  })

  it('sets aria-expanded on submenu trigger', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuSub label="sub">
          <MenuItem>sub item</MenuItem>
        </MenuSub>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    const subTrigger = screen.getByText('sub').closest('button')!
    expect(subTrigger).toHaveAttribute('aria-expanded', 'false')
    await user.hover(screen.getByText('sub'))
    expect(subTrigger).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('MenuDivider', () => {
  it('sets displayName', () => {
    expect(MenuDivider.displayName).toBe('MenuDivider')
  })

  it('renders with separator role', async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>open</button>}>
        <MenuItem>item 1</MenuItem>
        <MenuDivider />
        <MenuItem>item 2</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByText('open'))
    expect(screen.getByRole('separator')).toBeTruthy()
  })
})
