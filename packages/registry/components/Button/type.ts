import type { ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'
import type { buttonVariants } from './const'
import type { ButtonBaseOwnProps } from '../ButtonBase/type'

type ButtonOwnProps = VariantProps<typeof buttonVariants> &
  Pick<ButtonBaseOwnProps, 'icon' | 'iconPosition' | 'size' | 'fullWidth' | 'isLoading'> & {
    children?: ReactNode
  }

type ButtonProps<E extends React.ElementType = 'button'> = PolymorphicProps<E, ButtonOwnProps>

export type { ButtonOwnProps, ButtonProps }
