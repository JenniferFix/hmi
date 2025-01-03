import { createFileRoute } from '@tanstack/react-router'
import ScreenEditor from '@renderer/components/ScreenEditor/ScreenEditor'

export const Route = createFileRoute('/edit/$screenId')({
  component: RouteComponent
})

function RouteComponent() {
  return <ScreenEditor screenId={Route.useParams().screenId} />
}
