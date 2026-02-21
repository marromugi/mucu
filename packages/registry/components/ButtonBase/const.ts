import { tv } from 'tailwind-variants'

export const buttonBaseVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    'font-semibold',
    'rounded-full',
    'transition-colors duration-200',
  ],
  variants: {
    variant: {
      primary: [
        'bg-neutral-900 text-neutral-50',
        'group-hover:bg-neutral-800',
        'dark:bg-neutral-50 dark:text-neutral-900',
        'dark:group-hover:bg-neutral-200',
      ],
      secondary: [
        'bg-neutral-50 text-neutral-900',
        'border border-neutral-200',
        'group-hover:bg-neutral-100',
        'dark:bg-neutral-900 dark:text-neutral-50',
        'dark:border-neutral-700',
        'dark:group-hover:bg-neutral-800',
      ],
      alert: [
        'bg-red-600 text-white',
        'group-hover:bg-red-700',
        'dark:bg-red-800 dark:group-hover:bg-red-700',
      ],
      'primary-ghost': [
        'bg-transparent text-neutral-900',
        'group-hover:bg-neutral-100',
        'dark:text-neutral-50',
        'dark:group-hover:bg-neutral-800',
      ],
      'alert-ghost': [
        'bg-transparent text-red-600',
        'group-hover:bg-red-50',
        'dark:text-red-500',
        'dark:group-hover:bg-red-950',
      ],
    },
    size: {
      xxs: 'h-5 px-2 text-xs gap-1',
      xs: 'h-6 px-3 text-xs gap-1',
      sm: 'h-8 px-4 text-sm gap-1.5',
      md: 'h-10 px-6 text-base gap-2',
      lg: 'h-12 px-8 text-lg gap-2.5',
      icon: 'h-10 w-10 p-0',
    },
    fullWidth: {
      true: 'w-full',
    },
    isLoading: {
      true: 'cursor-wait',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  compoundVariants: [
    {
      isLoading: true,
      className: 'pointer-events-none',
    },
    {
      disabled: true,
      className: 'pointer-events-none',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    isLoading: false,
    disabled: false,
  },
})

export const buttonBaseIconVariants = tv({
  base: 'shrink-0',
  variants: {
    size: {
      xxs: 'w-3 h-3',
      xs: 'w-3.5 h-3.5',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      icon: 'w-5 h-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
