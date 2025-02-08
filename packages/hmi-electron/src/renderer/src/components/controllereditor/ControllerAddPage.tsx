import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'

const AddControllerPage = React.memo(() => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add Controller</CardTitle>
          <CardDescription>Add a new controller</CardDescription>
        </CardHeader>
        <CardContent>Add here</CardContent>
      </Card>
    </div>
  )
})

export default AddControllerPage
