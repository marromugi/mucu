import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calendar } from './Calendar'

describe('Calendar', () => {
  it('renders calendar grid', () => {
    render(<Calendar defaultValue={new Date(2025, 0, 15)} />)
    expect(screen.getByText('15')).toBeTruthy()
  })

  it('displays weekday headers', () => {
    render(<Calendar locale="en" weekStartsOn={0} />)
    expect(screen.getByText('Sun')).toBeTruthy()
    expect(screen.getByText('Sat')).toBeTruthy()
  })

  it('displays weekday headers for Monday start', () => {
    render(<Calendar locale="en" weekStartsOn={1} />)
    const weekdays = screen.getAllByText(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/)
    expect(weekdays[0]).toHaveTextContent('Mon')
  })

  it('navigates to previous month', async () => {
    const user = userEvent.setup()
    render(<Calendar defaultValue={new Date(2025, 1, 15)} />)
    expect(screen.getByText('Feb')).toBeTruthy()
    await user.click(screen.getByLabelText('Previous month'))
    expect(screen.getByText('Jan')).toBeTruthy()
  })

  it('navigates to next month', async () => {
    const user = userEvent.setup()
    render(<Calendar defaultValue={new Date(2025, 0, 15)} />)
    expect(screen.getByText('Jan')).toBeTruthy()
    await user.click(screen.getByLabelText('Next month'))
    expect(screen.getByText('Feb')).toBeTruthy()
  })

  it('calls onChange when a date is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Calendar defaultValue={new Date(2025, 0, 15)} onChange={onChange} />)
    await user.click(screen.getByText('20'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].getDate()).toBe(20)
  })

  it('sets aria-selected on selected date', () => {
    render(<Calendar defaultValue={new Date(2025, 0, 15)} />)
    const selectedButton = screen.getByText('15').closest('button')
    expect(selectedButton).toHaveAttribute('aria-selected', 'true')
  })

  it('sets aria-selected=false on non-selected dates', () => {
    render(<Calendar defaultValue={new Date(2025, 0, 15)} />)
    const otherButton = screen.getByText('10').closest('button')
    expect(otherButton).toHaveAttribute('aria-selected', 'false')
  })

  it('renders with controlled value', () => {
    render(<Calendar value={new Date(2025, 0, 15)} />)
    const selectedButton = screen.getByText('15').closest('button')
    expect(selectedButton).toHaveAttribute('aria-selected', 'true')
  })

  it('supports Japanese locale', () => {
    render(<Calendar locale="ja" weekStartsOn={0} />)
    expect(screen.getByText('日')).toBeTruthy()
    expect(screen.getByText('土')).toBeTruthy()
  })

  it('sets displayName', () => {
    expect(Calendar.displayName).toBe('Calendar')
  })

  it('merges className', () => {
    const { container } = render(<Calendar className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
    expect(container.firstChild).toHaveClass('w-full')
  })
})
