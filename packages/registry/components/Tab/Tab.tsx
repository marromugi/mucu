import { motion } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { polymorphicComponent } from '@/lib/polymorphic'
import { tabVariants } from './const'
import type { TabOwnProps } from './type'

const Tab = polymorphicComponent<'div', TabOwnProps>(
  ({ as, items, value, onChange, minWidth, size = 'md', className, ref, ...props }) => {
    const Component = as || 'div'
    const styles = tabVariants({ size })
    const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
    const [pillLayout, setPillLayout] = useState<{
      left: number
      width: number
      height: number
    } | null>(null)

    useLayoutEffect(() => {
      const trigger = triggerRefs.current.get(value)
      if (!trigger) return

      setPillLayout({
        left: trigger.offsetLeft,
        width: trigger.offsetWidth,
        height: trigger.offsetHeight,
      })
    }, [value, items, size])

    return (
      <Component ref={ref} role="tablist" className={styles.root({ className })} {...props}>
        {pillLayout && (
          <motion.span
            className={styles.pill()}
            initial={false}
            animate={{
              left: pillLayout.left,
              width: pillLayout.width,
              height: pillLayout.height,
            }}
            transition={{
              type: 'spring',
              bounce: 0.15,
              duration: 0.4,
            }}
          />
        )}
        {items.map((item) => {
          const isActive = item.value === value

          return (
            <button
              key={item.value}
              ref={(el) => {
                if (el) triggerRefs.current.set(item.value, el)
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={cn(styles.trigger(), isActive && styles.triggerActive())}
              style={minWidth ? { minWidth } : undefined}
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </button>
          )
        })}
      </Component>
    )
  },
)
Tab.displayName = 'Tab'

export { Tab }
