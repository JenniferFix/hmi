import * as RED from 'node-red'
import path from 'path'
import { app } from 'electron'

export async function startNodeRed() {
  const userDir = path.join(app.getPath('userData'), 'node-red')
  const settings = {
    httpAdminRoot: '/red',
    httpNodeRoot: '/api',
    userDir,
    flowFile: 'flows.json',
    editorTheme: {
      header: {
        title: 'JAHMI NODE RED'
      }
    },
    functionGlobalContext: {},
    port: 1880
  }

  return new Promise((resolve, reject) => {
    try {
      RED.init({}, settings)
      const server = RED.start()
      resolve(server)
    } catch (error) {
      reject(error)
    }
  })
}
