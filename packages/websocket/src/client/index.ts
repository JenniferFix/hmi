import WebSocket from "ws";
import { Message, ServerMessage, ClientMessage } from "../shared/types";
import { serializeMessage, deserializeMessage } from "../shared/protocol";

export class Client {
  private ws: WebSocket;
  private subscriptions = new Set<string>();

  constructor(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (event) => this.handleMessage(event);
  }

  private handleMessage(event: MessageEvent) {
    //
  }
}
