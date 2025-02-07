import React from 'react'
import { useForm } from '@tanstack/react-form'
import { Button } from '@renderer/components/ui/button'
import { Label } from '@renderer/components/ui/label'
import { Input } from '@renderer/components/ui/input'
import { z } from 'zod'
import {
  useGetController,
  useUpdateController,
  useInsertController
} from '@renderer/hooks/usecontrollerqueries'

const ControllerAddEditForm = ({ controllerId }: { controllerId?: string }) => {
  const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    ip: z.string(),
    slot: z.coerce.number(),
    rpi: z.coerce.number()
  })
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
      <div className="flex flex-col gap-1">
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
      </div>
    </form>
  )
}

export default ControllerAddEditForm
