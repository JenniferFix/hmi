import { createFileRoute } from '@tanstack/react-router'
import ControllerTags from '@renderer/components/controllereditor/ControllerTags'

export const Route = createFileRoute('/controllers/$controllerId')({
  component: RouteComponent
})

function RouteComponent() {
  return <ControllerTags controllerId={Route.useParams().controllerId} />
}
