import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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

import { Popover } from './Popover'

describe('Popover', () => {
  it('renders as div by default', () => {
    const { container } = render(
      <Popover content="popover text">
        <button>trigger</button>
      </Popover>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders as different element with as prop', () => {
    const { container } = render(
      <Popover as="span" content="popover text">
        <button>trigger</button>
      </Popover>,
    )
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Popover ref={ref} content="popover text">
        <button>trigger</button>
      </Popover>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('sets displayName', () => {
    expect(Popover.displayName).toBe('Popover')
  })

  it('does not show popover content initially', () => {
    render(
      <Popover content="popover text">
        <button>trigger</button>
      </Popover>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('supports nested popovers', async () => {
    const user = userEvent.setup()
    render(
      <Popover
        content={
          <div>
            <span>parent content</span>
            <Popover content={<span>child content</span>} placement="right">
              <button>open child</button>
            </Popover>
          </div>
        }
      >
        <button>open parent</button>
      </Popover>,
    )

    // 親を開く
    await user.click(screen.getByText('open parent'))
    expect(screen.getByText('parent content')).toBeTruthy()
    expect(screen.queryByText('child content')).toBeNull()

    // 子を開く
    await user.click(screen.getByText('open child'))
    expect(screen.getByText('child content')).toBeTruthy()

    // 両方同時に表示されている
    expect(screen.getByText('parent content')).toBeTruthy()
    expect(screen.getByText('child content')).toBeTruthy()

    // 親コンテンツをクリック → 子だけ閉じる（親は残る）
    await user.click(screen.getByText('parent content'))
    expect(screen.queryByText('child content')).toBeNull()
    expect(screen.getByText('parent content')).toBeTruthy()

    // 子を再度開く
    await user.click(screen.getByText('open child'))
    expect(screen.getByText('child content')).toBeTruthy()

    // Escape で子だけ閉じる（親は残る）
    await user.keyboard('{Escape}')
    expect(screen.queryByText('child content')).toBeNull()
    expect(screen.getByText('parent content')).toBeTruthy()

    // もう一度 Escape で親も閉じる
    await user.keyboard('{Escape}')
    expect(screen.queryByText('parent content')).toBeNull()
  })

  it('closes nested popovers one at a time on outside click (innermost first)', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <button>outside</button>
        <Popover
          content={
            <div>
              <span>parent content</span>
              <Popover content={<span>child content</span>} placement="right">
                <button>open child</button>
              </Popover>
            </div>
          }
        >
          <button>open parent</button>
        </Popover>
      </div>,
    )

    // 両方開く
    await user.click(screen.getByText('open parent'))
    await user.click(screen.getByText('open child'))
    expect(screen.getByText('parent content')).toBeTruthy()
    expect(screen.getByText('child content')).toBeTruthy()

    // 完全に外側をクリック → 子だけ閉じる（親は残る）
    await user.click(screen.getByText('outside'))
    expect(screen.queryByText('child content')).toBeNull()
    expect(screen.getByText('parent content')).toBeTruthy()

    // もう一度外側をクリック → 親も閉じる
    await user.click(screen.getByText('outside'))
    expect(screen.queryByText('parent content')).toBeNull()
  })
})
