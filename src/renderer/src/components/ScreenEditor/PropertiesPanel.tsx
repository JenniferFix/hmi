import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import { ScrollArea } from '@renderer/components/ui/scroll-area'

const PropertiesPanel = () => {
  return (
    <ScrollArea className="absolute inset-0 h-full">
      <Table className="h-full">
        <TableCaption>Properties</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

export default PropertiesPanel
