import React from 'react'
import { useForm } from '@tanstack/react-form'
import { Input } from '@renderer/components/ui/input'
import { propertyTemplate } from '@db/schema'
import { useGetWidgetProperty } from '@renderer/hooks/usepropertyqueries'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { createZodSchema } from '@db/gentypes'
import { Button } from '@renderer/components/ui/button'

const PropertyInput = ({
  propertyTemplateId,
  widgetId
}: {
  propertyTemplateId: string
  widgetId: string
}) => {
  const { data, isLoading, isError, error } = useGetWidgetProperty({
    widgetId,
    propertyTemplateId
  })
  if (isLoading) return <React.Fragment>Loading</React.Fragment>
  if (isError) return <React.Fragment>Error: {error.message}</React.Fragment>
  if (!data) throw new Error(`[PropertyInput.tsx] Error - No data, wtf`)

  const handleSubmit = (values) => {
    console.log(values)
  }

  const propSchema = createZodSchema({
    [(data?.propertyTemplate?.name as string) ?? 'unknown']: {
      type: data?.propertyTemplate?.dataType?.typescriptType || 'string'
    }
  })

  const form = useForm({
    defaultValues: {
      [data?.propertyTemplate?.name]: data.data ?? propertyTemplate.default
    },
    onSubmit: handleSubmit,
    validators: {
      onChange: propSchema
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
      <div className="flex">
        <form.Field
          name={data?.propertyTemplate?.name ?? 'unknown'}
          children={(field) => (
            <Input
              className="w-full"
              variant="property"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <Button type="submit" className="" size="tiny">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default PropertyInput
