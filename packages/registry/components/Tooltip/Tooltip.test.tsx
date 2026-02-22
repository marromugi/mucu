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

import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('renders as div by default', () => {
    const { container } = render(
      <Tooltip content="tooltip text">
        <button>trigger</button>
      </Tooltip>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders as different element with as prop', () => {
    const { container } = render(
      <Tooltip as="span" content="tooltip text">
        <button>trigger</button>
      </Tooltip>,
    )
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Tooltip ref={ref} content="tooltip text">
        <button>trigger</button>
      </Tooltip>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('sets displayName', () => {
    expect(Tooltip.displayName).toBe('Tooltip')
  })

  it('does not show tooltip content initially', () => {
    render(
      <Tooltip content="tooltip text">
        <button>trigger</button>
      </Tooltip>,
    )
    expect(screen.queryByRole('tooltip')).toBeNull()
  })

  it('shows tooltip content on hover', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="tooltip text">
        <button>trigger</button>
      </Tooltip>,
    )
    await user.hover(screen.getByText('trigger'))
    expect(screen.getByRole('tooltip')).toHaveTextContent('tooltip text')
  })

  it('hides tooltip content on mouse leave', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="tooltip text">
        <button>trigger</button>
      </Tooltip>,
    )
    await user.hover(screen.getByText('trigger'))
    expect(screen.getByRole('tooltip')).toBeTruthy()
    await user.unhover(screen.getByText('trigger'))
    expect(screen.queryByRole('tooltip')).toBeNull()
  })

  it('does not show tooltip when disabled', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="tooltip text" disabled>
        <button>trigger</button>
      </Tooltip>,
    )
    await user.hover(screen.getByText('trigger'))
    expect(screen.queryByRole('tooltip')).toBeNull()
  })

  it('links trigger to tooltip via aria-describedby', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="tooltip text">
        <button>trigger</button>
      </Tooltip>,
    )
    await user.hover(screen.getByText('trigger'))
    const tooltip = screen.getByRole('tooltip')
    const trigger = screen.getByText('trigger')
    expect(trigger.closest('span')).toHaveAttribute('aria-describedby', tooltip.id)
  })

  it('renders arrow when arrow prop is true', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Tooltip content="tooltip text" arrow>
        <button>trigger</button>
      </Tooltip>,
    )
    await user.hover(screen.getByText('trigger'))
    const arrow = container.querySelector('.rotate-45')
    expect(arrow).toBeTruthy()
  })

  it('does not render arrow when arrow prop is false', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Tooltip content="tooltip text" arrow={false}>
        <button>trigger</button>
      </Tooltip>,
    )
    await user.hover(screen.getByText('trigger'))
    const arrow = container.querySelector('.rotate-45')
    expect(arrow).toBeNull()
  })
})
