import * as React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter
} from '@renderer/components/ui/card'
import { Button } from '@renderer/components/ui/button'
import { useForm } from '@tanstack/react-form'
import TagAddEditForm from './TagAddEditForm'

const TagAddToControllerPage = React.memo(({ controllerId }: { controllerId: string }) => {
  const form = useForm({
    defaultValues: {
      name: ''
    }
  })
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add Tag</CardTitle>
          <CardDescription>Adds tag to selected controller</CardDescription>
        </CardHeader>
        <CardContent>
          <TagAddEditForm />
        </CardContent>
      </Card>
    </div>
  )
})

export default TagAddToControllerPage
