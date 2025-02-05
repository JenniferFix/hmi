import { createFileRoute } from '@tanstack/react-router'
import TagEditor from '@renderer/components/controllereditor/TagEditor'

export const Route = createFileRoute('/controllers')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TagEditor />
}
