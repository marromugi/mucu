import type { textAreaVariants } from './const'
import type { TextareaHTMLAttributes } from 'react'
import type { VariantProps } from 'tailwind-variants'

export type TextAreaOwnProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  Omit<VariantProps<typeof textAreaVariants>, 'error'> & {
    /** エラー状態（trueまたはエラーメッセージ文字列） */
    error?: boolean | string
    /** 無効状態 @default false */
    disabled?: boolean
    /** サイズ @default 'md' */
    size?: 'sm' | 'md' | 'lg'
    /** 行数 @default 4 */
    rows?: number
    /** リサイズ方向 @default 'vertical' */
    resize?: 'none' | 'vertical' | 'both'
  }

export type TextAreaProps = TextAreaOwnProps
