import * as React from 'react'
import { Button } from '@renderer/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { useGetControllers, useDeleteController } from '@renderer/hooks/usecontrollerqueries'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useParams } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

const Controllers = React.memo(() => {
  const navigate = useNavigate()
  const params = useParams({ from: '/controllers' })
  const { data, isLoading, isError } = useGetControllers()
  const deleteController = useDeleteController()
  const controllerId: string | undefined =
    'controllerId' in params ? (params?.controllerId as string) : undefined
  const [selected, setSelected] = React.useState<string | undefined>(controllerId)
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  React.useEffect(() => {
    setSelected(controllerId)
  }, [setSelected, controllerId])

  React.useEffect(() => {
    if (!selected) return
    navigate({ to: `/controllers/$controllerId`, params: { controllerId: selected } })
  }, [selected, navigate])
  if (isLoading) return null
  if (isError) return null

  return (
    <div className="grow flex flex-col gap-2 px-3 py-2">
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
            <Button size="icon" variant="outline" asChild>
              <Link to="/controllers/add">
                <Plus />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add Controller</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              disabled={!selected}
              asChild={selected === undefined ? false : true}
            >
              {selected === undefined ? (
                <Pencil />
              ) : (
                <Link
                  to="/controllers/$controllerId/edit"
                  params={{ controllerId: selected }}
                  disabled={!selected}
                >
                  <Pencil />
                </Link>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit Controller</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog open={confirmOpen} onOpenChange={(value) => setConfirmOpen(value)}>
              <DialogTrigger asChild>
                <Button size="icon" variant="outline" disabled={!selected}>
                  <Trash2 />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the controller and
                    all associated data including all tags added.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (!selected) return
                      deleteController.mutate({ controllerId: selected })
                      setConfirmOpen(false)
                    }}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent>Delete Controller</TooltipContent>
        </Tooltip>
      </div>
      <Outlet />
    </div>
  )
})
export default Controllers
