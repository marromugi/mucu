import { tv } from 'tailwind-variants'

export const boxVariants = tv({
  variants: {
    bg: {
      background: 'bg-background',
      container: 'bg-container',
      surface: 'bg-surface',
    },
  },
  defaultVariants: {
    bg: 'background',
  },
})
