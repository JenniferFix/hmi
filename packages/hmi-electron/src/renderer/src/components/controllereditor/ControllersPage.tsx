import * as React from 'react'
import { Button } from '@renderer/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { useGetControllers } from '@renderer/hooks/usecontrollerqueries'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useParams } from '@tanstack/react-router'

const Controllers = React.memo(() => {
  const navigate = useNavigate()
  const { controllerId } = useParams({ from: '/controllers/$controllerId' })
  const { data, isLoading, isError, error } = useGetControllers()

  const [selected, setSelected] = React.useState<string | undefined>(controllerId)

  React.useEffect(() => {
    if (!selected) return
    navigate({ to: `/controllers/$controllerId`, params: { controllerId: selected } })
  }, [selected, navigate])
  if (isLoading) return null
  if (isError) return null
  return (
    <div className="flex flex-col gap-2 px-3 py-2">
      <div className="flex gap-2">
        <Select value={selected} onValueChange={(value) => setSelected(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Controller" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((controller) => (
              <SelectItem key={controller.id} value={controller.id}>
                {controller.name}
              </SelectItem>
            ))}
            {!data && (
              <SelectItem defaultChecked value="add">
                Add Controller
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline">
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add Controller</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline">
              <Pencil />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit Controller</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" disabled={true}>
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Controller</TooltipContent>
        </Tooltip>
      </div>
      <Outlet />
    </div>
  )
})

export default Controllers
