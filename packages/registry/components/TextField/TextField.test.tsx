import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { TextField } from './TextField'

describe('TextField', () => {
  it('renders as input element', () => {
    const { container } = render(<TextField />)
    expect(container.firstChild?.nodeName).toBe('INPUT')
  })

  it('has type="text" by default', () => {
    render(<TextField />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<TextField ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('merges className', () => {
    const { container } = render(<TextField className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
    expect(container.firstChild).toHaveClass('w-full')
  })

  it('sets displayName', () => {
    expect(TextField.displayName).toBe('TextField')
  })

  it('applies aria-invalid when error is true', () => {
    render(<TextField error />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not apply aria-invalid when error is false', () => {
    render(<TextField />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'false')
  })

  it('applies disabled attribute', () => {
    render(<TextField disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('generates id when not provided', () => {
    render(<TextField />)
    const input = screen.getByRole('textbox')
    expect(input.id).toBeTruthy()
  })

  it('uses provided id', () => {
    render(<TextField id="custom-id" />)
    const input = screen.getByRole('textbox')
    expect(input.id).toBe('custom-id')
  })

  it('applies aria-describedby when provided', () => {
    render(<TextField aria-describedby="help-text" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'help-text')
  })

  it('passes through additional props', () => {
    render(<TextField placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
  })
})
