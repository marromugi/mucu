import { useContext } from 'react'
import { cn } from '@/lib/cn'
import { polymorphicComponent } from '@/lib/polymorphic'
import { menuItem, menuItemIconSize, menuShortcut } from './const'
import { MenuContext } from './context'
import type { MenuItemOwnProps } from './type'

const MenuItem = polymorphicComponent<'button', MenuItemOwnProps>(
  ({
    as,
    children,
    icon: Icon,
    endIcon: EndIcon,
    onClick,
    disabled = false,
    destructive = false,
    shortcut,
    className,
    ref,
    ...props
  }) => {
    const Component = as || 'button'
    const context = useContext(MenuContext)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      if (onClick) {
        context?.handleSelect(() => onClick(event))()
      } else {
        context?.handleClose()
      }
    }

    return (
      <Component
        ref={ref}
        type="button"
        role="menuitem"
        tabIndex={-1}
        disabled={disabled}
        className={cn(menuItem({ destructive, disabled }), className)}
        onClick={handleClick}
        {...props}
      >
        {Icon && (
          <Icon className={cn(menuItemIconSize, 'shrink-0')} aria-hidden="true" />
        )}
        <span className="flex-1 truncate">{children}</span>
        {shortcut && <span className={menuShortcut()}>{shortcut}</span>}
        {EndIcon && (
          <EndIcon className={cn(menuItemIconSize, 'shrink-0')} aria-hidden="true" />
        )}
      </Component>
    )
  },
)
MenuItem.displayName = 'MenuItem'

export { MenuItem }
