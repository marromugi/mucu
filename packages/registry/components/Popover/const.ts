import { tv } from 'tailwind-variants'

export const popoverVariants = tv({
  slots: {
    wrapper: ['relative', 'inline-flex'],
    content: [
      'absolute',
      'z-50',
      'rounded-lg',
      'border',
      'border-outline',
      'bg-surface',
      'p-3',
      'text-sm',
      'text-text-body',
      'shadow-lg',
    ],
    arrow: [
      'absolute',
      'w-2.5',
      'h-2.5',
      'rotate-45',
      'border',
      'bg-surface',
      'border-outline',
    ],
  },
  variants: {
    placement: {
      top: {
        content: ['bottom-full', 'mb-2'],
        arrow: ['bottom-[-6px]', 'border-t-0', 'border-l-0'],
      },
      bottom: {
        content: ['top-full', 'mt-2'],
        arrow: ['top-[-6px]', 'border-b-0', 'border-r-0'],
      },
      left: {
        content: ['right-full', 'mr-2'],
        arrow: ['right-[-6px]', 'border-b-0', 'border-l-0'],
      },
      right: {
        content: ['left-full', 'ml-2'],
        arrow: ['left-[-6px]', 'border-t-0', 'border-r-0'],
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
      className: { content: ['left-0'], arrow: ['left-3'] },
    },
    {
      placement: 'top',
      align: 'center',
      className: {
        content: ['left-1/2', '-translate-x-1/2'],
        arrow: ['left-1/2', '-translate-x-1/2'],
      },
    },
    {
      placement: 'top',
      align: 'end',
      className: { content: ['right-0'], arrow: ['right-3'] },
    },
    // placement=bottom × align
    {
      placement: 'bottom',
      align: 'start',
      className: { content: ['left-0'], arrow: ['left-3'] },
    },
    {
      placement: 'bottom',
      align: 'center',
      className: {
        content: ['left-1/2', '-translate-x-1/2'],
        arrow: ['left-1/2', '-translate-x-1/2'],
      },
    },
    {
      placement: 'bottom',
      align: 'end',
      className: { content: ['right-0'], arrow: ['right-3'] },
    },
    // placement=left × align
    {
      placement: 'left',
      align: 'start',
      className: { content: ['top-0'], arrow: ['top-3'] },
    },
    {
      placement: 'left',
      align: 'center',
      className: {
        content: ['top-1/2', '-translate-y-1/2'],
        arrow: ['top-1/2', '-translate-y-1/2'],
      },
    },
    {
      placement: 'left',
      align: 'end',
      className: { content: ['bottom-0'], arrow: ['bottom-3'] },
    },
    // placement=right × align
    {
      placement: 'right',
      align: 'start',
      className: { content: ['top-0'], arrow: ['top-3'] },
    },
    {
      placement: 'right',
      align: 'center',
      className: {
        content: ['top-1/2', '-translate-y-1/2'],
        arrow: ['top-1/2', '-translate-y-1/2'],
      },
    },
    {
      placement: 'right',
      align: 'end',
      className: { content: ['bottom-0'], arrow: ['bottom-3'] },
    },
  ],
  defaultVariants: {
    placement: 'bottom',
    align: 'center',
  },
})
