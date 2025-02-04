import { createFileRoute } from '@tanstack/react-router'
import ScreenEditor from '@renderer/components/screeneditor/ScreenEditor'

export const Route = createFileRoute('/edit/$screenId')({
  component: RouteComponent
})

function RouteComponent() {
  return <ScreenEditor screenId={Route.useParams().screenId} />
}
