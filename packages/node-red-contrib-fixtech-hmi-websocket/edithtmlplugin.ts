import { rolldown } from "rolldown";

const editorhtml = await rolldown({
  input: "src/editor.ts",
});
