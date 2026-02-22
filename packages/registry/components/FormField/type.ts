import type { HTMLAttributes, ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { formFieldVariants } from './const'

export interface FormFieldOwnProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof formFieldVariants> {
  /** フィールドのラベル（タイトル） */
  label: string
  /** 説明文（省略可能） */
  description?: string
  /** エラーメッセージ（省略可能） */
  error?: string
  /** 必須フィールドかどうか */
  required?: boolean
  /** 入力フィールドなどの子要素 */
  children: ReactNode
  /** カスタムクラス（ルート要素に適用） */
  className?: string
  /** ラベルに紐づける入力フィールドのID（アクセシビリティ用） */
  htmlFor?: string
  /** 無効状態 */
  disabled?: boolean
}

export type FormFieldProps = FormFieldOwnProps
