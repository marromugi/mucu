import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { createElement } from 'react'
import { useToastState, useToast } from './useToast'
import { ToastContext } from '../../context'
import type { ToastContextValue } from '../../type'

describe('useToastState', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with empty toasts', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 5000, maxToasts: 5 })
    )
    expect(result.current.toasts).toEqual([])
  })

  it('adds a toast via addToast', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 5000, maxToasts: 5 })
    )

    act(() => {
      result.current.addToast({ title: 'Hello' })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Hello')
  })

  it('removes a toast via removeToast', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 5000, maxToasts: 5 })
    )

    let id: string
    act(() => {
      id = result.current.addToast({ title: 'Hello' })
    })

    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      result.current.removeToast(id!)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it('clears all toasts via clearToasts', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 5000, maxToasts: 5 })
    )

    act(() => {
      result.current.addToast({ title: 'Toast 1' })
      result.current.addToast({ title: 'Toast 2' })
      result.current.addToast({ title: 'Toast 3' })
    })

    expect(result.current.toasts).toHaveLength(3)

    act(() => {
      result.current.clearToasts()
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it('success sets type to success', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 5000, maxToasts: 5 })
    )

    act(() => {
      result.current.success('Success!')
    })

    expect(result.current.toasts[0].type).toBe('success')
  })

  it('error sets type to error', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 5000, maxToasts: 5 })
    )

    act(() => {
      result.current.error('Error!')
    })

    expect(result.current.toasts[0].type).toBe('error')
  })

  it('warning sets type to warning', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 5000, maxToasts: 5 })
    )

    act(() => {
      result.current.warning('Warning!')
    })

    expect(result.current.toasts[0].type).toBe('warning')
  })

  it('info sets type to info', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 5000, maxToasts: 5 })
    )

    act(() => {
      result.current.info('Info!')
    })

    expect(result.current.toasts[0].type).toBe('info')
  })

  it('auto-dismisses toast after duration', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 3000, maxToasts: 5 })
    )

    act(() => {
      result.current.addToast({ title: 'Auto dismiss' })
    })

    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it('enforces maxToasts limit', () => {
    const { result } = renderHook(() =>
      useToastState({ defaultDuration: 0, maxToasts: 3 })
    )

    act(() => {
      result.current.addToast({ title: 'Toast 1', duration: 0 })
      result.current.addToast({ title: 'Toast 2', duration: 0 })
      result.current.addToast({ title: 'Toast 3', duration: 0 })
      result.current.addToast({ title: 'Toast 4', duration: 0 })
    })

    expect(result.current.toasts).toHaveLength(3)
    expect(result.current.toasts[0].title).toBe('Toast 2')
    expect(result.current.toasts[2].title).toBe('Toast 4')
  })
})

describe('useToast', () => {
  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useToast())
    }).toThrow('useToast must be used within a ToastProvider')
  })

  it('returns context value inside provider', () => {
    const mockValue: ToastContextValue = {
      toasts: [],
      addToast: vi.fn(),
      removeToast: vi.fn(),
      clearToasts: vi.fn(),
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
      config: {
        position: 'top-right',
        gap: 12,
        defaultDuration: 5000,
        maxToasts: 5,
      },
    }

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(ToastContext.Provider, { value: mockValue }, children)

    const { result } = renderHook(() => useToast(), { wrapper })
    expect(result.current).toBe(mockValue)
  })
})
