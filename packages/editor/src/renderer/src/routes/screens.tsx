import { createFileRoute } from '@tanstack/react-router'
import Editor from '@renderer/components/screeneditor/Editor'

export const Route = createFileRoute('/screens')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Editor />
}
