import * as React from 'react'
import { useGetController } from '@renderer/hooks/usecontrollerqueries'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'

const ControllerTags = ({ controllerId }: { controllerId: string }) => {
  const { data, isLoading, isError, error } = useGetController(controllerId)
  if (isLoading) return null
  if (isError) return null
  return (
    <Table>
      <TableCaption>List of tags added to controller</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  )
}

export default ControllerTags
