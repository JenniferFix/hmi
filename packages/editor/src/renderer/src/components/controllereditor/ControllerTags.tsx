import * as React from 'react'
import { useParams } from '@tanstack/react-router'
import { useGetControllerTags } from '@renderer/hooks/usetagqueries'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent
} from '@renderer/components/ui/select'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Checkbox } from '@renderer/components/ui/checkbox'
import { BasicTooltip } from '@renderer/components/common/Tooltip'
import { Link } from '@tanstack/react-router'
import { TbTagPlus, TbTagMinus, TbTags } from 'react-icons/tb'
import { type TagType } from '@db/schema'
import {
  type Column,
  type ColumnDef,
  type Table as DataTableType,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel
} from '@tanstack/react-table'
import { DatatypeBox } from './DatatypeDropdown'
import { useDeleteTag } from '@renderer/hooks/usetagqueries'
import {
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  EyeOff,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight
} from 'lucide-react'
import { cn } from '@renderer/lib/utils'
import { TagWithDatatype } from '@db/schema'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export interface DatatableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

interface DataTablePaginationProps<TData> {
  table: DataTableType<TData>
}

export const columns: ColumnDef<TagWithDatatype>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
  },
  {
    accessorKey: 'dataType.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Datatype" />
    // cell: ({ row }) => {
    // const name = row.original.dataType.name
    // return name
    // return <DatatypeBox datatypeId={row.getValue('dataType.name')} />
    // }
  },
  {
    accessorKey: 'program',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Program" />
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // const tag = row.original
      return <ActionDropdown row={row.original} />
    }
  }
]

function DataTablePaginationControls<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-nowrap text-sm font-medium">Rows per Page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100, 200].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDown />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const ActionDropdown = ({ row }: { row: TagType }) => {
  const deleteTag = useDeleteTag()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel hidden>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={async () => {
            if (!row.id) throw new Error(`tag doesn't have an id`)
            await deleteTag.mutateAsync({ tagId: row.id, controllerId: row.controllerId })
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DataTable<TData, TValue>({ columns, data }: DatatableProps<TData, TValue>) {
  const { controllerId } = useParams({ from: '/controllers/$controllerId' })
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const deleteTag = useDeleteTag()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex gap-1">
        <BasicTooltip content="Add tag to controller" asChild>
          <Button variant="outline" size="icon" asChild>
            <Link to="/controllers/$controllerId/addtag" params={{ controllerId }}>
              <TbTagPlus />
            </Link>
          </Button>
        </BasicTooltip>
        <BasicTooltip content="Delete selected tags" asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              // TODO: Batch deletes
              // TODO: Try to figure out 'proper' way with the row.getValue('COLUMN_NAME_HERE') instead of the row.original
              table.getFilteredSelectedRowModel().rows.forEach(async (row) => {
                const tag = row.original as TagWithDatatype
                if (!tag.id) throw new Error(`Tag data doesn't contain an id so cannot delete`)
                await deleteTag.mutateAsync({ tagId: tag.id, controllerId })
              })
              table.resetRowSelection()
            }}
          >
            <TbTagMinus />
          </Button>
        </BasicTooltip>
        <BasicTooltip content="Import all tags from controller" asChild>
          <Button variant="outline" size="icon" disabled>
            <TbTags />{' '}
          </Button>
        </BasicTooltip>
      </div>
      <div className="flex items-center py-4 shrink-0">
        <Input
          variant="property"
          className="max-w-sm"
          placeholder="Filter tags..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="h-full">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No Results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <DataTablePaginationControls table={table} />
      {/* <div className="flex items-center justify-between space-x-2 pl-4 py-4 "> */}
      {/*   <div className="text-sm text-muted-foreground"> */}
      {/*     {table.getFilteredSelectedRowModel().rows.length} of{' '} */}
      {/*     {table.getFilteredRowModel().rows.length} row(s) selected */}
      {/*   </div> */}
      {/*   <div className="flex gap-2 pr-4"> */}
      {/*     <Button variant="outline" size="sm" onClick={() => table.previousPage()}> */}
      {/*       Previous */}
      {/*     </Button> */}
      {/*     <Button variant="outline" size="sm" onClick={() => table.nextPage()}> */}
      {/*       Next */}
      {/*     </Button> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  )
}

const ControllerTags = ({ controllerId }: { controllerId: string }) => {
  const { data, isLoading, isError, error } = useGetControllerTags({ controllerId })
  if (isLoading) return null
  if (isError) return null
  if (!data) return null
  return <DataTable columns={columns} data={data} />
}

export default ControllerTags
