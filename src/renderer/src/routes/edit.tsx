import { createFileRoute } from '@tanstack/react-router'
import Editor from '@renderer/components/Editor/Editor'

export const Route = createFileRoute('/edit')({
  component: RouteComponent
})

function RouteComponent() {
  return <Editor />
}
