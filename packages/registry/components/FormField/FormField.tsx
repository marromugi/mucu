import { forwardRef } from 'react'
import { Required } from '../../icon'
import { formFieldVariants } from './const'
import type { FormFieldOwnProps } from './type'

export const FormField = forwardRef<HTMLDivElement, FormFieldOwnProps>(
  (
    {
      label,
      description,
      error,
      required = false,
      children,
      className,
      htmlFor,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const styles = formFieldVariants({ disabled })

    return (
      <div ref={ref} className={styles.container({ className })} {...props}>
        {/* ラベル部分 */}
        <div className={styles.labelWrapper()}>
          <label htmlFor={htmlFor} className={styles.label()}>
            {label}
          </label>
          {required && <Required className={styles.requiredMark()} />}
        </div>

        {/* 説明文（オプション） */}
        {description && <p className={styles.description()}>{description}</p>}

        {/* 子要素（入力フィールド） */}
        <div className={styles.content()}>{children}</div>

        {/* エラーメッセージ（オプション） */}
        {error && (
          <p className={styles.error()} role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
