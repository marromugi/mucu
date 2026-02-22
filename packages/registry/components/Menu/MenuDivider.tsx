import { polymorphicComponent } from '@/lib/polymorphic'
import { menuDivider } from './const'
import type { MenuDividerOwnProps } from './type'

const MenuDivider = polymorphicComponent<'hr', MenuDividerOwnProps>(
  ({ as, className, ref, ...props }) => {
    const Component = as || 'hr'

    return (
      <Component
        ref={ref}
        role="separator"
        className={menuDivider({ className })}
        {...props}
      />
    )
  },
)
MenuDivider.displayName = 'MenuDivider'

export { MenuDivider }
