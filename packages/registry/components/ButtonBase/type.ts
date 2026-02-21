import type * as React from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { buttonBaseVariants } from './const'

type IconComponent = React.ComponentType<React.SVGAttributes<SVGElement>>

type ButtonBaseOwnProps = VariantProps<typeof buttonBaseVariants> & {
  children?: React.ReactNode
  /**
   * 表示するアイコンコンポーネント
   */
  icon?: IconComponent
  /**
   * アイコンの位置
   * @default 'left'
   */
  iconPosition?: 'left' | 'right'
}

export type { ButtonBaseOwnProps, IconComponent }
