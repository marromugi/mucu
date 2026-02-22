import type { popoverVariants } from './const'
import type { ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'

/** ポップオーバーの表示位置 */
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

/** ポップオーバーの揃え位置 */
export type PopoverAlign = 'start' | 'center' | 'end'

export type PopoverOwnProps = VariantProps<typeof popoverVariants> & {
  /** ポップオーバーの内容（リッチコンテンツ対応） */
  content: ReactNode
  /** 表示位置 @default 'bottom' */
  placement?: PopoverPlacement
  /** 揃え位置 @default 'center' */
  align?: PopoverAlign
  /** 矢印を表示するか @default false */
  arrow?: boolean
  /** トリガー要素からの距離（px） */
  offset?: number
  /** ポップオーバーを無効にするか @default false */
  disabled?: boolean
  /** 制御モード：開閉状態 */
  open?: boolean
  /** 制御モード：開閉状態変更コールバック */
  onOpenChange?: (open: boolean) => void
  /** トリガー要素 */
  children: ReactNode
}

export type PopoverProps<E extends React.ElementType = 'div'> = PolymorphicProps<E, PopoverOwnProps>
