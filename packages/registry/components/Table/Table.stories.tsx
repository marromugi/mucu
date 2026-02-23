import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Checkbox } from '../Checkbox'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
}

export default meta
type Story = StoryObj<typeof Table>

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>Inactive</TableCell>
          <TableCell>Member</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Carol</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Member</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('table')).toBeInTheDocument()
    const rows = canvas.getAllByRole('row')
    await expect(rows).toHaveLength(4)
    const columnHeaders = canvas.getAllByRole('columnheader')
    await expect(columnHeaders).toHaveLength(3)
  },
}

// ---------------------------------------------------------------------------
// WithSelectedRows
// ---------------------------------------------------------------------------

export const WithSelectedRows: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow selected>
          <TableCell>Alice</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>Inactive</TableCell>
        </TableRow>
        <TableRow selected>
          <TableCell>Carol</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const rows = canvas.getAllByRole('row')
    await expect(rows[1]).toHaveAttribute('data-selected', 'true')
    await expect(rows[2]).not.toHaveAttribute('data-selected')
    await expect(rows[3]).toHaveAttribute('data-selected', 'true')
  },
}

// ---------------------------------------------------------------------------
// Alignment
// ---------------------------------------------------------------------------

export const Alignment: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead align="left">Left</TableHead>
          <TableHead align="center">Center</TableHead>
          <TableHead align="right">Right</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell align="left">Alice</TableCell>
          <TableCell align="center">Active</TableCell>
          <TableCell align="right">Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Bob</TableCell>
          <TableCell align="center">Inactive</TableCell>
          <TableCell align="right">Member</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

// ---------------------------------------------------------------------------
// DataTableComposition — interactive row selection with Checkbox
// ---------------------------------------------------------------------------

const DATA_TABLE_ROWS = [
  { id: '1', name: 'Alice Johnson', status: 'Active', role: 'Admin' },
  { id: '2', name: 'Bob Smith', status: 'Inactive', role: 'Member' },
  { id: '3', name: 'Carol Williams', status: 'Active', role: 'Member' },
  { id: '4', name: 'David Lee', status: 'Active', role: 'Editor' },
]

export const DataTableComposition: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    const allSelected =
      DATA_TABLE_ROWS.length > 0 && selectedIds.size === DATA_TABLE_ROWS.length

    const toggleAll = () => {
      if (allSelected) {
        setSelectedIds(new Set())
      } else {
        setSelectedIds(new Set(DATA_TABLE_ROWS.map((r) => r.id)))
      }
    }

    const toggleRow = (id: string) => {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={allSelected}
                onCheckedChange={toggleAll}
                size="sm"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DATA_TABLE_ROWS.map((row) => {
            const isSelected = selectedIds.has(row.id)
            return (
              <TableRow key={row.id} selected={isSelected}>
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleRow(row.id)}
                    size="sm"
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkboxes = canvas.getAllByRole('checkbox')
    const selectAll = checkboxes[0]
    const firstRowCheckbox = checkboxes[1]

    await expect(selectAll).not.toBeChecked()
    await expect(firstRowCheckbox).not.toBeChecked()

    await userEvent.click(firstRowCheckbox)
    await expect(firstRowCheckbox).toBeChecked()

    await userEvent.click(selectAll)
    for (const cb of checkboxes) {
      await expect(cb).toBeChecked()
    }

    await userEvent.click(selectAll)
    for (const cb of checkboxes) {
      await expect(cb).not.toBeChecked()
    }
  },
}

// ---------------------------------------------------------------------------
// GridLayout — all sub-components rendered as div with CSS Grid
// ---------------------------------------------------------------------------

export const GridLayout: Story = {
  render: () => (
    <Table as="div" className="overflow-hidden">
      <TableHeader as="div">
        <TableRow as="div" className="grid grid-cols-[auto_1fr_1fr_auto]">
          <TableHead as="div" className="w-10">
            #
          </TableHead>
          <TableHead as="div">Name</TableHead>
          <TableHead as="div">Status</TableHead>
          <TableHead as="div" align="right">
            Role
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody as="div">
        {DATA_TABLE_ROWS.map((row) => (
          <TableRow
            key={row.id}
            as="div"
            className="grid grid-cols-[auto_1fr_1fr_auto]"
          >
            <TableCell as="div" className="w-10">
              {row.id}
            </TableCell>
            <TableCell as="div">{row.name}</TableCell>
            <TableCell as="div">{row.status}</TableCell>
            <TableCell as="div" align="right">
              {row.role}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Alice Johnson')).toBeInTheDocument()
    await expect(canvas.getByText('David Lee')).toBeInTheDocument()
  },
}
