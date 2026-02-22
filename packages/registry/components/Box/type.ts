import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'
import type { boxVariants } from './const'

type BoxOwnProps = VariantProps<typeof boxVariants>

type BoxProps<E extends React.ElementType = 'div'> = PolymorphicProps<E, BoxOwnProps>

export type { BoxOwnProps, BoxProps }
