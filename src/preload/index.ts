import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  database: {
    query: async (sql: string, params?: any[]) => {
      return await ipcRenderer.invoke('database:query', { sql, params })
    },
    mutate: async (sql: string, params?: any[]) => {
      return await ipcRenderer.invoke('database:mutate', { sql, params })
    },
    batch: async (operations: { sql: string; params?: any[] }[]) => {
      return await ipcRenderer.invoke('database:batch', operations)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
