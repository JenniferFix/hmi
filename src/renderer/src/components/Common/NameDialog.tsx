import React from 'react'
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
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'

const formSchema = z.object({
  name: z.string()
})

type FormValues = z.infer<typeof formSchema>

const NameDialog = ({ children, callback }: { children: React.ReactNode; callback: Function }) => {
  const nameForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'New Screen'
    }
  })

  const onFormSubmit = (data: FormValues) => {
    const { name } = data
    callback(name)
  }

  return (
    <Form {...nameForm}>
      <Dialog>
        <form onSubmit={nameForm.handleSubmit(onFormSubmit)}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Please enter a name:</DialogTitle>
              <DialogDescription>This will be the name for the thing</DialogDescription>
            </DialogHeader>
            {/* <FormField */}
            {/*   control={nameForm.control} */}
            {/*   name="name" */}
            {/*   render={({ field }) => ( */}
            {/*     <FormItem> */}
            {/*       <FormLabel>Name</FormLabel> */}
            {/*       <FormControl> */}
            {/*         <Input placeholder="name" {...field} /> */}
            {/*       </FormControl> */}
            {/*     </FormItem> */}
            {/*   )} */}
            {/* /> */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" variant="default">
                  Okay
                </Button>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </Form>
  )
}

export default NameDialog
