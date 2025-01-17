import { Node, NodeAPI, NodeDef, NodeMessageInFlow } from "node-red";

interface LowerCaseNodeDef extends NodeDef {
  // Add any custom properties from config here if needed
}

interface LowerCaseNode extends Node {
  on(event: "input", callback: (msg: NodeMessageInFlow) => void): void;
}

export = function (RED: NodeAPI) {
  function LowerCaseNode(this: LowerCaseNode, config: LowerCaseNodeDef) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", (msg: NodeMessageInFlow) => {
      if (typeof msg.payload === "string") {
        msg.payload = msg.payload.toLowerCase();
      }
      node.send(msg);
    });
  }

  RED.nodes.registerType("lower-case", LowerCaseNode);
};
