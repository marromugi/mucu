import { polymorphicComponent } from '@/lib/polymorphic'
import {
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
} from './const'
import type {
  TableOwnProps,
  TableHeaderOwnProps,
  TableBodyOwnProps,
  TableRowOwnProps,
  TableHeadOwnProps,
  TableCellOwnProps,
} from './type'

const Table = polymorphicComponent<'table', TableOwnProps>(
  ({ as, className, ref, ...props }) => {
    const Component = as || 'table'
    return (
      <Component
        ref={ref}
        className={tableVariants({ className })}
        {...props}
      />
    )
  },
)
Table.displayName = 'Table'

const TableHeader = polymorphicComponent<'thead', TableHeaderOwnProps>(
  ({ as, className, ref, ...props }) => {
    const Component = as || 'thead'
    return (
      <Component
        ref={ref}
        className={tableHeaderVariants({ className })}
        {...props}
      />
    )
  },
)
TableHeader.displayName = 'TableHeader'

const TableBody = polymorphicComponent<'tbody', TableBodyOwnProps>(
  ({ as, className, ref, ...props }) => {
    const Component = as || 'tbody'
    return (
      <Component
        ref={ref}
        className={tableBodyVariants({ className })}
        {...props}
      />
    )
  },
)
TableBody.displayName = 'TableBody'

const TableRow = polymorphicComponent<'tr', TableRowOwnProps>(
  ({ as, selected, className, ref, ...props }) => {
    const Component = as || 'tr'
    return (
      <Component
        ref={ref}
        className={tableRowVariants({ selected, className })}
        data-selected={selected || undefined}
        {...props}
      />
    )
  },
)
TableRow.displayName = 'TableRow'

const TableHead = polymorphicComponent<'th', TableHeadOwnProps>(
  ({ as, align, className, ref, ...props }) => {
    const Component = as || 'th'
    return (
      <Component
        ref={ref}
        className={tableHeadVariants({ align, className })}
        {...props}
      />
    )
  },
)
TableHead.displayName = 'TableHead'

const TableCell = polymorphicComponent<'td', TableCellOwnProps>(
  ({ as, align, className, ref, ...props }) => {
    const Component = as || 'td'
    return (
      <Component
        ref={ref}
        className={tableCellVariants({ align, className })}
        {...props}
      />
    )
  },
)
TableCell.displayName = 'TableCell'

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
