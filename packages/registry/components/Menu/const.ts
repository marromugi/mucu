import { tv } from 'tailwind-variants'

export const menu = tv({
  slots: {
    wrapper: ['relative', 'inline-flex'],
    content: [
      'absolute',
      'z-50',
      'flex',
      'flex-col',
      'overflow-visible',
      'rounded-xl',
      'border',
      'border-outline',
      'bg-surface',
      'p-1',
      'shadow-lg',
    ],
  },
  variants: {
    placement: {
      top: {
        content: ['bottom-full', 'mb-1'],
      },
      bottom: {
        content: ['top-full', 'mt-1'],
      },
      left: {
        content: ['right-full', 'mr-1'],
      },
      right: {
        content: ['left-full', 'ml-1'],
      },
    },
    align: {
      start: {},
      center: {},
      end: {},
    },
  },
  compoundVariants: [
    // placement=top × align
    {
      placement: 'top',
      align: 'start',
      className: { content: ['left-0'] },
    },
    {
      placement: 'top',
      align: 'center',
      className: { content: ['left-1/2', '-translate-x-1/2'] },
    },
    {
      placement: 'top',
      align: 'end',
      className: { content: ['right-0'] },
    },
    // placement=bottom × align
    {
      placement: 'bottom',
      align: 'start',
      className: { content: ['left-0'] },
    },
    {
      placement: 'bottom',
      align: 'center',
      className: { content: ['left-1/2', '-translate-x-1/2'] },
    },
    {
      placement: 'bottom',
      align: 'end',
      className: { content: ['right-0'] },
    },
    // placement=left × align
    {
      placement: 'left',
      align: 'start',
      className: { content: ['top-0'] },
    },
    {
      placement: 'left',
      align: 'center',
      className: { content: ['top-1/2', '-translate-y-1/2'] },
    },
    {
      placement: 'left',
      align: 'end',
      className: { content: ['bottom-0'] },
    },
    // placement=right × align
    {
      placement: 'right',
      align: 'start',
      className: { content: ['top-0'] },
    },
    {
      placement: 'right',
      align: 'center',
      className: { content: ['top-1/2', '-translate-y-1/2'] },
    },
    {
      placement: 'right',
      align: 'end',
      className: { content: ['bottom-0'] },
    },
  ],
  defaultVariants: {
    placement: 'bottom',
    align: 'start',
  },
})

export const menuItem = tv({
  base: [
    'group',
    'relative',
    'flex',
    'w-full',
    'items-center',
    'gap-3',
    'px-3',
    'py-2',
    'text-left',
    'text-sm',
    'rounded-lg',
    'font-medium',
    'cursor-pointer',
    'select-none',
    'outline-none',
    'text-text-body',
    'hover:bg-primary-100',
    'focus:bg-primary-100',
    'focus-visible:bg-primary-100',
    'dark:hover:bg-primary-800',
    'dark:focus:bg-primary-800',
    'dark:focus-visible:bg-primary-800',
  ],
  variants: {
    destructive: {
      true: [
        'text-text-alert',
        'hover:bg-alert-50',
        'focus:bg-alert-50',
        'dark:hover:bg-alert-950',
        'dark:focus:bg-alert-950',
      ],
    },
    disabled: {
      true: ['opacity-50', 'cursor-not-allowed', 'pointer-events-none'],
    },
  },
  defaultVariants: {
    destructive: false,
    disabled: false,
  },
})

/** メニューアイテム内のアイコンサイズ */
export const menuItemIconSize = 'w-5 h-5'

export const menuDivider = tv({
  base: [
    'my-1',
    'mx-1',
    'h-px',
    'border-0',
    'bg-divider',
  ],
})

export const menuShortcut = tv({
  base: [
    'ml-auto',
    'text-xs',
    'text-text-description',
  ],
})

/** サブメニューコンテナのスタイル */
export const menuSub = tv({
  slots: {
    trigger: [
      'group',
      'relative',
      'flex',
      'w-full',
      'items-center',
      'gap-3',
      'px-3',
      'py-2',
      'text-left',
      'text-sm',
      'font-medium',
      'cursor-pointer',
      'select-none',
      'outline-none',
      'transition-colors',
      'duration-150',
      'text-text-body',
      'hover:bg-primary-100',
      'focus:bg-primary-100',
      'dark:hover:bg-primary-800',
      'dark:focus:bg-primary-800',
    ],
    content: [
      'absolute',
      'left-full',
      'top-0',
      'z-50',
      'ml-1',
      'flex',
      'flex-col',
      'overflow-visible',
      'rounded-xl',
      'border',
      'border-outline',
      'bg-surface',
      'py-1',
      'shadow-lg',
    ],
  },
  variants: {
    disabled: {
      true: {
        trigger: ['opacity-50', 'cursor-not-allowed', 'pointer-events-none'],
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
})
