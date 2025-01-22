import { NodeAPI } from "node-red";

import { NodeType } from "./consts";
import { setRED } from "./globals";
import widgetNode from "./nodes/widgetstate";
import tagNode from "./nodes/tagstate";

const nodes: Record<NodeType, any> = {
  [NodeType.WidgetState]: widgetNode,
  [NodeType.TagState]: tagNode,
};

export default async (RED: NodeAPI): Promise<void> => {
  setRED(RED);

  let type: NodeType;
  for (type in nodes) {
    RED.nodes.registerType(type, nodes[type]);
  }
};
