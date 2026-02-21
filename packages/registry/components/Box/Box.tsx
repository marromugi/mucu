import { polymorphicComponent } from '@/lib/polymorphic'
import type { BoxOwnProps } from './type'
import { boxVariants } from './const'

const Box = polymorphicComponent<'div', BoxOwnProps>(
  ({ as, bg, className, ref, ...props }) => {
    const Component = as || 'div'
    return (
      <Component ref={ref} className={boxVariants({ bg, className })} {...props} />
    )
  }
)
Box.displayName = 'Box'

export { Box }
