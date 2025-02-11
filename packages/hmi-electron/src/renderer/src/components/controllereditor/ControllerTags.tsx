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
import { Button } from '@renderer/components/ui/button'
import { Checkbox } from '@renderer/components/ui/checkbox'
import { BasicTooltip } from '@renderer/components/common/Tooltip'
import { Link } from '@tanstack/react-router'
import { TbTagPlus, TbTagMinus, TbTags } from 'react-icons/tb'

const ControllerTags = ({ controllerId }: { controllerId: string }) => {
  const { data, isLoading, isError, error } = useGetController(controllerId)
  if (isLoading) return null
  if (isError) return null
  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <BasicTooltip content="Add tag to controller" asChild>
          <Button variant="outline" size="icon" asChild>
            <Link to="/controllers/$controllerId/addtag" params={{ controllerId }}>
              <TbTagPlus />
            </Link>
          </Button>
        </BasicTooltip>
        <BasicTooltip content="Delete selected tags" asChild>
          <Button variant="outline" size="icon">
            <TbTagMinus />
          </Button>
        </BasicTooltip>
        <BasicTooltip content="Import all tags from controller" asChild>
          <Button variant="outline" size="icon" disabled>
            <TbTags />
          </Button>
        </BasicTooltip>
      </div>
      <Table>
        <TableCaption>List of tags added to controller</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <BasicTooltip content="Select all" asChild>
                <Checkbox />
              </BasicTooltip>
            </TableHead>
            <TableHead>
              <BasicTooltip content="Name">Name</BasicTooltip>
            </TableHead>
            <TableHead>
              <BasicTooltip content="Description">Description</BasicTooltip>
            </TableHead>
            <TableHead>
              <BasicTooltip content="Datatype">Datatype</BasicTooltip>
            </TableHead>
            <TableHead>
              <BasicTooltip content="Program">Program</BasicTooltip>
            </TableHead>
            <TableHead>
              <BasicTooltip content="Last value">Last value</BasicTooltip>
            </TableHead>
            <TableHead>
              <BasicTooltip content="Last updated">Last updated</BasicTooltip>
            </TableHead>
            <TableHead>
              <BasicTooltip content="Status">Status</BasicTooltip>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  )
}

export default ControllerTags
