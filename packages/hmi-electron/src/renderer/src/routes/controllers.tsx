import { createFileRoute } from '@tanstack/react-router'
import Controllers from '@renderer/components/controllereditor/ControllersPage'

export const Route = createFileRoute('/controllers')({
  component: RouteComponent
})

function RouteComponent() {
  return <Controllers />
}
