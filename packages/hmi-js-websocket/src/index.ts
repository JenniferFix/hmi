import WebSocket from "ws";

/*
 * createConnection
 */

export function createConnection(url: string) {
  return new WebSocket(url);
}

/*
 * connect
 */

/*
disconnect
*/

export function disconnect(ws: WebSocket) {
  ws.close();
}
