import type * as React from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'
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

type ButtonBaseProps<E extends React.ElementType = 'span'> = PolymorphicProps<E, ButtonBaseOwnProps>

export type { ButtonBaseOwnProps, ButtonBaseProps, IconComponent }
