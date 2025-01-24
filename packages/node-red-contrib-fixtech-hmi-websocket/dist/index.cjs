"use strict";

//#region src/consts.ts
let NodeType = function(NodeType$1) {
	NodeType$1["WidgetState"] = "widgetstate";
	NodeType$1["TagState"] = "tagstate";
	return NodeType$1;
}({});

//#endregion
//#region src/globals.ts
let RED;
function setRED(val) {
	RED = val;
}

//#endregion
//#region src/nodes/widgetstate/index.ts
function widgetstate_default(RED$1) {
	function WidgetNode(config) {
		RED$1.nodes.createNode(this, config);
		this.on("input", (msg, send, done) => {
			try {
				if (typeof msg.payload === "string") msg.payload = msg.payload.toLowerCase();
				send(msg);
				done();
			} catch (err) {
				done(err);
			}
		});
	}
	RED$1.nodes.registerType("widgetstate", WidgetNode);
}

//#endregion
//#region src/nodes/tagstate/index.ts
function tagstate_default(RED$1) {
	function TagNode(config) {
		RED$1.nodes.createNode(this, config);
		this.on("input", (msg, send, done) => {
			try {
				if (typeof msg.payload === "string") msg.payload = msg.payload.toLowerCase();
				send(msg);
				done();
			} catch (err) {
				done(err);
			}
		});
	}
	RED$1.nodes.registerType("tagstate", TagNode);
}

//#endregion
//#region src/index.ts
const nodes = {
	[NodeType.WidgetState]: widgetstate_default,
	[NodeType.TagState]: tagstate_default
};
var src_default = async (RED$1) => {
	setRED(RED$1);
	let type;
	console.log(widgetstate_default);
	for (type in nodes) {
		console.log("registering type", type, nodes[type]);
		RED$1.nodes.registerType(type, nodes[type]);
	}
};

//#endregion
module.exports = src_default;
//# sourceMappingURL=index.cjs.map