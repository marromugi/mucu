import type * as React from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'
import type { typographyVariants } from './const'

type TypographyOwnProps = VariantProps<typeof typographyVariants> & {
  children?: React.ReactNode
}

type TypographyProps<E extends React.ElementType = 'span'> = PolymorphicProps<E, TypographyOwnProps>

export type { TypographyOwnProps, TypographyProps }
