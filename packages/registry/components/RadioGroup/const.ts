import { tv } from 'tailwind-variants'

export const radioGroupVariants = tv({
  base: ['flex'],
  variants: {
    orientation: {
      horizontal: ['flex-row', 'flex-wrap', 'gap-4'],
      vertical: ['flex-col', 'gap-2'],
    },
    disabled: {
      true: ['opacity-50', 'cursor-not-allowed'],
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    disabled: false,
  },
})

export const radioGroupItemVariants = tv({
  slots: {
    wrapper: ['group', 'inline-flex', 'items-center', 'cursor-pointer', 'select-none'],
    indicator: [
      'relative',
      'shrink-0',
      'rounded-full',
      'border-2',
      'transition-[border-color]',
      'duration-200',
      'border-outline',
      'bg-surface',
      // フォーカス時
      'group-focus-within:ring-2',
      'group-focus-within:ring-focus/20',
      'group-focus-within:ring-offset-2',
    ],
    dot: [
      'absolute',
      'inset-0',
      'm-auto',
      'rounded-full',
      'transition-transform',
      'duration-200',
      'bg-text-primary',
      // 初期状態（非選択時）
      'scale-0',
    ],
    label: [
      'transition-colors',
      'duration-200',
      'text-text-body',
    ],
    input: ['sr-only'],
  },
  variants: {
    size: {
      sm: {
        wrapper: ['gap-2'],
        indicator: ['w-4', 'h-4'],
        dot: ['w-2', 'h-2'],
        label: ['text-sm'],
      },
      md: {
        wrapper: ['gap-3'],
        indicator: ['w-5', 'h-5'],
        dot: ['w-2.5', 'h-2.5'],
        label: ['text-base'],
      },
    },
    checked: {
      true: {
        indicator: ['border-text-primary'],
        dot: ['scale-100'],
      },
    },
    disabled: {
      true: {
        wrapper: ['cursor-not-allowed', 'pointer-events-none'],
        indicator: ['opacity-50'],
        label: ['opacity-50'],
      },
    },
  },
  compoundVariants: [
    // ホバー時（未選択時のみ）
    {
      checked: false,
      disabled: false,
      className: {
        indicator: ['group-hover:border-text-description'],
      },
    },
    // checked + disabled の組み合わせ
    {
      checked: true,
      disabled: true,
      className: {
        indicator: ['border-disabled-text'],
        dot: ['bg-disabled-text'],
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    checked: false,
    disabled: false,
  },
})
