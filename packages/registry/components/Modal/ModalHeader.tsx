import { useContext } from 'react'
import { polymorphicComponent } from '@/lib/polymorphic'
import { modalHeaderVariants } from './const'
import { ModalContext } from './context'
import type { ModalHeaderOwnProps } from './type'

const ModalHeader = polymorphicComponent<'div', ModalHeaderOwnProps>(
  ({ as, ref, children, className, ...props }) => {
    const Component = as || 'div'
    const context = useContext(ModalContext)

    return (
      <Component ref={ref} className={modalHeaderVariants({ className })} {...props}>
        <h2
          id={context?.titleId}
          className="text-lg font-semibold text-neutral-900 dark:text-neutral-50"
        >
          {children}
        </h2>
      </Component>
    )
  },
)
ModalHeader.displayName = 'ModalHeader'

export { ModalHeader }
