import type { ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { buttonVariants } from './const'
import type { ButtonBaseOwnProps } from '../ButtonBase/type'

type ButtonOwnProps = VariantProps<typeof buttonVariants> &
  Pick<ButtonBaseOwnProps, 'icon' | 'iconPosition' | 'size' | 'fullWidth'> & {
    children?: ReactNode
  }

export type { ButtonOwnProps }
