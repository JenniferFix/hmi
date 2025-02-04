import React from 'react'
import { FieldApi, useForm } from '@tanstack/react-form'
import { Input } from '@renderer/components/ui/input'
import { propertyTemplate } from '@db/schema'
import { useGetWidgetProperty, useUpsertProperty } from '@renderer/hooks/usepropertyqueries'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { createZodSchema } from '@db/gentypes'
import { Button } from '@renderer/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'

const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <React.Fragment>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </React.Fragment>
  )
}

const PropertyInput = ({
  propertyTemplateId,
  widgetId
}: {
  propertyTemplateId: string
  widgetId: string
}) => {
  const upsertProperty = useUpsertProperty()
  const { data, isLoading, isError, error } = useGetWidgetProperty({
    widgetId,
    propertyTemplateId
  })
  if (isLoading) return <React.Fragment>Loading</React.Fragment>
  if (isError) return <React.Fragment>Error: {error.message}</React.Fragment>
  if (!data) throw new Error(`[PropertyInput.tsx] Error - No data, wtf`)

  const propSchema = createZodSchema({
    [(data?.propertyTemplate?.name as string) ?? 'unknown']: {
      type: data?.propertyTemplate?.dataType?.typescriptType || 'string'
    }
  })

  const handleSubmit = async ({ value }) => {
    // console.log(value[data.propertyTemplate?.name])
    await upsertProperty.mutateAsync({
      widgetId,
      propertyTemplateId: data.propertyTemplate.id,
      data: value[data.propertyTemplate.name]
    })
  }

  const form = useForm({
    defaultValues: {
      [data?.propertyTemplate?.name]: (data.data || data.propertyTemplate.default) as string
    },
    onSubmit: handleSubmit,
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: propSchema
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
      <div className="flex w-full">
        <form.Field
          name={data?.propertyTemplate?.name ?? 'unknown'}
          children={(field) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  className="w-full"
                  variant="property"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <FieldInfo field={field} />
              </TooltipContent>
            </Tooltip>
          )}
        />
        {/* <Button type="submit" className="" size="tiny"> */}
        {/*   Submit */}
        {/* </Button> */}
      </div>
    </form>
  )
}

export default PropertyInput
