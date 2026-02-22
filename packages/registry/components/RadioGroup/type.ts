import type { radioGroupVariants, radioGroupItemVariants } from './const'
import type { ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'

/** RadioGroup のサイズ */
export type RadioGroupSize = 'sm' | 'md'

/** RadioGroup の方向 */
export type RadioGroupOrientation = 'horizontal' | 'vertical'

export type RadioGroupOwnProps = VariantProps<typeof radioGroupVariants> & {
  /** ラジオグループの内容（RadioGroupItem を受け取る） */
  children: ReactNode
  /** 選択されている値（制御モード） */
  value?: string
  /** デフォルト値（非制御モード） */
  defaultValue?: string
  /** 値変更時のコールバック */
  onValueChange?: (value: string) => void
  /** グループ全体を無効にする @default false */
  disabled?: boolean
  /** サイズ @default 'md' */
  size?: RadioGroupSize
  /** 配置方向 @default 'vertical' */
  orientation?: RadioGroupOrientation
  /** フォーム送信時の name 属性 */
  name?: string
  /** 必須フィールドか @default false */
  required?: boolean
}

export type RadioGroupItemOwnProps = VariantProps<typeof radioGroupItemVariants> & {
  /** ラジオボタンの値（必須） */
  value: string
  /** ラベル（オプション） */
  children?: ReactNode
  /** 個別に無効にする @default false */
  disabled?: boolean
}

export type RadioGroupProps<E extends React.ElementType = 'div'> = PolymorphicProps<E, RadioGroupOwnProps>

export type RadioGroupItemProps<E extends React.ElementType = 'label'> = PolymorphicProps<E, RadioGroupItemOwnProps>

export interface RadioGroupContextValue {
  /** 現在選択されている値 */
  value: string | undefined
  /** 値を変更する */
  setValue: (value: string) => void
  /** グループ全体の無効状態 */
  disabled: boolean
  /** サイズ */
  size: RadioGroupSize
  /** フォームの name 属性 */
  name: string
  /** 必須フィールドか */
  required: boolean
}
