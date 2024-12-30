import { ElectronAPI } from '@electron-toolkit/preload'
import { IDatabase } from '../types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      database: IDatabase
    }
  }
}
