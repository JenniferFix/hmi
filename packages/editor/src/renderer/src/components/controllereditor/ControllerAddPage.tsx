import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import ControllerAddEditForm from './ControllerAddEditForm'

const AddControllerPage = React.memo(() => {
  return (
    <div className="grow w-full h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add Controller</CardTitle>
          <CardDescription>Add a new controller</CardDescription>
        </CardHeader>
        <CardContent>
          <ControllerAddEditForm />
        </CardContent>
      </Card>
    </div>
  )
})

export default AddControllerPage
