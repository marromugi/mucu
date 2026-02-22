import type { ReactNode } from 'react'
import { CheckCircleFill, ErrorFill, InfoFill, WarningFill } from './icons'
import type { ToastPosition, ToastType } from './type'

const iconClass = 'w-6 h-6 -ml-2'

/** タイプに応じたアイコンを取得 */
export const getIcon = (type: ToastType): ReactNode => {
  switch (type) {
    case 'success':
      return <CheckCircleFill className={iconClass} />
    case 'error':
      return <ErrorFill className={iconClass} />
    case 'warning':
      return <WarningFill className={iconClass} />
    case 'info':
      return <InfoFill className={iconClass} />
    default:
      return null
  }
}

/** 表示位置に応じたmotionアニメーションpropsを返す */
export const getToastMotionProps = (position: ToastPosition) => {
  const isTop = position.startsWith('top')
  const isRight = position.includes('right')
  const isLeft = position.includes('left')

  // 出現方向を決定
  let x = 0
  const y = isTop ? -20 : 20

  if (isRight) x = 20
  if (isLeft) x = -20

  return {
    initial: { opacity: 0, x, y, scale: 0.9 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, x, scale: 0.9 },
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
      mass: 0.8,
    },
  }
}

/** 一意のID生成 */
export const generateToastId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
