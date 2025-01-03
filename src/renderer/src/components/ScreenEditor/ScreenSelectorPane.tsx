import React from 'react'
import { Button } from '@renderer/components/ui/button'
import { useInsertScreen, useGetScreens } from '@renderer/hooks/usescreensqueries'
import { Link } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@renderer/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@renderer/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@renderer/components/ui/input'

const formSchema = z.object({
  name: z.string()
})

type FormValues = z.infer<typeof formSchema>

const ScreenPane = () => {
  const insertScreen = useInsertScreen()
  const { isError, isLoading, data, error } = useGetScreens()
  const [open, setOpen] = React.useState(false)

  const nameForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'New Screen'
    }
  })

  const handleAddScreen = (data: FormValues) => {
    insertScreen.mutate({ name: data.name ? data.name : 'New Screen' })
    setOpen(false)
  }

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>{error.message}</div>

  return (
    <div className="flex flex-col justify-between h-full p-2 pb-4">
      <div>
        {data ? (
          data.map((screen) => (
            <Button key={screen.id} className="w-full justify-start" variant="link" asChild>
              <Link to={`/edit/$screenId`} params={{ screenId: screen.id.toString() }}>
                {screen.name}
              </Link>
            </Button>
          ))
        ) : (
          <div>no data</div>
        )}
      </div>
      <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full text-lg">
            Add
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...nameForm}>
            <form onSubmit={nameForm.handleSubmit(handleAddScreen)}>
              <DialogHeader>
                <DialogTitle>Enter name</DialogTitle>
                <DialogDescription>Enter the name of the screen</DialogDescription>
              </DialogHeader>
              <FormField
                control={nameForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ScreenPane
