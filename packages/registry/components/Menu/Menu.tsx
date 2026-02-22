import { AnimatePresence, motion } from 'motion/react'
import { polymorphicComponent } from '@/lib/polymorphic'
import { menu } from './const'
import { useMenu } from './hooks/useMenu/useMenu'
import { MenuContext } from './context'
import { getMotionProps } from './utils'
import type { MenuOwnProps } from './type'

const Menu = polymorphicComponent<'div', MenuOwnProps>(
  ({
    as,
    children,
    placement = 'bottom',
    align = 'start',
    offset = 4,
    disabled = false,
    open,
    onOpenChange,
    minWidth = 200,
    trigger,
    className,
    ref,
    ...props
  }) => {
    const Component = as || 'div'
    const { isOpen, menuId, handleToggle, handleClose, handleSelect, wrapperRef } = useMenu({
      disabled,
      open,
      onOpenChange,
    })

    const styles = menu({ placement, align })
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
      <MenuContext.Provider value={{ handleClose, handleSelect }}>
        <Component
          ref={(node: HTMLElement | null) => {
            ;(wrapperRef as React.RefObject<HTMLElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.RefObject<HTMLElement | null>).current = node
          }}
          className={styles.wrapper()}
          {...props}
        >
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-expanded={isOpen}
            aria-haspopup="menu"
            aria-controls={isOpen ? menuId : undefined}
            onClick={disabled ? undefined : handleToggle}
            onKeyDown={
              disabled
                ? undefined
                : (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleToggle()
                    }
                  }
            }
            aria-disabled={disabled || undefined}
            style={{
              cursor: disabled ? 'default' : 'pointer',
              display: 'inline-flex',
            }}
          >
            {trigger}
          </div>

          <AnimatePresence>
            {isOpen && !disabled && (
              <motion.div
                id={menuId}
                role="menu"
                aria-orientation="vertical"
                className={styles.content({ className })}
                style={{ ...offsetStyle, minWidth }}
                {...motionProps}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </Component>
      </MenuContext.Provider>
    )
  },
)
Menu.displayName = 'Menu'

export { Menu }
