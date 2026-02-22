import { polymorphicComponent } from '@/lib/polymorphic'
import { modalBodyVariants } from './const'
import type { ModalBodyOwnProps } from './type'

const ModalBody = polymorphicComponent<'div', ModalBodyOwnProps>(
  ({ as, ref, children, className, ...props }) => {
    const Component = as || 'div'

    return (
      <Component ref={ref} className={modalBodyVariants({ className })} {...props}>
        {children}
      </Component>
    )
  },
)
ModalBody.displayName = 'ModalBody'

export { ModalBody }
