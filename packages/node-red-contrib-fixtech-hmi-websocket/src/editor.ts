import { EditorRED } from "node-red";
import { NodeType } from "./consts";

import WidgetStateEditor from "./nodes/widgetstate/editor";
import TagStateEditor from "./nodes/tagstate/editor";

declare const RED: EditorRED;

console.log("testing----------------------------");
RED.nodes.registerType(NodeType.WidgetState, WidgetStateEditor);
RED.nodes.registerType(NodeType.TagState, TagStateEditor);
