import { polymorphicComponent } from '@/lib/polymorphic'
import { radioGroupVariants } from './const'
import { RadioGroupContext } from './context'
import { useRadioGroup } from './hooks/useRadioGroup/useRadioGroup'
import type { RadioGroupOwnProps } from './type'

const RadioGroup = polymorphicComponent<'div', RadioGroupOwnProps>(
  ({
    as,
    children,
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    size = 'md',
    orientation = 'vertical',
    name,
    required = false,
    className,
    ref,
    ...props
  }) => {
    const Component = as || 'div'
    const { currentValue, setValue, groupId } = useRadioGroup({
      value,
      defaultValue,
      onValueChange,
      disabled,
    })

    return (
      <RadioGroupContext.Provider
        value={{
          value: currentValue,
          setValue,
          disabled,
          size,
          name: name ?? groupId,
          required,
        }}
      >
        <Component
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          aria-disabled={disabled || undefined}
          aria-required={required || undefined}
          className={radioGroupVariants({ orientation, disabled, className })}
          {...props}
        >
          {children}
        </Component>
      </RadioGroupContext.Provider>
    )
  },
)
RadioGroup.displayName = 'RadioGroup'

export { RadioGroup }
