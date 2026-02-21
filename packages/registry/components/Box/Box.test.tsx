import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Box } from './Box'

describe('Box', () => {
  it('renders as div by default', () => {
    const { container } = render(<Box>hello</Box>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('applies bg-background class by default', () => {
    const { container } = render(<Box>hello</Box>)
    expect(container.firstChild).toHaveClass('bg-background')
  })

  it('applies bg-container class', () => {
    const { container } = render(<Box bg="container">hello</Box>)
    expect(container.firstChild).toHaveClass('bg-container')
  })

  it('applies bg-surface class', () => {
    const { container } = render(<Box bg="surface">hello</Box>)
    expect(container.firstChild).toHaveClass('bg-surface')
  })

  it('renders as different element with as prop', () => {
    const { container } = render(<Box as="section">hello</Box>)
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('merges className', () => {
    const { container } = render(<Box className="p-4">hello</Box>)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('bg-background')
    expect(el).toHaveClass('p-4')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Box ref={ref}>hello</Box>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
