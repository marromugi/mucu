import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Button } from './Button'

const MockIcon: React.ComponentType<React.SVGAttributes<SVGElement>> = (
  props,
) => (
  <svg data-testid="mock-icon" {...props}>
    <path d="M12 4v16m-8-8h16" />
  </svg>
)

describe('Button', () => {
  it('renders as button by default', () => {
    const { container } = render(<Button>hello</Button>)
    expect(container.firstChild?.nodeName).toBe('BUTTON')
  })

  it('applies default variant focus ring classes', () => {
    const { container } = render(<Button>hello</Button>)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('group')
    expect(el).toHaveClass('rounded-full')
  })

  it('applies primary variant focus ring class', () => {
    const { container } = render(<Button variant="primary">hello</Button>)
    expect(container.firstChild).toHaveClass(
      'focus-visible:ring-neutral-950',
    )
  })

  it('applies secondary variant focus ring class', () => {
    const { container } = render(<Button variant="secondary">hello</Button>)
    expect(container.firstChild).toHaveClass(
      'focus-visible:ring-neutral-400',
    )
  })

  it('applies alert variant focus ring class', () => {
    const { container } = render(<Button variant="alert">hello</Button>)
    expect(container.firstChild).toHaveClass('focus-visible:ring-red-600')
  })

  it('sets disabled attribute', () => {
    const { container } = render(<Button disabled>hello</Button>)
    expect(container.firstChild).toHaveAttribute('disabled')
  })

  it('renders as different element with as prop', () => {
    const { container } = render(<Button as="a">hello</Button>)
    expect(container.firstChild?.nodeName).toBe('A')
  })

  it('merges className', () => {
    const { container } = render(
      <Button className="custom-class">hello</Button>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('group')
    expect(el).toHaveClass('custom-class')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>hello</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('passes variant to ButtonBase', () => {
    const { container } = render(
      <Button variant="secondary">hello</Button>,
    )
    const inner = container.querySelector('span')
    expect(inner).toHaveClass('bg-neutral-50')
  })

  it('passes size to ButtonBase', () => {
    const { container } = render(<Button size="sm">hello</Button>)
    const inner = container.querySelector('span')
    expect(inner).toHaveClass('h-8')
  })

  it('passes fullWidth to ButtonBase', () => {
    const { container } = render(<Button fullWidth>hello</Button>)
    const inner = container.querySelector('span')
    expect(inner).toHaveClass('w-full')
  })

  it('passes icon to ButtonBase', () => {
    const { container } = render(
      <Button icon={MockIcon}>hello</Button>,
    )
    const icon = container.querySelector('[data-testid="mock-icon"]')
    expect(icon).toBeTruthy()
  })

  it('renders children inside ButtonBase', () => {
    const { getByText } = render(<Button>click me</Button>)
    const text = getByText('click me')
    expect(text.closest('span')).toBeTruthy()
  })
})
