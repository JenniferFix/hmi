import { createFileRoute } from '@tanstack/react-router'
import ControllerEditor from '@renderer/components/controllereditor/ControllerEditor'

export const Route = createFileRoute('/controllers/$controllerId')({
  component: RouteComponent
})

function RouteComponent() {
  return <ControllerEditor controllerId={Route.useParams().controllerId} />
}
