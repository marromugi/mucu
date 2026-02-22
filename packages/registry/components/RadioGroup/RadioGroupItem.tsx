import { useContext, useId } from 'react'
import { polymorphicComponent } from '@/lib/polymorphic'
import { radioGroupItemVariants } from './const'
import { RadioGroupContext } from './context'
import type { RadioGroupItemOwnProps } from './type'

const RadioGroupItem = polymorphicComponent<'label', RadioGroupItemOwnProps>(
  ({ as, value, children, disabled = false, className, ref, ...props }) => {
    const Component = as || 'label'
    const context = useContext(RadioGroupContext)
    const itemId = useId()

    if (!context) {
      throw new Error('RadioGroupItem must be used within a RadioGroup')
    }

    const isDisabled = disabled || context.disabled
    const isChecked = context.value === value

    const styles = radioGroupItemVariants({
      size: context.size,
      checked: isChecked,
      disabled: isDisabled,
    })

    const handleChange = () => {
      if (isDisabled) return
      context.setValue(value)
    }

    return (
      <Component ref={ref} className={styles.wrapper({ className })} {...props}>
        <input
          type="radio"
          id={itemId}
          name={context.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          required={context.required}
          onChange={handleChange}
          className={styles.input()}
          aria-checked={isChecked}
        />
        <span className={styles.indicator()} aria-hidden="true">
          <span className={styles.dot()} />
        </span>
        {children && <span className={styles.label()}>{children}</span>}
      </Component>
    )
  },
)
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroupItem }
