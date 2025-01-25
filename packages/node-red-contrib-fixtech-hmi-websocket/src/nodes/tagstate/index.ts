import {
  Node,
  NodeAPI,
  NodeDef,
  NodeMessageInFlow,
  NodeInitializer,
  NodeMessage,
} from "node-red";
import { RED } from "../../globals";

interface TagNodeDef extends NodeDef {
  name: string;
  // Add any custom properties from config here if needed
}

interface TagNode extends Node {
  // on(event: "input", ca-llback: (msg: NodeMessageInFlow, send: (msg:NodeMessageInFlow)=>void, done: () => void) => void): void;
}

export default function (RED: NodeAPI) {
  function TagNode(this: TagNode, config: TagNodeDef) {
    RED.nodes.createNode(this, config);

    this.on("input", (msg: NodeMessageInFlow, send, done) => {
      try {
        if (typeof msg.payload === "string") {
          msg.payload = msg.payload.toLowerCase();
        }
        send(msg);
        done();
      } catch (err) {
        done(err as Error);
      }
    });
  }
  RED.nodes.registerType("tagstate", TagNode);
}
