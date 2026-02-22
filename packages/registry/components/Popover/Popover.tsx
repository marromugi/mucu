import { AnimatePresence, motion } from 'motion/react'
import { polymorphicComponent } from '@/lib/polymorphic'
import { popoverVariants } from './const'
import { usePopover } from './hooks/usePopover/usePopover'
import { getMotionProps } from './utils'
import type { PopoverOwnProps } from './type'

const Popover = polymorphicComponent<'div', PopoverOwnProps>(
  ({
    as,
    content,
    placement = 'bottom',
    align = 'center',
    arrow: showArrow = false,
    offset,
    disabled = false,
    open,
    onOpenChange,
    className,
    children,
    ref,
    ...props
  }) => {
    const Component = as || 'div'
    const { isOpen, popoverId, handleToggle, wrapperRef } = usePopover({
      disabled,
      open,
      onOpenChange,
    })
    const styles = popoverVariants({ placement, align })
    const motionProps = getMotionProps(placement)

    const offsetStyle =
      offset != null
        ? {
            top: { marginBottom: offset },
            bottom: { marginTop: offset },
            left: { marginRight: offset },
            right: { marginLeft: offset },
          }[placement]
        : undefined

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          ;(wrapperRef as React.MutableRefObject<HTMLElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node
        }}
        className={styles.wrapper()}
        {...props}
      >
        <span
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-controls={isOpen ? popoverId : undefined}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleToggle()
            }
          }}
          style={{ display: 'inline-flex', cursor: disabled ? 'default' : 'pointer' }}
        >
          {children}
        </span>

        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              id={popoverId}
              role="dialog"
              aria-modal="false"
              className={styles.content({ className })}
              style={offsetStyle}
              {...motionProps}
            >
              {content}
              {showArrow && <span className={styles.arrow()} />}
            </motion.div>
          )}
        </AnimatePresence>
      </Component>
    )
  },
)
Popover.displayName = 'Popover'

export { Popover }
