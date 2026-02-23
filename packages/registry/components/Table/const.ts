import { tv } from 'tailwind-variants'

export const tableVariants = tv({
  base: [
    'w-full',
    'caption-bottom',
    'border-collapse',
    'text-sm',
    'text-text-body',
  ],
})

export const tableHeaderVariants = tv({
  base: ['bg-container', '[&_tr]:border-0'],
})

export const tableBodyVariants = tv({
  base: ['[&_tr:last-child]:border-0'],
})

export const tableRowVariants = tv({
  base: ['border-b', 'border-divider', 'transition-colors'],
  variants: {
    selected: {
      true: ['bg-primary-50', 'dark:bg-primary-900'],
    },
  },
  defaultVariants: {
    selected: false,
  },
})

export const tableHeadVariants = tv({
  base: [
    'h-10',
    'px-3',
    'text-left',
    'text-xs',
    'font-medium',
    'text-text-description',
    'content-center',
    '[&:has([role=checkbox])]:pr-0',
  ],
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'left',
  },
})

export const tableCellVariants = tv({
  base: ['px-3', 'py-2.5', 'align-middle', '[&:has([role=checkbox])]:pr-0'],
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'left',
  },
})
