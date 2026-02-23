import type { checkboxVariants } from './const'
import type { InputHTMLAttributes } from 'react'
import type { VariantProps } from 'tailwind-variants'

export type CheckboxOwnProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> &
  VariantProps<typeof checkboxVariants> & {
    /** チェック状態 */
    checked?: boolean
    /** 不確定状態 @default false */
    indeterminate?: boolean
    /** チェック状態変更ハンドラ */
    onCheckedChange?: (checked: boolean | 'indeterminate') => void
    /** 無効状態 @default false */
    disabled?: boolean
    /** サイズ @default 'md' */
    size?: 'sm' | 'md' | 'lg'
    /** ラベルテキスト */
    label?: string
    /** カスタムクラス（ルート要素に適用） */
    className?: string
  }

export type CheckboxProps = CheckboxOwnProps
