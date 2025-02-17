import * as React from 'react'
import ControllerAddEditForm from './ControllerAddEditForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'

const ControllerEditPage = ({ controllerId }: { controllerId: string }) => {
  return (
    <div className="grow w-full h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Edit Controller</CardTitle>
          <CardDescription>Change the controller settings</CardDescription>
        </CardHeader>
        <CardContent>
          <ControllerAddEditForm controllerId={controllerId} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ControllerEditPage
