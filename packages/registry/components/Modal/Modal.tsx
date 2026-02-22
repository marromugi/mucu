import { AnimatePresence, motion } from 'motion/react'
import { forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Close } from '../../icon'
import { modalVariants } from './const'
import { ModalContext } from './context'
import { useModal } from './hooks/useModal'
import { getContentMotionProps, getOverlayMotionProps } from './utils'
import type { ModalProps } from './type'

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      size = 'md',
      open,
      onOpenChange,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      className,
      title,
    },
    ref,
  ) => {
    const { modalId, titleId, handleClose, handleOverlayClick, contentRef } = useModal({
      open,
      onOpenChange,
      closeOnOverlayClick,
      closeOnEscape,
    })

    const styles = modalVariants({ size })

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref, contentRef],
    )

    if (typeof document === 'undefined') return null

    return createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay()}
            onClick={handleOverlayClick}
            {...getOverlayMotionProps()}
          >
            <motion.div
              ref={mergedRef}
              id={modalId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              className={cn(styles.content(), className)}
              {...getContentMotionProps()}
            >
              <ModalContext.Provider value={{ handleClose, modalId, titleId }}>
                {showCloseButton && (
                  <button
                    type="button"
                    className={styles.closeButton()}
                    onClick={handleClose}
                    aria-label="閉じる"
                  >
                    <Close className="w-5 h-5" />
                  </button>
                )}
                {children}
              </ModalContext.Provider>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    )
  },
)

Modal.displayName = 'Modal'
