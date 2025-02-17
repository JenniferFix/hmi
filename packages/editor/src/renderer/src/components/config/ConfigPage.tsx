import React from 'react'
import { ThemeToggle } from '@renderer/components/common/ThemeToggle'
import { Table, TableRow, TableCell, TableBody } from '@renderer/components/ui/table'

const ConfigPage = () => {
  return (
    <div>
      <h2 className="text-xl">Config</h2>
      <Table className="max-w-md">
        <TableBody>
          <TableRow>
            <TableCell>Toggle Theme</TableCell>
            <TableCell>
              <ThemeToggle />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex items-center max-w-lg"></div>
    </div>
  )
}

export default ConfigPage
