import type * as React from 'react'
import type { menu, menuItem } from './const'
import type { ReactNode, MouseEvent } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'

/** アイコンコンポーネント型 */
export type IconComponent = React.ComponentType<React.SVGAttributes<SVGElement>>

/** メニューの表示位置 */
export type MenuPlacement = 'top' | 'bottom' | 'left' | 'right'

/** メニューの揃え位置 */
export type MenuAlign = 'start' | 'center' | 'end'

export type MenuOwnProps = VariantProps<typeof menu> & {
  /** メニューの内容（MenuItem, MenuSub, MenuDivider を受け取る） */
  children: ReactNode
  /** 表示位置 @default 'bottom' */
  placement?: MenuPlacement
  /** 揃え位置 @default 'start' */
  align?: MenuAlign
  /** トリガー要素からの距離（px） @default 4 */
  offset?: number
  /** メニューを無効にするか @default false */
  disabled?: boolean
  /** 制御モード：開閉状態 */
  open?: boolean
  /** 制御モード：開閉状態変更コールバック */
  onOpenChange?: (open: boolean) => void
  /** メニューの最小幅（px） @default 200 */
  minWidth?: number
  /** トリガー要素 */
  trigger: ReactNode
}

export type MenuItemOwnProps = VariantProps<typeof menuItem> & {
  /** メニューアイテムのラベル */
  children: ReactNode
  /** 左側に表示するアイコン */
  icon?: IconComponent
  /** 右側に表示するアイコン */
  endIcon?: IconComponent
  /** クリック時のコールバック */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  /** 無効状態 @default false */
  disabled?: boolean
  /** 破壊的なアクションを示す（赤色表示） @default false */
  destructive?: boolean
  /** キーボードショートカット表示（例: "⌘K"） */
  shortcut?: string
}

export type MenuSubOwnProps = {
  /** サブメニューのラベル */
  label: ReactNode
  /** 左側に表示するアイコン */
  icon?: IconComponent
  /** サブメニューの内容 */
  children: ReactNode
  /** 無効状態 @default false */
  disabled?: boolean
}

export type MenuDividerOwnProps = object

export type MenuProps<E extends React.ElementType = 'div'> = PolymorphicProps<E, MenuOwnProps>

export type MenuItemProps<E extends React.ElementType = 'button'> = PolymorphicProps<E, MenuItemOwnProps>

export type MenuSubProps<E extends React.ElementType = 'div'> = PolymorphicProps<E, MenuSubOwnProps>

export type MenuDividerProps<E extends React.ElementType = 'hr'> = PolymorphicProps<E, MenuDividerOwnProps>

export interface MenuContextValue {
  /** メニューを閉じる */
  handleClose: () => void
  /** アイテム選択時のハンドラ（コールバック実行後にメニューを閉じる） */
  handleSelect: (callback?: () => void) => () => void
}
