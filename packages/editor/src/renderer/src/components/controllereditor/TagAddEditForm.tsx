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
import { useGetTag, useUpdateTag, useInsertTag } from '@renderer/hooks/usetagqueries'
import type { InsertTagType } from '@db/schema'
import { useNavigate, Link, useSearch, useRouter } from '@tanstack/react-router'
import { FieldWrap } from '@renderer/components/common/Form'
import DatatypeDropdown from './DatatypeDropdown'
// import { ScrollArea } from '@renderer/components/ui/scroll-area'

const formSchema = z.object({
  name: z.string(),
  dataTypeId: z.string(),
  program: z.string().nullable(),
  description: z.string()
})

const AddForm = ({ controllerId }: { controllerId: string }) => {
  const navigate = useNavigate()
  const insertTag = useInsertTag()
  const form = useForm({
    defaultValues: {
      name: '',
      dataTypeId: '',
      program: '',
      description: ''
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      // TODO: Decide if there is a tag page to go to, or get rid of the return value
      const inserted = await insertTag.mutateAsync({ values: { ...value, controllerId } })
      form.reset()
      navigate({ to: '/controllers/$controllerId', params: { controllerId } })
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
                className="bg-background text-foreground w-80"
                placeholder="Tagname"
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
          name="dataTypeId"
          children={(field) => (
            <FieldWrap>
              <Label htmlFor={field.name}>Datatype</Label>
              <DatatypeDropdown
                className="bg-background text-foreground"
                selectedId={field.state.value}
                setSelectedId={field.setValue}
              />
              {/* <Input */}
              {/*   className="bg-background text-foreground" */}
              {/*   name={field.name} */}
              {/*   value={field.state.value} */}
              {/*   onBlur={field.handleBlur} */}
              {/*   onChange={(e) => field.handleChange(e.target.value)} */}
              {/*   onClick={(e) => e.currentTarget.select()} */}
              {/* /> */}
            </FieldWrap>
          )}
        />
        <form.Field
          name="program"
          children={(field) => (
            <FieldWrap>
              <Label htmlFor={field.name}>Program</Label>
              <Input
                className="bg-background text-foreground"
                placeholder="Program"
                name={field.name}
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                onClick={(e) => e.currentTarget.select()}
              />
            </FieldWrap>
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <FieldWrap>
              <Label htmlFor={field.name}>Description</Label>
              <Textarea
                className="bg-background text-foreground"
                placeholder="Description"
                name={field.name}
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                onClick={(e) => e.currentTarget.select()}
              />
            </FieldWrap>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link to="/controllers/$controllerId" params={{ controllerId }}>
              Cancel
            </Link>
          </Button>
          <Button variant="outline" disabled>
            Check
          </Button>
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

const TagAddEditForm = ({ controllerId, tagId }: { controllerId?: string; tagId?: string }) => {
  if (tagId) return <EditForm tagId={tagId} />
  return <AddForm controllerId={controllerId ?? ''} />
}

export default TagAddEditForm
