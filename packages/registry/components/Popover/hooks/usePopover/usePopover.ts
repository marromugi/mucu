import type React from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { UsePopoverParams, UsePopoverReturn } from './type'

/** Escape キーで最後に開いたポップオーバーだけを閉じるためのスタック */
const escapeStack: (() => void)[] = []

const handleGlobalEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && escapeStack.length > 0) {
    escapeStack[escapeStack.length - 1]()
  }
}

let globalListenerActive = false

const addToEscapeStack = (handler: () => void) => {
  escapeStack.push(handler)
  if (!globalListenerActive) {
    document.addEventListener('keydown', handleGlobalEscape)
    globalListenerActive = true
  }
}

const removeFromEscapeStack = (handler: () => void) => {
  const index = escapeStack.indexOf(handler)
  if (index >= 0) escapeStack.splice(index, 1)
  if (escapeStack.length === 0 && globalListenerActive) {
    document.removeEventListener('keydown', handleGlobalEscape)
    globalListenerActive = false
  }
}

/** 外部クリックで最後に開いたポップオーバーだけを閉じるためのスタック */
interface OutsideClickEntry {
  ref: React.RefObject<HTMLElement | null>
  close: () => void
}

const outsideClickStack: OutsideClickEntry[] = []

const handleGlobalClick = (event: MouseEvent) => {
  const target = event.target as Node
  for (let i = outsideClickStack.length - 1; i >= 0; i--) {
    const entry = outsideClickStack[i]
    const wrapper = entry.ref.current
    if (!wrapper) continue
    if (!wrapper.contains(target)) {
      entry.close()
      return
    }
    return
  }
}

let globalClickListenerActive = false

const addToOutsideClickStack = (entry: OutsideClickEntry) => {
  outsideClickStack.push(entry)
  if (!globalClickListenerActive) {
    document.addEventListener('click', handleGlobalClick)
    globalClickListenerActive = true
  }
}

const removeFromOutsideClickStack = (entry: OutsideClickEntry) => {
  const index = outsideClickStack.indexOf(entry)
  if (index >= 0) outsideClickStack.splice(index, 1)
  if (outsideClickStack.length === 0 && globalClickListenerActive) {
    document.removeEventListener('click', handleGlobalClick)
    globalClickListenerActive = false
  }
}

export const usePopover = ({
  disabled,
  open: controlledOpen,
  onOpenChange,
}: UsePopoverParams): UsePopoverReturn => {
  const [internalOpen, setInternalOpen] = useState(false)
  const wrapperRef = useRef<HTMLElement | null>(null)
  const popoverId = useId()

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  /** トリガークリックで開閉をトグル */
  const handleToggle = useCallback(() => {
    if (disabled) return
    setOpen(!isOpen)
  }, [disabled, isOpen, setOpen])

  /** ポップオーバーを閉じる */
  const handleClose = useCallback(() => {
    if (disabled) return
    setOpen(false)
  }, [disabled, setOpen])

  // 外部クリック検知（スタックで最後に開いたものだけ閉じる）
  useEffect(() => {
    if (!isOpen) return

    const entry: OutsideClickEntry = {
      ref: wrapperRef,
      close: () => setOpen(false),
    }
    addToOutsideClickStack(entry)
    return () => removeFromOutsideClickStack(entry)
  }, [isOpen, setOpen])

  // Escape キー検知（スタックで最後に開いたものだけ閉じる）
  useEffect(() => {
    if (!isOpen) return

    const close = () => setOpen(false)
    addToEscapeStack(close)
    return () => removeFromEscapeStack(close)
  }, [isOpen, setOpen])

  return {
    isOpen,
    popoverId,
    handleToggle,
    handleClose,
    wrapperRef,
  }
}
