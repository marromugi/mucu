import type { MenuPlacement } from './type'

/** placement に応じた motion アニメーションの初期/終了値を返す */
export const getMotionProps = (placement: MenuPlacement) => {
  const distance = 4
  const axis = {
    top: { y: distance },
    bottom: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return {
    initial: { opacity: 0, ...axis[placement] },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...axis[placement] },
    transition: { duration: 0.15, ease: 'easeOut' as const },
  }
}

/** サブメニュー用の横方向 motion アニメーション */
export const getSubMenuMotionProps = () => ({
  initial: { opacity: 0, x: -4 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -4 },
  transition: { duration: 0.15, ease: 'easeOut' as const },
})
