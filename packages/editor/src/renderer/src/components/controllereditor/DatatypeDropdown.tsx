import * as React from 'react'
import { useGetDatatypes, useGetDatatype } from '@renderer/hooks/usedatatypequeries'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { cn } from '@renderer/lib/utils'

export const DatatypeBox = React.memo(({ datatypeId }: { datatypeId: string }) => {
  const { data, isLoading, isError, error } = useGetDatatype(datatypeId)
  if (isLoading) return null
  if (isError) return null
  if (!data) return null
  return <div>{data.name}</div>
})

const DatatypeDropdown = React.memo(
  ({
    selectedId,
    setSelectedId,
    className
  }: {
    selectedId: string | undefined
    setSelectedId: (selectedId: string) => void
    className?: string
  }) => {
    const { data, isLoading, isError, error } = useGetDatatypes()
    if (isLoading) return null
    if (isError) return null
    return (
      <Select defaultValue={selectedId} onValueChange={(value) => setSelectedId(value)}>
        <SelectTrigger className={cn(className)}>
          <SelectValue placeholder="Datatype" />
        </SelectTrigger>
        <SelectContent>
          {data?.map((dt, idx) => (
            <SelectItem key={idx} value={dt.id}>
              {dt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
)

export default DatatypeDropdown
