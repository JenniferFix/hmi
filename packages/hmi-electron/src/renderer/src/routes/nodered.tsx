import { createFileRoute } from '@tanstack/react-router'
import NodeRedEditor from '@renderer/components/NodeRED/NodeRedEditor'

export const Route = createFileRoute('/nodered')({
  component: RouteComponent
})

function RouteComponent() {
  return <NodeRedEditor />
}
