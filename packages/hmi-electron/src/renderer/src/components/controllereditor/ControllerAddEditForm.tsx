import React from 'react'
import { useForm } from '@tanstack/react-form'
import { Button } from '@renderer/components/ui/button'
import { Label } from '@renderer/components/ui/label'
import { Input } from '@renderer/components/ui/input'
import { Textarea } from '@renderer/components/ui/textarea'
import { z } from 'zod'
import {
  useGetController,
  useUpdateController,
  useInsertController
} from '@renderer/hooks/usecontrollerqueries'
import { ControllerType } from '@db/schema'
import { useNavigate } from '@tanstack/react-router'
import { ScrollArea } from '@renderer/components/ui/scroll-area'

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  ip: z.string().ip(),
  slot: z.coerce.number(),
  rpi: z.coerce.number()
})

const AddForm = React.memo(() => {
  const insertController = useInsertController()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      ip: '',
      slot: 0,
      rpi: 50
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema
    },
    onSubmit: async ({ value }) => {
      const inserted = insertController.mutateAsync(value)
      form.reset()
      navigate({ to: '/controllers/$controllerId', params: { controllerId: inserted.id } })
    }
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="flex flex-col gap-1 px-2">
        <form.Field
          name="name"
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Name</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              )}
            </div>
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Description</Label>
              <Textarea
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              )}
            </div>
          )}
        />
        <form.Field
          name="ip"
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>IP</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              )}
            </div>
          )}
        />
        <div className="flex gap-2">
          <form.Field
            name="slot"
            children={(field) => (
              <div className="grow">
                <Label htmlFor={field.name}>Slot</Label>
                <Input
                  type="number"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
                {field.state.meta.errors && (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                )}
              </div>
            )}
          />
          <form.Field
            name="rpi"
            children={(field) => (
              <div className="grow">
                <Label htmlFor={field.name}>RPI</Label>
                <Input
                  type="number"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
                {field.state.meta.errors && (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                )}
              </div>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Add</Button>
        </div>
      </div>
    </form>
  )
})

const UpdateForm = React.memo(({ controllerId }: { controllerId: string }) => {
  const { data, isLoading, isError, error } = useGetController(controllerId)
  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error {error.message}</div>
  if (!data) throw new Error('No data')

  return <UpdateFormInner controller={data} />
})

const UpdateFormInner = React.memo(({ controller }: { controller: ControllerType }) => {
  const updateController = useUpdateController()
  const form = useForm({
    defaultValues: {
      name: controller.name ?? '',
      description: controller.description ?? '',
      ip: controller.ip ?? '',
      slot: controller.slot,
      rpi: controller.rpi
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema
    },
    onSubmit: ({ value }) => {
      console.log(value)
    }
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="flex flex-col gap-1 px-2">
        <form.Field
          name="name"
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Name</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              )}
            </div>
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Description</Label>
              <Textarea
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              )}
            </div>
          )}
        />
        <form.Field
          name="ip"
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>IP</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              )}
            </div>
          )}
        />
        <div className="flex gap-2">
          <form.Field
            name="slot"
            children={(field) => (
              <div className="grow">
                <Label htmlFor={field.name}>Slot</Label>
                <Input
                  type="number"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
                {field.state.meta.errors && (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                )}
              </div>
            )}
          />
          <form.Field
            name="rpi"
            children={(field) => (
              <div className="grow">
                <Label htmlFor={field.name}>RPI</Label>
                <Input
                  type="number"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
                {field.state.meta.errors && (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                )}
              </div>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Add</Button>
        </div>
      </div>
    </form>
  )
})

const ControllerAddEditForm = React.memo(({ controllerId }: { controllerId?: string }) => {
  if (controllerId) return <UpdateForm controllerId={controllerId} />
  return <AddForm />
})

export default ControllerAddEditForm
