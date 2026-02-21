import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: [
    'group',
    'rounded-full',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary:
        'focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300',
      secondary:
        'focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600',
      alert: 'focus-visible:ring-red-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
