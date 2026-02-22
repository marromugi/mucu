import { polymorphicComponent } from '@/lib/polymorphic'
import { typographyVariants } from './const'
import type { TypographyOwnProps } from './type'

const Typography = polymorphicComponent<'span', TypographyOwnProps>(
  ({ as, className, ref, variant, size, weight, children, ...props }) => {
    const Component = as || 'span'

    return (
      <Component
        ref={ref}
        data-variant={variant}
        className={typographyVariants({ variant, size, weight, className })}
        {...props}
      >
        {children}
      </Component>
    )
  },
)
Typography.displayName = 'Typography'

export { Typography }
