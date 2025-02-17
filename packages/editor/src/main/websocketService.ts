import WebSocket, { WebSocketServer } from 'ws'

const wsServer = new WebSocketServer({ port: 8080 })

export function getWsServer() {
  return wsServer
}

export function startWebsocketServer() {
  wsServer.on('connection', (ws) => {
    console.log('Client connected', ws)
    ws.on('error', console.error)
    ws.on('message', (data) => {
      console.log('Received message', data)
    })
    // ws.send('something');
  })
}
