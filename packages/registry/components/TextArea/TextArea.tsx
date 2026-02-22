import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { textAreaVariants } from './const'
import type { TextAreaOwnProps } from './type'

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaOwnProps>(
  (
    {
      error = false,
      disabled = false,
      size = 'md',
      rows = 4,
      resize = 'vertical',
      className,
      id,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId

    const hasError = Boolean(error)

    return (
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={cn(textAreaVariants({ size, error: hasError, disabled, resize }), className)}
        aria-invalid={ariaInvalid ?? hasError}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
    )
  }
)

TextArea.displayName = 'TextArea'
