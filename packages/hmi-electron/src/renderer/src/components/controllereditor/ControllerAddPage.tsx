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
    <div className="w-full h-full flex items-center justify-center">
      <Card className="">
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
