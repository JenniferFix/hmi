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

// TODO: This
// if nothing is selected show the apps properties
const PropertiesPanel = () => {
  return (
    <Table>
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
  )
}

export default PropertiesPanel
