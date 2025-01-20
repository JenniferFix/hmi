import {
  Node,
  NodeAPI,
  NodeDef,
  NodeMessageInFlow,
  NodeInitializer,
  NodeMessage,
} from "node-red";
import { RED } from "../../globals";

interface WidgetNodeDef extends NodeDef {
  // Add any custom properties from config here if needed
}

interface WidgetNode extends Node {
  // on(event: "input", ca-llback: (msg: NodeMessageInFlow, send: (msg:NodeMessageInFlow)=>void, done: () => void) => void): void;
}

function WidgetNode(this: WidgetNode, config: WidgetNodeDef) {
  RED.nodes.createNode(this, config);
  const node = this;

  node.on("input", (msg: NodeMessageInFlow, send) => {
    if (typeof msg.payload === "string") {
      msg.payload = msg.payload.toLowerCase();
    }
    node.send(msg);
  });
}

export default WidgetNode;
