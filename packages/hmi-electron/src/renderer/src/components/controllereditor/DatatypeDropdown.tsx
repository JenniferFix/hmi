import * as React from 'react'
import { useGetDatatypes } from '@renderer/hooks/usedatatypequeries'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'

const DatatypeDropdown = React.memo(
  ({
    selectedId,
    setSelectedId
  }: {
    selectedId: string | undefined
    setSelectedId: (selectedId: string) => void
  }) => {
    const { data, isLoading, isError, error } = useGetDatatypes()
    if (isLoading) return null
    if (isError) return null
    return (
      <Select defaultValue={selectedId} onValueChange={(value) => setSelectedId(value)}>
        <SelectTrigger>
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
