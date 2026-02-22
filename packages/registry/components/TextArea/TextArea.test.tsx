import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { TextArea } from './TextArea'

describe('TextArea', () => {
  it('renders as textarea element', () => {
    const { container } = render(<TextArea />)
    expect(container.firstChild?.nodeName).toBe('TEXTAREA')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<TextArea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('merges className', () => {
    const { container } = render(<TextArea className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
    expect(container.firstChild).toHaveClass('w-full')
  })

  it('sets displayName', () => {
    expect(TextArea.displayName).toBe('TextArea')
  })

  it('applies aria-invalid when error is true', () => {
    render(<TextArea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-invalid', 'false')

    const { unmount } = render(<TextArea error />)
    const errorTextarea = screen.getAllByRole('textbox')[1]
    expect(errorTextarea).toHaveAttribute('aria-invalid', 'true')
    unmount()
  })

  it('applies disabled attribute', () => {
    render(<TextArea disabled />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('applies default rows=4', () => {
    const { container } = render(<TextArea />)
    expect(container.firstChild).toHaveAttribute('rows', '4')
  })

  it('applies custom rows', () => {
    const { container } = render(<TextArea rows={8} />)
    expect(container.firstChild).toHaveAttribute('rows', '8')
  })

  it('generates id when not provided', () => {
    render(<TextArea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.id).toBeTruthy()
  })

  it('uses provided id', () => {
    render(<TextArea id="custom-id" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.id).toBe('custom-id')
  })

  it('applies aria-describedby when provided', () => {
    render(<TextArea aria-describedby="help-text" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-describedby', 'help-text')
  })

  it('passes through additional props', () => {
    render(<TextArea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
  })
})
