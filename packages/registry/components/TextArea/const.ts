import { tv } from 'tailwind-variants'

export const textAreaVariants = tv({
  base: [
    // 基本スタイル
    'w-full',
    'outline-none',
    'transition-colors',
    'duration-200',
    // 角丸
    'rounded-xl',
    // 通常状態
    'bg-surface',
    'border',
    'border-outline',
    'text-text-body',
    'placeholder:text-text-description',
    // フォーカス状態
    'focus:ring-4',
    'focus:ring-focus/20',
    'focus:border-focus',
  ],
  variants: {
    size: {
      sm: ['px-3', 'py-1.5', 'text-sm'],
      md: ['px-3', 'py-2', 'text-base'],
      lg: ['px-4', 'py-3', 'text-lg'],
    },
    error: {
      true: [
        'bg-alert-50',
        'border-alert-300',
        'focus:ring-alert-500/20',
        'focus:border-alert-400',
        'dark:bg-alert-950',
        'dark:border-alert-700',
        'dark:focus:ring-alert-500/20',
        'dark:focus:border-alert-600',
      ],
    },
    disabled: {
      true: ['cursor-not-allowed', 'bg-disabled-bg', 'text-disabled-text'],
    },
    resize: {
      none: ['resize-none'],
      vertical: ['resize-y'],
      both: ['resize'],
    },
  },
  defaultVariants: {
    size: 'md',
    error: false,
    disabled: false,
    resize: 'vertical',
  },
})
