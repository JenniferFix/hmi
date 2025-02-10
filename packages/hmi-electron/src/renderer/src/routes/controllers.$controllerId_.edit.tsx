import { createFileRoute } from '@tanstack/react-router'
import ControllerEditPage from '@renderer/components/controllereditor/ControllerEditPage'
import { controller } from '$/src/db/schema'

export const Route = createFileRoute('/controllers/$controllerId_/edit')({
  component: RouteComponent
})

function RouteComponent() {
  const { controllerId } = Route.useParams()
  return <ControllerEditPage controllerId={controllerId} />
}
