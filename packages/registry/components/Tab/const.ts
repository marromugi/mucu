import { tv } from 'tailwind-variants'

export const tabVariants = tv({
  slots: {
    root: ['relative', 'inline-flex', 'items-center', 'bg-container'],
    trigger: [
      'relative',
      'z-10',
      'inline-flex',
      'items-center',
      'justify-center',
      'cursor-pointer',
      'select-none',
      'font-medium',
      'transition-colors',
      'duration-200',
      'text-text-description',
      'hover:text-text-body',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-focus',
      'focus-visible:ring-offset-1',
    ],
    triggerActive: ['text-text-body'],
    pill: ['absolute', 'bg-surface', 'shadow-sm'],
  },
  variants: {
    size: {
      sm: {
        root: ['rounded-full', 'p-0.5', 'gap-0.5'],
        trigger: ['px-3', 'py-1', 'text-xs', 'rounded-full'],
        pill: ['rounded-full'],
      },
      md: {
        root: ['rounded-full', 'p-1', 'gap-1'],
        trigger: ['px-4', 'py-1.5', 'text-sm', 'rounded-full'],
        pill: ['rounded-full'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
