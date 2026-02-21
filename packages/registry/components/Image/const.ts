import { tv } from 'tailwind-variants'

export const imageVariants = tv({
  slots: {
    root: 'relative inline-flex overflow-hidden',
    img: ['h-full w-full', 'transition-all duration-500 ease-in-out'],
  },
  variants: {
    radius: {
      none: { root: 'rounded-none' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      full: { root: 'rounded-full' },
    },
    objectFit: {
      cover: { img: 'object-cover' },
      contain: { img: 'object-contain' },
      fill: { img: 'object-fill' },
      none: { img: 'object-none' },
    },
    isVisible: {
      true: { img: 'opacity-100' },
      false: { img: 'opacity-0' },
    },
  },
  defaultVariants: {
    radius: 'none',
    objectFit: 'cover',
    isVisible: false,
  },
})
