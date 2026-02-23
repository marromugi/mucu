import type { VariantProps } from 'tailwind-variants'
import type { PolymorphicProps } from '@/lib/polymorphic'
import type {
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
} from './const'

type TableOwnProps = VariantProps<typeof tableVariants>
type TableHeaderOwnProps = VariantProps<typeof tableHeaderVariants>
type TableBodyOwnProps = VariantProps<typeof tableBodyVariants>
type TableRowOwnProps = VariantProps<typeof tableRowVariants>
type TableHeadOwnProps = VariantProps<typeof tableHeadVariants>
type TableCellOwnProps = VariantProps<typeof tableCellVariants>

type TableProps<E extends React.ElementType = 'table'> = PolymorphicProps<E, TableOwnProps>
type TableHeaderProps<E extends React.ElementType = 'thead'> = PolymorphicProps<E, TableHeaderOwnProps>
type TableBodyProps<E extends React.ElementType = 'tbody'> = PolymorphicProps<E, TableBodyOwnProps>
type TableRowProps<E extends React.ElementType = 'tr'> = PolymorphicProps<E, TableRowOwnProps>
type TableHeadProps<E extends React.ElementType = 'th'> = PolymorphicProps<E, TableHeadOwnProps>
type TableCellProps<E extends React.ElementType = 'td'> = PolymorphicProps<E, TableCellOwnProps>

export type {
  TableOwnProps,
  TableHeaderOwnProps,
  TableBodyOwnProps,
  TableRowOwnProps,
  TableHeadOwnProps,
  TableCellOwnProps,
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
}
