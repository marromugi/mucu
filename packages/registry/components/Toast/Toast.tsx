import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { Close } from './icons'
import { toastVariants } from './const'
import { useToastProgress } from './hooks'
import { getIcon, getToastMotionProps } from './utils'
import type { ToastProps } from './type'

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ data, onClose, position, className }, ref) => {
    const {
      id,
      type = 'default',
      title,
      message,
      closable = true,
      showIcon = true,
      icon,
      duration = 5000,
    } = data
    const styles = toastVariants({ type })
    const motionProps = getToastMotionProps(position)
    const { progress } = useToastProgress({ duration })

    const displayIcon =
      icon ?? (showIcon && type !== 'default' ? getIcon(type) : null)

    return (
      <motion.div
        ref={ref}
        key={id}
        layout
        className={styles.item({ className })}
        role="alert"
        aria-live={type === 'error' ? 'assertive' : 'polite'}
        aria-atomic="true"
        {...motionProps}
      >
        {displayIcon && (
          <span className={styles.iconWrapper()}>{displayIcon}</span>
        )}

        <div className={styles.content()}>
          <p className={styles.title()}>{title}</p>
          {message && <p className={styles.message()}>{message}</p>}
        </div>

        {closable && (
          <button
            type="button"
            className={styles.closeButton()}
            onClick={onClose}
            aria-label="閉じる"
          >
            <Close className="w-4 h-4" />
          </button>
        )}

        {duration > 0 && (
          <motion.div
            className={styles.progressBar()}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        )}
      </motion.div>
    )
  }
)

Toast.displayName = 'Toast'
