import { tv } from 'tailwind-variants'

export const spinnerVariants = tv({
  slots: {
    root: 'animate-spinner-rotate',
    circle: 'animate-spinner-dash',
  },
  variants: {
    size: {
      xxs: { root: 'h-3 w-3' },
      xs: { root: 'h-3.5 w-3.5' },
      sm: { root: 'h-4 w-4' },
      md: { root: 'h-5 w-5' },
      lg: { root: 'h-6 w-6' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
