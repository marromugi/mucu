import { AnimatePresence, motion } from 'motion/react'
import { polymorphicComponent } from '@/lib/polymorphic'
import { tooltipVariants } from './const'
import { useTooltip } from './hooks/useTooltip/useTooltip'
import { getMotionProps } from './utils'
import type { TooltipOwnProps } from './type'

const Tooltip = polymorphicComponent<'div', TooltipOwnProps>(
  ({
    as,
    content,
    placement = 'top',
    align = 'center',
    delay = 0,
    arrow: showArrow = false,
    offset,
    disabled = false,
    className,
    children,
    ref,
    ...props
  }) => {
    const Component = as || 'div'
    const { isOpen, tooltipId, handleOpen, handleClose } = useTooltip({ delay, disabled })
    const styles = tooltipVariants({ placement, align })
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
        ref={ref}
        className={styles.wrapper()}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        {...props}
      >
        <span aria-describedby={isOpen ? tooltipId : undefined}>{children}</span>

        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              id={tooltipId}
              role="tooltip"
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
Tooltip.displayName = 'Tooltip'

export { Tooltip }
