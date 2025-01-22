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
  label: "WidgetState",

  defaults: {
    server: { value: "" },
    widgetId: { value: "" },
  },
};

export default WidgetStateEditor;
