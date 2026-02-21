import { polymorphicComponent } from '@/lib/polymorphic'
import { ButtonBase } from '../ButtonBase/ButtonBase'
import { buttonVariants } from './const'
import type { ButtonOwnProps } from './type'

const Button = polymorphicComponent<'button', ButtonOwnProps>(
  ({
    as,
    children,
    variant,
    size,
    fullWidth,
    className,
    disabled,
    icon,
    iconPosition,
    ref,
    ...props
  }) => {
    const Component = as || 'button'
    return (
      <Component
        ref={ref}
        className={buttonVariants({ variant, className })}
        disabled={disabled}
        {...props}
      >
        <ButtonBase
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          icon={icon}
          iconPosition={iconPosition}
        >
          {children}
        </ButtonBase>
      </Component>
    )
  },
)
Button.displayName = 'Button'

export { Button }
