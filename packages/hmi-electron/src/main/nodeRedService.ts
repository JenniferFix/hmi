import * as RED from 'node-red'
import path from 'path'
import { app } from 'electron'
import * as http from 'http'
import express from 'express'
import { type LocalSettings } from '@node-red/runtime'

export async function startNodeRed() {
  const userDir = path.join(app.getPath('userData'), 'node-red')
  const settings: LocalSettings = {
    httpAdminRoot: '/red',
    httpNodeRoot: '/api',
    userDir,
    flowFile: 'flows.json',
    // editorTheme: {
    //   header: {
    //     title: 'JAHMI NODE RED'
    //   }
    // },
    functionGlobalContext: {},
    uiHost: 'localhost',
    uiPort: 1880
  }

  return new Promise((resolve, reject) => {
    try {
      const expressApp = express()
      const httpserver = http.createServer(expressApp)
      RED.init(httpserver, settings)
      expressApp.use(settings.httpNodeRoot as string, RED.httpNode)
      expressApp.use(settings.httpAdminRoot as string, RED.httpAdmin)
      RED.start().then(() => {
        // start
        httpserver.listen(settings.uiPort, () => {
          console.log(`Node-RED running on port ${settings.uiPort}`)
        })
      })
      resolve(httpserver)
    } catch (error) {
      reject(error)
    }
  })
}
