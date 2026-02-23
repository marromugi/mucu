import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table'

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

describe('Table', () => {
  it('renders as table by default', () => {
    const { container } = render(<Table />)
    expect(container.firstChild?.nodeName).toBe('TABLE')
  })

  it('applies base variant classes', () => {
    const { container } = render(<Table />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('w-full')
    expect(el).toHaveClass('text-sm')
    expect(el).toHaveClass('border-collapse')
  })

  it('renders as a different element with as prop', () => {
    const { container } = render(<Table as="div" />)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLTableElement>()
    render(<Table ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTableElement)
  })

  it('merges custom className with variant classes', () => {
    const { container } = render(<Table className="custom-table" />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('w-full')
    expect(el).toHaveClass('custom-table')
  })

  it('passes arbitrary attributes through', () => {
    const { container } = render(
      <Table data-testid="my-table" aria-label="data table" />,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('data-testid', 'my-table')
    expect(el).toHaveAttribute('aria-label', 'data table')
  })

  it('has correct displayName', () => {
    expect(Table.displayName).toBe('Table')
  })
})

// ---------------------------------------------------------------------------
// TableHeader
// ---------------------------------------------------------------------------

describe('TableHeader', () => {
  it('renders as thead by default', () => {
    const { container } = render(
      <table>
        <TableHeader />
      </table>,
    )
    expect(container.querySelector('thead')).not.toBeNull()
  })

  it('applies bg-container class', () => {
    const { container } = render(
      <table>
        <TableHeader />
      </table>,
    )
    const el = container.querySelector('thead') as HTMLElement
    expect(el).toHaveClass('bg-container')
  })

  it('renders as a different element with as prop', () => {
    const { container } = render(<TableHeader as="div" />)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLTableSectionElement>()
    render(
      <table>
        <TableHeader ref={ref} />
      </table>,
    )
    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement)
  })

  it('merges custom className', () => {
    const { container } = render(
      <table>
        <TableHeader className="custom-header" />
      </table>,
    )
    const el = container.querySelector('thead') as HTMLElement
    expect(el).toHaveClass('custom-header')
  })

  it('passes arbitrary attributes through', () => {
    const { container } = render(
      <table>
        <TableHeader data-testid="thead-el" />
      </table>,
    )
    const el = container.querySelector('thead') as HTMLElement
    expect(el).toHaveAttribute('data-testid', 'thead-el')
  })

  it('has correct displayName', () => {
    expect(TableHeader.displayName).toBe('TableHeader')
  })
})

// ---------------------------------------------------------------------------
// TableBody
// ---------------------------------------------------------------------------

describe('TableBody', () => {
  it('renders as tbody by default', () => {
    const { container } = render(
      <table>
        <TableBody />
      </table>,
    )
    expect(container.querySelector('tbody')).not.toBeNull()
  })

  it('renders as a different element with as prop', () => {
    const { container } = render(<TableBody as="div" />)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLTableSectionElement>()
    render(
      <table>
        <TableBody ref={ref} />
      </table>,
    )
    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement)
  })

  it('merges custom className', () => {
    const { container } = render(
      <table>
        <TableBody className="custom-body" />
      </table>,
    )
    const el = container.querySelector('tbody') as HTMLElement
    expect(el).toHaveClass('custom-body')
  })

  it('passes arbitrary attributes through', () => {
    const { container } = render(
      <table>
        <TableBody data-testid="tbody-el" />
      </table>,
    )
    const el = container.querySelector('tbody') as HTMLElement
    expect(el).toHaveAttribute('data-testid', 'tbody-el')
  })

  it('has correct displayName', () => {
    expect(TableBody.displayName).toBe('TableBody')
  })
})

// ---------------------------------------------------------------------------
// TableRow
// ---------------------------------------------------------------------------

describe('TableRow', () => {
  it('renders as tr by default', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow />
        </tbody>
      </table>,
    )
    expect(container.querySelector('tr')).not.toBeNull()
  })

  it('applies base variant classes', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow />
        </tbody>
      </table>,
    )
    const el = container.querySelector('tr') as HTMLElement
    expect(el).toHaveClass('border-b')
    expect(el).toHaveClass('transition-colors')
  })

  it('applies selected variant classes when selected is true', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow selected />
        </tbody>
      </table>,
    )
    const el = container.querySelector('tr') as HTMLElement
    expect(el).toHaveClass('bg-primary-50')
  })

  it('does not apply selected classes when selected is false', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow selected={false} />
        </tbody>
      </table>,
    )
    const el = container.querySelector('tr') as HTMLElement
    expect(el).not.toHaveClass('bg-primary-50')
  })

  it('sets data-selected attribute when selected is true', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow selected />
        </tbody>
      </table>,
    )
    const el = container.querySelector('tr') as HTMLElement
    expect(el).toHaveAttribute('data-selected', 'true')
  })

  it('does not set data-selected attribute when not selected', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow />
        </tbody>
      </table>,
    )
    const el = container.querySelector('tr') as HTMLElement
    expect(el).not.toHaveAttribute('data-selected')
  })

  it('renders as a different element with as prop', () => {
    const { container } = render(<TableRow as="div" />)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLTableRowElement>()
    render(
      <table>
        <tbody>
          <TableRow ref={ref} />
        </tbody>
      </table>,
    )
    expect(ref.current).toBeInstanceOf(HTMLTableRowElement)
  })

  it('merges custom className with variant classes', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow className="custom-row" />
        </tbody>
      </table>,
    )
    const el = container.querySelector('tr') as HTMLElement
    expect(el).toHaveClass('border-b')
    expect(el).toHaveClass('custom-row')
  })

  it('passes arbitrary attributes through', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow data-testid="row-el" />
        </tbody>
      </table>,
    )
    const el = container.querySelector('tr') as HTMLElement
    expect(el).toHaveAttribute('data-testid', 'row-el')
  })

  it('has correct displayName', () => {
    expect(TableRow.displayName).toBe('TableRow')
  })
})

// ---------------------------------------------------------------------------
// TableHead
// ---------------------------------------------------------------------------

describe('TableHead', () => {
  it('renders as th by default', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHead>Name</TableHead>
          </tr>
        </thead>
      </table>,
    )
    expect(container.querySelector('th')).not.toBeNull()
  })

  it('applies base variant classes', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHead>Name</TableHead>
          </tr>
        </thead>
      </table>,
    )
    const el = container.querySelector('th') as HTMLElement
    expect(el).toHaveClass('h-10')
    expect(el).toHaveClass('px-3')
    expect(el).toHaveClass('font-medium')
  })

  it('applies left align by default', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHead>Name</TableHead>
          </tr>
        </thead>
      </table>,
    )
    const el = container.querySelector('th') as HTMLElement
    expect(el).toHaveClass('text-left')
  })

  it('applies center align', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHead align="center">Status</TableHead>
          </tr>
        </thead>
      </table>,
    )
    const el = container.querySelector('th') as HTMLElement
    expect(el).toHaveClass('text-center')
  })

  it('applies right align', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHead align="right">Amount</TableHead>
          </tr>
        </thead>
      </table>,
    )
    const el = container.querySelector('th') as HTMLElement
    expect(el).toHaveClass('text-right')
  })

  it('renders as a different element with as prop', () => {
    const { container } = render(<TableHead as="div">Name</TableHead>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLTableCellElement>()
    render(
      <table>
        <thead>
          <tr>
            <TableHead ref={ref}>Name</TableHead>
          </tr>
        </thead>
      </table>,
    )
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement)
  })

  it('merges custom className with variant classes', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHead className="custom-head">Name</TableHead>
          </tr>
        </thead>
      </table>,
    )
    const el = container.querySelector('th') as HTMLElement
    expect(el).toHaveClass('h-10')
    expect(el).toHaveClass('custom-head')
  })

  it('passes arbitrary attributes through', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHead scope="col">Name</TableHead>
          </tr>
        </thead>
      </table>,
    )
    const el = container.querySelector('th') as HTMLElement
    expect(el).toHaveAttribute('scope', 'col')
  })

  it('has correct displayName', () => {
    expect(TableHead.displayName).toBe('TableHead')
  })
})

// ---------------------------------------------------------------------------
// TableCell
// ---------------------------------------------------------------------------

describe('TableCell', () => {
  it('renders as td by default', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Value</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    expect(container.querySelector('td')).not.toBeNull()
  })

  it('applies base variant classes', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Value</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    const el = container.querySelector('td') as HTMLElement
    expect(el).toHaveClass('px-3')
    expect(el).toHaveClass('py-2.5')
    expect(el).toHaveClass('align-middle')
  })

  it('applies left align by default', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Value</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    const el = container.querySelector('td') as HTMLElement
    expect(el).toHaveClass('text-left')
  })

  it('applies center align', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell align="center">Value</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    const el = container.querySelector('td') as HTMLElement
    expect(el).toHaveClass('text-center')
  })

  it('applies right align', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell align="right">$100</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    const el = container.querySelector('td') as HTMLElement
    expect(el).toHaveClass('text-right')
  })

  it('renders as a different element with as prop', () => {
    const { container } = render(<TableCell as="div">Value</TableCell>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLTableCellElement>()
    render(
      <table>
        <tbody>
          <tr>
            <TableCell ref={ref}>Value</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement)
  })

  it('merges custom className with variant classes', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell className="custom-cell">Value</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    const el = container.querySelector('td') as HTMLElement
    expect(el).toHaveClass('px-3')
    expect(el).toHaveClass('custom-cell')
  })

  it('passes arbitrary attributes through', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell data-testid="cell-el">Value</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    const el = container.querySelector('td') as HTMLElement
    expect(el).toHaveAttribute('data-testid', 'cell-el')
  })

  it('has correct displayName', () => {
    expect(TableCell.displayName).toBe('TableCell')
  })
})
