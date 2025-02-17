import { createFileRoute } from '@tanstack/react-router'
import TagAddToControllerPage from '@renderer/components/controllereditor/TagAddToControllerPage'

export const Route = createFileRoute('/controllers/$controllerId_/addtag')({
  component: RouteComponent
})

function RouteComponent() {
  const { controllerId } = Route.useParams()
  return <TagAddToControllerPage controllerId={controllerId} />
}
