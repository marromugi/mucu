import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { textFieldVariants } from './const'
import type { TextFieldOwnProps } from './type'

export const TextField = forwardRef<HTMLInputElement, TextFieldOwnProps>(
  (
    {
      error = false,
      disabled = false,
      size = 'md',
      className,
      id,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    const hasError = Boolean(error)

    return (
      <input
        ref={ref}
        id={inputId}
        type="text"
        disabled={disabled}
        className={cn(textFieldVariants({ size, error: hasError, disabled }), className)}
        aria-invalid={ariaInvalid ?? hasError}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
    )
  }
)

TextField.displayName = 'TextField'
