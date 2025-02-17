import { createFileRoute } from '@tanstack/react-router'
import AddControllerPage from '@renderer/components/controllereditor/ControllerAddPage'

type BackToPage = {
  from: string | undefined
}

export const Route = createFileRoute('/controllers/add')({
  component: RouteComponent
  // validateSearch: (search: Record<string, unknown>): BackToPage => {
  //   return {
  //     from: search.from as string | undefined
  //   }
  // }
})

function RouteComponent() {
  return <AddControllerPage />
}
