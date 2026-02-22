import type { textFieldVariants } from './const'
import type { InputHTMLAttributes } from 'react'
import type { VariantProps } from 'tailwind-variants'

export type TextFieldOwnProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  Omit<VariantProps<typeof textFieldVariants>, 'error'> & {
    /** エラー状態（trueまたはエラーメッセージ文字列） */
    error?: boolean | string
    /** 無効状態 @default false */
    disabled?: boolean
    /** サイズ @default 'md' */
    size?: 'sm' | 'md' | 'lg'
  }

export type TextFieldProps = TextFieldOwnProps
