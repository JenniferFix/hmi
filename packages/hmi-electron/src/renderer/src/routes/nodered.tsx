import { createFileRoute } from '@tanstack/react-router'
import NodeRedEditor from '@renderer/components/nodered/NodeRedEditor'

export const Route = createFileRoute('/nodered')({
  component: RouteComponent
})

function RouteComponent() {
  return <NodeRedEditor />
}
