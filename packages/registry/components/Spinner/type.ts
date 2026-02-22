import type { VariantProps } from 'tailwind-variants'
import type { spinnerVariants } from './const'

export type SpinnerOwnProps = VariantProps<typeof spinnerVariants> & {
  label?: string
}

export type SpinnerProps = SpinnerOwnProps & React.SVGProps<SVGSVGElement>
