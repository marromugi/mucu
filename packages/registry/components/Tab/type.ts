import type { tabVariants } from './const'
import type { ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'

/** 個々のタブアイテム */
export interface TabItem {
  /** タブの一意な値 */
  value: string
  /** タブに表示するラベル */
  label: ReactNode
}

export type TabOwnProps = VariantProps<typeof tabVariants> & {
  /** タブアイテムの配列 */
  items: TabItem[]
  /** 現在選択されているタブの value */
  value: string
  /** タブ変更時のコールバック */
  onChange: (value: string) => void
  /** 各タブの最小幅（px） */
  minWidth?: number
}

export type TabProps<E extends React.ElementType = 'div'> = PolymorphicProps<E, TabOwnProps>
