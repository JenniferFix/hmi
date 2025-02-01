import React from 'react'
import { useForm } from '@tanstack/react-form'
import { Input } from '@renderer/components/ui/input'

const PropertyInput = () => {
  const handleSubmit = ({ value }) => {
    console.log(value)
  }

  const form = useForm({
    defaultValues: {
      testField: ''
    },
    onSubmit: handleSubmit
  })
  return (
    <div>
      <form>
        <div>
          <form.Field name={'testField'} children={(field) => <Input name={field.name} />} />
        </div>
      </form>
    </div>
  )
}

export default PropertyInput
