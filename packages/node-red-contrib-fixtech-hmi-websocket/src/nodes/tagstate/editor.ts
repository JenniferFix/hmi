import { EditorNodeDef, EditorNodeProperties, EditorRED } from "node-red";
declare const RED: EditorRED;

interface TagStateEditorNodeProperties extends EditorNodeProperties {
  server: string;
  widgetId: string;
}

const TagStateEditor: EditorNodeDef<TagStateEditorNodeProperties> = {
  category: "HMI",
  color: "#9966ff",
  inputs: 1,
  outputs: 0,
  label: "TagState",

  defaults: {
    server: { value: "" },
    widgetId: { value: "" },
  },
};

export default TagStateEditor;
