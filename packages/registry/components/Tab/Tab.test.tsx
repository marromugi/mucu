import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'

vi.mock('motion/react', () => ({
  motion: {
    span: (props: React.HTMLAttributes<HTMLSpanElement>) => <span {...props} />,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import { Tab } from './Tab'

const items = [
  { value: 'a', label: 'Tab A' },
  { value: 'b', label: 'Tab B' },
  { value: 'c', label: 'Tab C' },
]

describe('Tab', () => {
  it('renders as div by default', () => {
    const { container } = render(<Tab items={items} value="a" onChange={() => {}} />)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders as different element with as prop', () => {
    const { container } = render(<Tab as="nav" items={items} value="a" onChange={() => {}} />)
    expect(container.firstChild?.nodeName).toBe('NAV')
  })

  it('applies tablist role', () => {
    render(<Tab items={items} value="a" onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeTruthy()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Tab ref={ref} items={items} value="a" onChange={() => {}} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('merges className', () => {
    const { container } = render(
      <Tab className="custom-class" items={items} value="a" onChange={() => {}} />,
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('sets displayName', () => {
    expect(Tab.displayName).toBe('Tab')
  })

  it('renders all tab items as buttons', () => {
    render(<Tab items={items} value="a" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)
    expect(tabs[0]).toHaveTextContent('Tab A')
    expect(tabs[1]).toHaveTextContent('Tab B')
    expect(tabs[2]).toHaveTextContent('Tab C')
  })

  it('sets aria-selected on the active tab', () => {
    render(<Tab items={items} value="b" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
  })

  it('sets tabIndex=0 on active, -1 on inactive', () => {
    render(<Tab items={items} value="a" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('tabindex', '0')
    expect(tabs[1]).toHaveAttribute('tabindex', '-1')
    expect(tabs[2]).toHaveAttribute('tabindex', '-1')
  })

  it('calls onChange when a tab is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Tab items={items} value="a" onChange={onChange} />)
    await user.click(screen.getByText('Tab B'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('applies minWidth style when provided', () => {
    render(<Tab items={items} value="a" onChange={() => {}} minWidth={120} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveStyle({ minWidth: '120px' })
  })

  it('does not apply minWidth style when not provided', () => {
    render(<Tab items={items} value="a" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0].style.minWidth).toBe('')
  })
})
