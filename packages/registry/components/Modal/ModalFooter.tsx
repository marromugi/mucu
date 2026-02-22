import { polymorphicComponent } from '@/lib/polymorphic'
import { modalFooterVariants } from './const'
import type { ModalFooterOwnProps } from './type'

const ModalFooter = polymorphicComponent<'div', ModalFooterOwnProps>(
  ({ as, ref, children, className, ...props }) => {
    const Component = as || 'div'

    return (
      <Component ref={ref} className={modalFooterVariants({ className })} {...props}>
        {children}
      </Component>
    )
  },
)
ModalFooter.displayName = 'ModalFooter'

export { ModalFooter }
