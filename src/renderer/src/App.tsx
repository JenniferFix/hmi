import Versions from './components/Versions'
import { Button } from '@renderer/components/ui/button'

function App(): React.ReactNode {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div><h1 className="text-xl">Hello World</h1>
        <Button variant="destructive">Hi</Button>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
