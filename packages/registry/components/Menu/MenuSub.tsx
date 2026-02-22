import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { polymorphicComponent } from '@/lib/polymorphic'
import { menuSub, menuItemIconSize } from './const'
import { getSubMenuMotionProps } from './utils'
import type { MenuSubOwnProps } from './type'

const ChevronRight = (props: React.SVGAttributes<SVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const MenuSub = polymorphicComponent<'div', MenuSubOwnProps>(
  ({
    as,
    label,
    icon: Icon,
    children,
    disabled = false,
    className,
    ref,
    ...props
  }) => {
    const Component = as || 'div'
    const [isOpen, setIsOpen] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const styles = menuSub({ disabled })
    const motionProps = getSubMenuMotionProps()

    const handleMouseEnter = useCallback(() => {
      if (disabled) return
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setIsOpen(true)
    }, [disabled])

    const handleMouseLeave = useCallback(() => {
      if (disabled) return
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false)
      }, 150)
    }, [disabled])

    const handleClick = useCallback(() => {
      if (disabled) return
      setIsOpen(true)
    }, [disabled])

    return (
      <Component
        ref={ref}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <button
          type="button"
          role="menuitem"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          tabIndex={-1}
          disabled={disabled}
          className={cn(styles.trigger(), className)}
          onClick={handleClick}
        >
          {Icon && (
            <Icon className={cn(menuItemIconSize, 'shrink-0')} aria-hidden="true" />
          )}
          <span className="flex-1 truncate">{label}</span>
          <ChevronRight className={cn(menuItemIconSize, 'shrink-0')} aria-hidden="true" />
        </button>

        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              role="menu"
              aria-orientation="vertical"
              className={styles.content()}
              style={{ minWidth: 180 }}
              {...motionProps}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </Component>
    )
  },
)
MenuSub.displayName = 'MenuSub'

export { MenuSub }
