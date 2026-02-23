import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('wraps input in a div', () => {
    const { container } = render(<Checkbox />)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Checkbox ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.type).toBe('checkbox')
  })

  it('sets displayName', () => {
    expect(Checkbox.displayName).toBe('Checkbox')
  })

  it('merges className on wrapper element', () => {
    const { container } = render(<Checkbox className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
    expect(container.firstChild).toHaveClass('inline-flex')
  })

  it('renders label with correct htmlFor', () => {
    render(<Checkbox label="Accept terms" id="terms" />)
    const label = screen.getByText('Accept terms')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for', 'terms')
  })

  it('does not render label when label prop is not provided', () => {
    const { container } = render(<Checkbox />)
    expect(container.querySelector('label')).toBeNull()
  })

  it('generates id when not provided', () => {
    render(<Checkbox />)
    const input = screen.getByRole('checkbox')
    expect(input.id).toBeTruthy()
  })

  it('uses provided id', () => {
    render(<Checkbox id="custom-id" />)
    const input = screen.getByRole('checkbox')
    expect(input.id).toBe('custom-id')
  })

  it('associates generated id between input and label', () => {
    render(<Checkbox label="My checkbox" />)
    const input = screen.getByRole('checkbox')
    const label = screen.getByText('My checkbox')
    expect(label).toHaveAttribute('for', input.id)
  })

  it('applies sm size classes', () => {
    const { container } = render(<Checkbox size="sm" label="Small" />)
    const input = screen.getByRole('checkbox')
    const label = screen.getByText('Small')
    expect(input).toHaveClass('h-4', 'w-4')
    expect(label).toHaveClass('text-sm')
  })

  it('applies md size classes by default', () => {
    const { container } = render(<Checkbox label="Medium" />)
    const input = screen.getByRole('checkbox')
    const label = screen.getByText('Medium')
    expect(input).toHaveClass('h-5', 'w-5')
    expect(label).toHaveClass('text-base')
  })

  it('applies lg size classes', () => {
    const { container } = render(<Checkbox size="lg" label="Large" />)
    const input = screen.getByRole('checkbox')
    const label = screen.getByText('Large')
    expect(input).toHaveClass('h-6', 'w-6')
    expect(label).toHaveClass('text-lg')
  })

  it('applies disabled attribute', () => {
    render(<Checkbox disabled />)
    const input = screen.getByRole('checkbox')
    expect(input).toBeDisabled()
  })

  it('applies disabled variant classes', () => {
    const { container } = render(<Checkbox disabled label="Disabled" />)
    expect(container.firstChild).toHaveClass('opacity-50')
    const input = screen.getByRole('checkbox')
    expect(input).toHaveClass('cursor-not-allowed')
    const label = screen.getByText('Disabled')
    expect(label).toHaveClass('cursor-not-allowed')
  })

  it('supports controlled checked state', () => {
    const { rerender } = render(<Checkbox checked={false} onChange={() => {}} />)
    const input = screen.getByRole('checkbox')
    expect(input).not.toBeChecked()

    rerender(<Checkbox checked={true} onChange={() => {}} />)
    expect(input).toBeChecked()
  })

  it('supports defaultChecked', () => {
    render(<Checkbox defaultChecked />)
    const input = screen.getByRole('checkbox')
    expect(input).toBeChecked()
  })

  it('calls onChange handler', () => {
    const handleChange = vi.fn()
    render(<Checkbox onChange={handleChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('calls onCheckedChange handler with boolean', () => {
    const handleCheckedChange = vi.fn()
    render(<Checkbox onCheckedChange={handleCheckedChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleCheckedChange).toHaveBeenCalledWith(true)
  })

  it('passes through additional props', () => {
    render(<Checkbox data-testid="my-checkbox" name="agree" />)
    const input = screen.getByRole('checkbox')
    expect(input).toHaveAttribute('data-testid', 'my-checkbox')
    expect(input).toHaveAttribute('name', 'agree')
  })

  describe('indeterminate', () => {
    it('sets indeterminate property on the input element', () => {
      render(<Checkbox indeterminate />)
      const input = screen.getByRole('checkbox') as HTMLInputElement
      expect(input.indeterminate).toBe(true)
    })

    it('sets aria-checked to mixed when indeterminate', () => {
      render(<Checkbox indeterminate />)
      const input = screen.getByRole('checkbox')
      expect(input).toHaveAttribute('aria-checked', 'mixed')
    })

    it('does not set aria-checked when not indeterminate', () => {
      render(<Checkbox />)
      const input = screen.getByRole('checkbox')
      expect(input).not.toHaveAttribute('aria-checked')
    })

    it('supports indeterminate with disabled', () => {
      render(<Checkbox indeterminate disabled />)
      const input = screen.getByRole('checkbox') as HTMLInputElement
      expect(input.indeterminate).toBe(true)
      expect(input).toBeDisabled()
    })

    it('clears indeterminate when prop changes to false', () => {
      const { rerender } = render(<Checkbox indeterminate />)
      const input = screen.getByRole('checkbox') as HTMLInputElement
      expect(input.indeterminate).toBe(true)

      rerender(<Checkbox indeterminate={false} />)
      expect(input.indeterminate).toBe(false)
    })

    it('forwards ref correctly when indeterminate', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<Checkbox ref={ref} indeterminate />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
      expect(ref.current?.indeterminate).toBe(true)
    })
  })
})
