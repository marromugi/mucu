import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { Toast } from './Toast'
import type { ToastData, ToastType } from './type'

vi.mock('motion/react', () => ({
  motion: {
    div: React.forwardRef(
      (props: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => {
        const { children, ...rest } = props
        return (
          <div ref={ref} {...rest}>
            {children}
          </div>
        )
      }
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const defaultData: ToastData = {
  id: 'test-toast-1',
  title: 'Test Title',
  type: 'default',
  duration: 5000,
  closable: true,
  showIcon: true,
}

const defaultProps = {
  data: defaultData,
  onClose: vi.fn(),
  position: 'top-right' as const,
}

describe('Toast', () => {
  it('renders alert role', () => {
    render(<Toast {...defaultProps} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders title', () => {
    render(<Toast {...defaultProps} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders message when present', () => {
    render(
      <Toast
        {...defaultProps}
        data={{ ...defaultData, message: 'Test Message' }}
      />
    )
    expect(screen.getByText('Test Message')).toBeInTheDocument()
  })

  it('does not render message when absent', () => {
    render(<Toast {...defaultProps} />)
    const content = screen.getByText('Test Title').parentElement
    expect(content?.children).toHaveLength(1)
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Toast {...defaultProps} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('has displayName set to Toast', () => {
    expect(Toast.displayName).toBe('Toast')
  })

  it('merges className on root and retains base classes', () => {
    render(<Toast {...defaultProps} className="custom-class" />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('custom-class')
    expect(alert).toHaveClass('pointer-events-auto')
  })

  it('renders close button when closable is true', () => {
    render(<Toast {...defaultProps} />)
    expect(screen.getByLabelText('閉じる')).toBeInTheDocument()
  })

  it('does not render close button when closable is false', () => {
    render(
      <Toast
        {...defaultProps}
        data={{ ...defaultData, closable: false }}
      />
    )
    expect(screen.queryByLabelText('閉じる')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<Toast {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('閉じる'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it.each<ToastType>(['success', 'error', 'warning', 'info'])(
    'renders icon for %s type',
    (type) => {
      const { container } = render(
        <Toast
          {...defaultProps}
          data={{ ...defaultData, type }}
        />
      )
      const iconWrapper = container.querySelector('span')
      expect(iconWrapper).toBeInTheDocument()
    }
  )

  it('does not render icon for default type', () => {
    const { container } = render(
      <Toast
        {...defaultProps}
        data={{ ...defaultData, type: 'default' }}
      />
    )
    const iconWrapper = container.querySelector('span')
    expect(iconWrapper).not.toBeInTheDocument()
  })

  it('renders progress bar when duration > 0', () => {
    const { container } = render(<Toast {...defaultProps} />)
    const progressBar = container.querySelector('[class*="origin-left"]')
    expect(progressBar).toBeInTheDocument()
  })

  it('does not render progress bar when duration is 0', () => {
    const { container } = render(
      <Toast
        {...defaultProps}
        data={{ ...defaultData, duration: 0 }}
      />
    )
    const progressBar = container.querySelector('[class*="origin-left"]')
    expect(progressBar).not.toBeInTheDocument()
  })

  it('sets aria-live to assertive for error type', () => {
    render(
      <Toast
        {...defaultProps}
        data={{ ...defaultData, type: 'error' }}
      />
    )
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive')
  })

  it.each<ToastType>(['success', 'warning', 'info', 'default'])(
    'sets aria-live to polite for %s type',
    (type) => {
      render(
        <Toast
          {...defaultProps}
          data={{ ...defaultData, type }}
        />
      )
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite')
    }
  )
})
