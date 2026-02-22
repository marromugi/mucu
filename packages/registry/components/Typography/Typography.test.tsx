import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Typography } from './Typography'

describe('Typography', () => {
  it('renders as span by default', () => {
    const { container } = render(<Typography>hello</Typography>)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('applies default variant classes (body, md, normal)', () => {
    const { container } = render(<Typography>hello</Typography>)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('text-neutral-900')
    expect(el).toHaveClass('text-base')
    expect(el).toHaveClass('font-normal')
  })

  it('applies description variant classes', () => {
    const { container } = render(
      <Typography variant="description">hello</Typography>,
    )
    expect(container.firstChild).toHaveClass('text-neutral-500')
  })

  it('applies alert variant classes', () => {
    const { container } = render(
      <Typography variant="alert">hello</Typography>,
    )
    expect(container.firstChild).toHaveClass('text-red-500')
  })

  it('applies disabled variant classes', () => {
    const { container } = render(
      <Typography variant="disabled">hello</Typography>,
    )
    expect(container.firstChild).toHaveClass('text-neutral-300')
  })

  it('applies fill variant classes', () => {
    const { container } = render(
      <Typography variant="fill">hello</Typography>,
    )
    expect(container.firstChild).toHaveClass('text-neutral-50')
  })

  it('applies xs size class', () => {
    const { container } = render(<Typography size="xs">hello</Typography>)
    expect(container.firstChild).toHaveClass('text-xs')
  })

  it('applies sm size class', () => {
    const { container } = render(<Typography size="sm">hello</Typography>)
    expect(container.firstChild).toHaveClass('text-sm')
  })

  it('applies lg size class', () => {
    const { container } = render(<Typography size="lg">hello</Typography>)
    expect(container.firstChild).toHaveClass('text-lg')
  })

  it('applies xl size class', () => {
    const { container } = render(<Typography size="xl">hello</Typography>)
    expect(container.firstChild).toHaveClass('text-xl')
  })

  it('applies 2xl size class', () => {
    const { container } = render(<Typography size="2xl">hello</Typography>)
    expect(container.firstChild).toHaveClass('text-2xl')
  })

  it('applies 3xl size class', () => {
    const { container } = render(<Typography size="3xl">hello</Typography>)
    expect(container.firstChild).toHaveClass('text-3xl')
  })

  it('applies 4xl size class', () => {
    const { container } = render(<Typography size="4xl">hello</Typography>)
    expect(container.firstChild).toHaveClass('text-4xl')
  })

  it('applies medium weight class', () => {
    const { container } = render(
      <Typography weight="medium">hello</Typography>,
    )
    expect(container.firstChild).toHaveClass('font-medium')
  })

  it('applies semibold weight class', () => {
    const { container } = render(
      <Typography weight="semibold">hello</Typography>,
    )
    expect(container.firstChild).toHaveClass('font-semibold')
  })

  it('applies bold weight class', () => {
    const { container } = render(
      <Typography weight="bold">hello</Typography>,
    )
    expect(container.firstChild).toHaveClass('font-bold')
  })

  it('renders as different element with as prop', () => {
    const { container } = render(<Typography as="h1">hello</Typography>)
    expect(container.firstChild?.nodeName).toBe('H1')
  })

  it('merges custom className', () => {
    const { container } = render(
      <Typography className="custom-class">hello</Typography>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('text-neutral-900')
    expect(el).toHaveClass('custom-class')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Typography ref={ref}>hello</Typography>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('passes through HTML attributes', () => {
    const { container } = render(
      <Typography id="test-id" data-testid="test">
        hello
      </Typography>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('id', 'test-id')
    expect(el).toHaveAttribute('data-testid', 'test')
  })

  it('sets data-variant attribute', () => {
    const { container } = render(
      <Typography variant="alert">hello</Typography>,
    )
    expect(container.firstChild).toHaveAttribute('data-variant', 'alert')
  })
})
