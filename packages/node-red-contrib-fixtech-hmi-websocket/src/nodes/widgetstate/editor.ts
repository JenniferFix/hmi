import { EditorNodeDef, EditorNodeProperties, EditorRED } from "node-red";
declare const RED: EditorRED;

interface WidgetStateEditorNodeProperties extends EditorNodeProperties {
  server: string;
  widgetId: string;
}

const WidgetStateEditor: EditorNodeDef<WidgetStateEditorNodeProperties> = {
  category: "HMI",
  color: "#cc11ff",
  inputs: 1,
  outputs: 0,
  label: function () {
    return this.name || "widgetstate";
  },
  paletteLabel: "Widget State",
  defaults: {
    name: { value: "" },
    server: { value: "" },
    widgetId: { value: "" },
  },
};

export default WidgetStateEditor;
