import { createFileRoute } from '@tanstack/react-router'
import Screen from '@renderer/components/Common/Screen'

export const Route = createFileRoute('/edit/$screenId')({
  component: RouteComponent
})

function RouteComponent() {
  return <Screen screenId={Route.useParams().screenId} />
}
