import { forwardRef, useId } from 'react'
import { checkboxVariants } from './const'
import type { CheckboxOwnProps } from './type'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxOwnProps>(
  (
    {
      checked,
      onCheckedChange,
      disabled = false,
      size = 'md',
      label,
      className,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const styles = checkboxVariants({ size, disabled })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className={styles.wrapper({ className })}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className={styles.input()}
          {...props}
        />
        {label && (
          <label htmlFor={inputId} className={styles.label()}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
