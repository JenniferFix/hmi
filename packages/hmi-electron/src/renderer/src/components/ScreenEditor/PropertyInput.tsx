import React from 'react'
import { useForm } from '@tanstack/react-form'
import { Input } from '@renderer/components/ui/input'
import { type PropertyTemplateType, type DataTypeType } from '$/src/db/schema'
import { useGetWidgetProperty } from '@renderer/hooks/usepropertyqueries'
import { createZodSchema } from '@db/gentypes'

const PropertyInput = ({
  propertyTemplate,
  widgetId
}: {
  propertyTemplate: PropertyTemplateType
  widgetId: string
}) => {
  const { data, isLoading, isError, error } = useGetWidgetProperty({
    widgetId,
    propertyTemplateId: propertyTemplate.id
  })

  const handleSubmit = ({ value }) => {
    console.log(value)
  }

  const form = useForm({
    defaultValues: {
      [propertyTemplate.name]: propertyTemplate.default
    },
    onSubmit: handleSubmit
  })
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          <form.Field
            name={propertyTemplate.name}
            children={(field) => (
              <Input
                className="w-full"
                name={field.name}
                //TODO:
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
        </div>
      </form>
    </div>
  )
}

export default PropertyInput
