import { forwardRef, useEffect, useId, useRef } from 'react'
import { checkboxVariants } from './const'
import type { CheckboxOwnProps } from './type'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxOwnProps>(
  (
    {
      checked,
      indeterminate = false,
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
    const innerRef = useRef<HTMLInputElement>(null)
    const styles = checkboxVariants({ size, disabled })

    useEffect(() => {
      const el = innerRef.current
      if (el) {
        el.indeterminate = indeterminate
      }
    }, [indeterminate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className={styles.wrapper({ className })}>
        <input
          ref={(node) => {
            innerRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className={styles.input()}
          aria-checked={indeterminate ? 'mixed' : undefined}
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
