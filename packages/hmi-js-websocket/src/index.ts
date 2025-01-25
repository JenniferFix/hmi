import WebSocket from "ws";

let websocket: WebSocket;
/*
 * createConnection
 */

export function createConnection(url: string) {
  websocket = new WebSocket(url);
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

/*
subscribe
*/

/*
unsubscribe
*/
export const ws = () => {
  return websocket;
};
