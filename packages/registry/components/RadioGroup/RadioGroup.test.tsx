import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { RadioGroup } from './RadioGroup'
import { RadioGroupItem } from './RadioGroupItem'

describe('RadioGroup', () => {
  it('renders as div by default', () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders as different element with as prop', () => {
    const { container } = render(
      <RadioGroup as="fieldset" defaultValue="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(container.firstChild?.nodeName).toBe('FIELDSET')
  })

  it('applies radiogroup role', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(screen.getByRole('radiogroup')).toBeTruthy()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <RadioGroup ref={ref} defaultValue="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('merges className', () => {
    const { container } = render(
      <RadioGroup className="custom-class" defaultValue="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(container.firstChild).toHaveClass('custom-class')
    expect(container.firstChild).toHaveClass('flex')
  })

  it('sets displayName', () => {
    expect(RadioGroup.displayName).toBe('RadioGroup')
  })

  it('sets aria-orientation', () => {
    render(
      <RadioGroup defaultValue="a" orientation="horizontal">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('sets aria-disabled when disabled', () => {
    render(
      <RadioGroup defaultValue="a" disabled>
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-disabled', 'true')
  })

  it('sets aria-required when required', () => {
    render(
      <RadioGroup defaultValue="a" required>
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-required', 'true')
  })

  it('applies horizontal orientation classes', () => {
    const { container } = render(
      <RadioGroup defaultValue="a" orientation="horizontal">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(container.firstChild).toHaveClass('flex-row')
  })

  it('applies vertical orientation classes by default', () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    expect(container.firstChild).toHaveClass('flex-col')
  })
})

describe('RadioGroupItem', () => {
  it('throws when used outside RadioGroup', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<RadioGroupItem value="a">A</RadioGroupItem>)).toThrow(
      'RadioGroupItem must be used within a RadioGroup',
    )
    spy.mockRestore()
  })

  it('renders as label by default', () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    const label = container.querySelector('label')
    expect(label).toBeTruthy()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem ref={ref} value="a">
          A
        </RadioGroupItem>
      </RadioGroup>,
    )
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('merges className', () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" className="custom-item">
          A
        </RadioGroupItem>
      </RadioGroup>,
    )
    const label = container.querySelector('label')
    expect(label).toHaveClass('custom-item')
    expect(label).toHaveClass('group')
  })

  it('sets displayName', () => {
    expect(RadioGroupItem.displayName).toBe('RadioGroupItem')
  })

  it('renders hidden radio input', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    )
    const radio = screen.getByRole('radio')
    expect(radio).toBeTruthy()
    expect(radio).toHaveClass('sr-only')
  })

  it('selects item on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <RadioGroup defaultValue="a" onValueChange={onChange}>
        <RadioGroupItem value="a">A</RadioGroupItem>
        <RadioGroupItem value="b">B</RadioGroupItem>
      </RadioGroup>,
    )
    await user.click(screen.getByText('B'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('respects defaultValue', () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a">A</RadioGroupItem>
        <RadioGroupItem value="b">B</RadioGroupItem>
      </RadioGroup>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).not.toBeChecked()
    expect(radios[1]).toBeChecked()
  })

  it('respects controlled value', () => {
    render(
      <RadioGroup value="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
        <RadioGroupItem value="b">B</RadioGroupItem>
      </RadioGroup>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toBeChecked()
    expect(radios[1]).not.toBeChecked()
  })

  it('does not change when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <RadioGroup defaultValue="a" disabled onValueChange={onChange}>
        <RadioGroupItem value="a">A</RadioGroupItem>
        <RadioGroupItem value="b">B</RadioGroupItem>
      </RadioGroup>,
    )
    await user.click(screen.getByText('B'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
