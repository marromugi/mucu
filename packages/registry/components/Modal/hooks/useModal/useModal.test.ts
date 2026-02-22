import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useModal } from './useModal'

describe('useModal', () => {
  const defaultParams = {
    open: false,
    onOpenChange: vi.fn(),
    closeOnOverlayClick: true,
    closeOnEscape: true,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('modalId が文字列として返される', () => {
    const { result } = renderHook(() => useModal(defaultParams))
    expect(typeof result.current.modalId).toBe('string')
    expect(result.current.modalId.length).toBeGreaterThan(0)
  })

  it('titleId が modalId ベースで生成される', () => {
    const { result } = renderHook(() => useModal(defaultParams))
    expect(result.current.titleId).toBe(`${result.current.modalId}-title`)
  })

  it('handleClose が onOpenChange(false) を呼ぶ', () => {
    const onOpenChange = vi.fn()
    const { result } = renderHook(() =>
      useModal({ ...defaultParams, open: true, onOpenChange }),
    )

    act(() => result.current.handleClose())
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('handleOverlayClick: closeOnOverlayClick=true でコンテンツ外クリック時に閉じる', () => {
    const onOpenChange = vi.fn()
    const { result } = renderHook(() =>
      useModal({ ...defaultParams, open: true, onOpenChange, closeOnOverlayClick: true }),
    )

    const overlayEvent = {
      target: document.createElement('div'),
    } as unknown as React.MouseEvent

    act(() => result.current.handleOverlayClick(overlayEvent))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('handleOverlayClick: closeOnOverlayClick=false で閉じない', () => {
    const onOpenChange = vi.fn()
    const { result } = renderHook(() =>
      useModal({ ...defaultParams, open: true, onOpenChange, closeOnOverlayClick: false }),
    )

    const overlayEvent = {
      target: document.createElement('div'),
    } as unknown as React.MouseEvent

    act(() => result.current.handleOverlayClick(overlayEvent))
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('Escape キーで closeOnEscape=true の場合閉じる', () => {
    const onOpenChange = vi.fn()
    renderHook(() =>
      useModal({ ...defaultParams, open: true, onOpenChange, closeOnEscape: true }),
    )

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('Escape キーで closeOnEscape=false の場合閉じない', () => {
    const onOpenChange = vi.fn()
    renderHook(() =>
      useModal({ ...defaultParams, open: true, onOpenChange, closeOnEscape: false }),
    )

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('open=true でスクロールロックが適用される', () => {
    renderHook(() => useModal({ ...defaultParams, open: true }))
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('open=false でスクロールロックが解除される', () => {
    const { rerender } = renderHook(
      ({ open }) => useModal({ ...defaultParams, open }),
      { initialProps: { open: true } },
    )

    expect(document.body.style.overflow).toBe('hidden')

    rerender({ open: false })
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('contentRef が返される', () => {
    const { result } = renderHook(() => useModal(defaultParams))
    expect(result.current.contentRef).toBeDefined()
    expect(result.current.contentRef.current).toBeNull()
  })
})
