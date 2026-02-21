import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders an SVG with role="status"', () => {
    const { container } = render(<Spinner />)
    const svg = container.firstChild as SVGSVGElement
    expect(svg.tagName).toBe('svg')
    expect(svg.getAttribute('role')).toBe('status')
  })

  it('has default aria-label of "Loading"', () => {
    const { getByRole } = render(<Spinner />)
    expect(getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })

  it('accepts custom label', () => {
    const { getByRole } = render(<Spinner label="Saving" />)
    expect(getByRole('status')).toHaveAttribute('aria-label', 'Saving')
  })

  it('renders SVG title element with label text', () => {
    const { container } = render(<Spinner label="Processing" />)
    const title = container.querySelector('title')
    expect(title?.textContent).toBe('Processing')
  })

  it('applies default size (md) classes', () => {
    const { container } = render(<Spinner />)
    const svg = container.firstChild as SVGSVGElement
    expect(svg).toHaveClass('h-5', 'w-5')
  })

  it('applies size variant classes', () => {
    const { container: xxs } = render(<Spinner size="xxs" />)
    expect(xxs.firstChild).toHaveClass('h-3', 'w-3')

    const { container: lg } = render(<Spinner size="lg" />)
    expect(lg.firstChild).toHaveClass('h-6', 'w-6')
  })

  it('applies rotation animation class', () => {
    const { container } = render(<Spinner />)
    const svg = container.firstChild as SVGSVGElement
    expect(svg).toHaveClass('animate-spinner-rotate')
  })

  it('applies dash animation class to circle', () => {
    const { container } = render(<Spinner />)
    const circle = container.querySelector('circle')
    expect(circle).toHaveClass('animate-spinner-dash')
  })

  it('uses currentColor for stroke', () => {
    const { container } = render(<Spinner />)
    const circle = container.querySelector('circle')
    expect(circle?.getAttribute('stroke')).toBe('currentColor')
  })

  it('merges custom className', () => {
    const { container } = render(<Spinner className="text-red-500" />)
    const svg = container.firstChild as SVGSVGElement
    expect(svg).toHaveClass('text-red-500')
    expect(svg).toHaveClass('animate-spinner-rotate')
  })

  it('forwards ref to SVG element', () => {
    const ref = React.createRef<SVGSVGElement>()
    render(<Spinner ref={ref} />)
    expect(ref.current).toBeInstanceOf(SVGSVGElement)
  })

  it('passes through SVG attributes', () => {
    const { container } = render(<Spinner data-testid="my-spinner" />)
    const svg = container.firstChild as SVGSVGElement
    expect(svg.getAttribute('data-testid')).toBe('my-spinner')
  })
})
