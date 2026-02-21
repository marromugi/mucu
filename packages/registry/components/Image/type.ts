import type { imageVariants } from './const'
import type { ImgHTMLAttributes, ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'

export type ImageOwnProps = Omit<
  VariantProps<typeof imageVariants>,
  'isVisible'
> & {
  /** 画像の代替テキスト（必須） */
  alt: string
  /** 読み込み中の状態を外部から制御する場合に使用 */
  isLoading?: boolean
  /** 読み込みエラー時に表示するフォールバック要素 */
  fallback?: ReactNode
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'>
