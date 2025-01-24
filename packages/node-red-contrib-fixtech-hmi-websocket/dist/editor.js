"use strict";

//#region src/consts.ts
let NodeType = function(NodeType$1) {
	NodeType$1["WidgetState"] = "widgetstate";
	NodeType$1["TagState"] = "tagstate";
	return NodeType$1;
}({});

//#endregion
//#region src/nodes/widgetstate/editor.ts
const WidgetStateEditor = {
	category: "HMI",
	color: "#cc11ff",
	inputs: 1,
	outputs: 0,
	label: function() {
		return this.name || "widgetstate";
	},
	paletteLabel: "Widget State",
	defaults: {
		name: { value: "" },
		server: { value: "" },
		widgetId: { value: "" }
	}
};
var editor_default$1 = WidgetStateEditor;

//#endregion
//#region src/nodes/tagstate/editor.ts
const TagStateEditor = {
	category: "HMI",
	color: "#9966ff",
	inputs: 1,
	outputs: 0,
	label: "TagState",
	defaults: {
		name: { value: "" },
		server: { value: "" },
		widgetId: { value: "" }
	}
};
var editor_default = TagStateEditor;

//#endregion
//#region src/editor.ts
console.log("testing----------------------------");
RED.nodes.registerType(NodeType.WidgetState, editor_default$1);
RED.nodes.registerType(NodeType.TagState, editor_default);

//#endregion
//# sourceMappingURL=editor.js.map