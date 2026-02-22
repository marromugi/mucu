import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as React from 'react'
import { ButtonBase } from './ButtonBase'

const MockIcon: React.ComponentType<React.SVGAttributes<SVGElement>> = (
  props,
) => (
  <svg data-testid="mock-icon" {...props}>
    <path d="M12 4v16m-8-8h16" />
  </svg>
)

describe('ButtonBase', () => {
  it('renders as span by default', () => {
    const { container } = render(<ButtonBase>hello</ButtonBase>)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('applies default variant classes (primary, md)', () => {
    const { container } = render(<ButtonBase>hello</ButtonBase>)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('bg-primary-900')
    expect(el).toHaveClass('h-10')
  })

  it('applies secondary variant classes', () => {
    const { container } = render(
      <ButtonBase variant="secondary">hello</ButtonBase>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('bg-white')
    expect(el).toHaveClass('border')
  })

  it('applies alert variant classes', () => {
    const { container } = render(
      <ButtonBase variant="alert">hello</ButtonBase>,
    )
    expect(container.firstChild).toHaveClass('bg-transparent')
  })

  it('applies primary-ghost variant classes', () => {
    const { container } = render(
      <ButtonBase variant="primary-ghost">hello</ButtonBase>,
    )
    expect(container.firstChild).toHaveClass('bg-transparent')
  })

  it('applies alert-ghost variant classes', () => {
    const { container } = render(
      <ButtonBase variant="alert-ghost">hello</ButtonBase>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('bg-transparent')
    expect(el).toHaveClass('text-red-600')
  })

  it('applies size classes', () => {
    const { container } = render(<ButtonBase size="sm">hello</ButtonBase>)
    expect(container.firstChild).toHaveClass('h-8')
  })

  it('applies fullWidth class', () => {
    const { container } = render(<ButtonBase fullWidth>hello</ButtonBase>)
    expect(container.firstChild).toHaveClass('w-full')
  })

  it('applies loading state', () => {
    const { container } = render(
      <ButtonBase isLoading>hello</ButtonBase>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('cursor-wait')
    expect(el).toHaveAttribute('data-loading', 'true')
    expect(el.querySelector('svg')).toBeTruthy()
  })

  it('applies disabled state', () => {
    const { container } = render(<ButtonBase disabled>hello</ButtonBase>)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('opacity-50')
    expect(el).toHaveAttribute('data-disabled', 'true')
  })

  it('renders as different element with as prop', () => {
    const { container } = render(<ButtonBase as="div">hello</ButtonBase>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('merges className', () => {
    const { container } = render(
      <ButtonBase className="custom-class">hello</ButtonBase>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('bg-primary-900')
    expect(el).toHaveClass('custom-class')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<ButtonBase ref={ref}>hello</ButtonBase>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('renders icon on the left by default', () => {
    const { container } = render(
      <ButtonBase icon={MockIcon}>hello</ButtonBase>,
    )
    const el = container.firstChild as HTMLElement
    const icon = el.querySelector('[data-testid="mock-icon"]')
    expect(icon).toBeTruthy()
    expect(el.firstChild).toBe(icon)
  })

  it('renders icon on the right when iconPosition is right', () => {
    const { container } = render(
      <ButtonBase icon={MockIcon} iconPosition="right">
        hello
      </ButtonBase>,
    )
    const el = container.firstChild as HTMLElement
    const icon = el.querySelector('[data-testid="mock-icon"]')
    expect(icon).toBeTruthy()
    expect(el.lastChild).toBe(icon)
  })

  it('applies icon size classes', () => {
    const { container } = render(
      <ButtonBase icon={MockIcon} size="lg">
        hello
      </ButtonBase>,
    )
    const icon = container.querySelector('[data-testid="mock-icon"]')
    expect(icon).toHaveClass('w-6')
    expect(icon).toHaveClass('h-6')
  })
})
