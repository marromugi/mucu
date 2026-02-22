import type { tooltipVariants } from './const'
import type { ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'

/** ツールチップの表示位置 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

/** ツールチップの揃え位置 */
export type TooltipAlign = 'start' | 'center' | 'end'

export type TooltipOwnProps = VariantProps<typeof tooltipVariants> & {
  /** ツールチップの内容 */
  content: ReactNode
  /** 表示位置 @default 'top' */
  placement?: TooltipPlacement
  /** 揃え位置 @default 'center' */
  align?: TooltipAlign
  /** ホバーから表示までの遅延（ms） @default 0 */
  delay?: number
  /** 矢印を表示するか @default true */
  arrow?: boolean
  /** トリガー要素からの距離（px） @default 8 */
  offset?: number
  /** ツールチップを無効にするか @default false */
  disabled?: boolean
  /** トリガー要素 */
  children: ReactNode
}

export type TooltipProps<E extends React.ElementType = 'div'> = PolymorphicProps<E, TooltipOwnProps>
