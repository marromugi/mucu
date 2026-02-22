import type { modalVariants } from './const'
import type { ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'

/** モーダルのサイズ */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps extends VariantProps<typeof modalVariants> {
  /** モーダルの内容 */
  children: ReactNode
  /** モーダルのサイズ @default 'md' */
  size?: ModalSize
  /** 制御モード：開閉状態 */
  open: boolean
  /** 制御モード：開閉状態変更コールバック */
  onOpenChange: (open: boolean) => void
  /** オーバーレイクリックで閉じるか @default true */
  closeOnOverlayClick?: boolean
  /** Escapeキーで閉じるか @default true */
  closeOnEscape?: boolean
  /** 閉じるボタンを表示するか @default true */
  showCloseButton?: boolean
  /** カスタムクラス（モーダルコンテンツに適用） */
  className?: string
  /** モーダルのタイトル（aria-labelledby 用） */
  title?: string
}

export interface ModalHeaderOwnProps {
  /** ヘッダーの内容（タイトルなど） */
  children: ReactNode
  /** カスタムクラス */
  className?: string
}

export type ModalHeaderProps<E extends React.ElementType = 'div'> = PolymorphicProps<
  E,
  ModalHeaderOwnProps
>

export interface ModalBodyOwnProps {
  /** ボディの内容 */
  children: ReactNode
  /** カスタムクラス */
  className?: string
}

export type ModalBodyProps<E extends React.ElementType = 'div'> = PolymorphicProps<
  E,
  ModalBodyOwnProps
>

export interface ModalFooterOwnProps {
  /** フッターの内容（ボタンなど） */
  children: ReactNode
  /** カスタムクラス */
  className?: string
}

export type ModalFooterProps<E extends React.ElementType = 'div'> = PolymorphicProps<
  E,
  ModalFooterOwnProps
>

export interface ModalContextValue {
  /** モーダルを閉じる */
  handleClose: () => void
  /** モーダルID（ARIA用） */
  modalId: string
  /** タイトルID（aria-labelledby用） */
  titleId: string
}
