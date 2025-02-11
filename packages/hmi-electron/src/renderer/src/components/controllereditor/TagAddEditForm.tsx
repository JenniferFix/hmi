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
import { useGetTag, useUpdateTag, useInsertTag } from '@renderer/hooks/usetagqueries'
import type { ControllerType, UpdateControllerType } from '@db/schema'
import { useNavigate, Link, useSearch, useRouter } from '@tanstack/react-router'
import { FieldWrap } from '@renderer/components/common/Form'
import DatatypeDropdown from './DatatypeDropdown'
// import { ScrollArea } from '@renderer/components/ui/scroll-area'

const formSchema = z.object({
  name: z.string(),
  datatype: z.string(),
  program: z.string().nullable()
})

const AddForm = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      datatype: '',
      program: ''
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
      <div className="flex flex-col gap-2">
        <form.Field
          name="name"
          children={(field) => (
            <FieldWrap>
              <Label htmlFor={field.name}>Name</Label>
              <Input
                className="bg-background text-foreground"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                onClick={(e) => e.currentTarget.select()}
              />
            </FieldWrap>
          )}
        />
        <form.Field
          name="datatype"
          children={(field) => (
            <FieldWrap>
              <Label htmlFor={field.name}>Datatype</Label>
              <Input
                className="bg-background text-foreground"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                onClick={(e) => e.currentTarget.select()}
              />
            </FieldWrap>
          )}
        />
        <form.Field
          name="program"
          children={(field) => (
            <FieldWrap>
              <Label htmlFor={field.name}>Program</Label>
              <DatatypeDropdown selectedId={field.state.value} setSelectedId={field.setValue} />
              <Input
                className="bg-background text-foreground"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                onClick={(e) => e.currentTarget.select()}
              />
            </FieldWrap>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="default" type="submit">
            Add
          </Button>
        </div>
      </div>
    </form>
  )
}

const EditForm = ({ tagId }: { tagId: string }) => {
  return <div> hi</div>
}

const TagAddEditForm = ({ tagId }: { tagId?: string }) => {
  if (tagId) return <EditForm tagId={tagId} />
  return <AddForm />
}

export default TagAddEditForm
