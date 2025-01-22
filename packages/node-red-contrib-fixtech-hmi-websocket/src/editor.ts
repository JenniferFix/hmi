import { EditorRED } from "node-red";
import { NodeType } from "./consts";

import WidgetStateEditor from "./nodes/widgetstate/editor";
// import tagEditor from "./nodes/tagstate/editor";

declare const RED: EditorRED;

RED.nodes.registerType(NodeType.WidgetState, WidgetStateEditor);
