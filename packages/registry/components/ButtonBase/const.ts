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
        'bg-primary-900 text-on-primary',
        'group-hover:bg-primary-800',
        'group-active:bg-primary-950',
        'dark:bg-primary-100 dark:text-primary-950',
        'dark:group-hover:bg-primary-200',
        'dark:group-active:bg-primary-300',
      ],
      secondary: [
        'bg-white text-primary-900',
        'border border-primary-200',
        'group-hover:bg-primary-100',
        'group-active:bg-primary-200',
        'dark:bg-primary-950 dark:text-primary-50',
        'dark:border-primary-800',
        'dark:group-hover:bg-primary-700',
        'dark:group-active:bg-primary-600',
      ],
      alert: [
        'bg-transparent text-red-600',
        'border border-red-600',
        'group-hover:bg-red-50',
        'group-active:bg-red-100',
        'dark:text-red-500',
        'dark:border-red-500',
        'dark:group-hover:bg-red-950',
        'dark:group-active:bg-red-900',
      ],
      'primary-ghost': [
        'bg-transparent text-primary-900',
        'group-hover:bg-primary-100',
        'group-active:bg-primary-200',
        'dark:text-primary-50',
        'dark:group-hover:bg-primary-800',
        'dark:group-active:bg-primary-700',
      ],
      'alert-ghost': [
        'bg-transparent text-red-600',
        'group-hover:bg-red-50',
        'group-active:bg-red-100',
        'dark:text-red-500',
        'dark:group-hover:bg-red-950',
        'dark:group-active:bg-red-900',
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
