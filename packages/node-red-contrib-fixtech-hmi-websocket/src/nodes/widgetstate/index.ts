import {
  Node,
  NodeAPI,
  NodeDef,
  NodeMessageInFlow,
  NodeInitializer,
  NodeMessage,
} from "node-red";
import { RED } from "../../globals";
import { type NodeConfig } from "../../types";

interface WidgetNodeDef extends NodeDef {
  name: string;
  // Add any custom properties from config here if needed
}

interface WidgetNode extends Node {
  // on(event: "input", ca-llback: (msg: NodeMessageInFlow, send: (msg:NodeMessageInFlow)=>void, done: () => void) => void): void;
}

export const config: NodeConfig = {
  category: "hmi",
  color: "#a6bbcf",
  inputs: 1,
  outputs: 1,
  icon: "file.svg",
  label: "wigetstate",
};

export default function (RED: NodeAPI) {
  function WidgetNode(this: WidgetNode, config: WidgetNodeDef) {
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
  RED.nodes.registerType("widgetstate", WidgetNode);
}
