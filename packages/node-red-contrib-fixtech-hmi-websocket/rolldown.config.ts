import { defineConfig } from "rolldown";
import { readFileSync } from "fs";
import { join } from "path";
import { NodeType } from "./src/consts";

// Plugin to combine HTML files for Node-RED
function nodeRedEditorPlugin() {
  return {
    name: "node-red-html",
    async generateBundle() {
      const editorTs = join(__dirname, "src", "editor.ts");
      // const editorContent = readFileSync(editorTs, "utf-8");
      // console.log(editorContent);
      // const editorResult = await this.transform(editorContent, editorTs);
      // console.log(editorResult);

      const htmlContent = Object.values(NodeType)
        .map((nodeType) => {
          const editorPath = join(
            __dirname,
            "src",
            "nodes",
            nodeType,
            "editor.html",
          );
          const helpPath = join(
            __dirname,
            "src",
            "nodes",
            nodeType,
            "help.html",
          );

          const editorContent = readFileSync(editorPath, "utf-8");
          const helpContent = readFileSync(helpPath, "utf-8");

          return `
<script type="text/html" data-template-name="${nodeType}">
${editorContent}
</script>
<script type="text/html" data-help-name="${nodeType}">
${helpContent}
</script>`;
        })
        .join("\n");

      // const editorJs = await this.emitFile({
      //   type: "chunk",
      //   id: "src/editor.ts",
      //   name: "editor",
      // });

      // const outContent = editorJs + "\n" + htmlContent;

      this.emitFile({
        type: "asset",
        fileName: "index.html",
        source: htmlContent,
      });
    },
  };
}

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
      exports: "default",
    },
    external: ["node-red"],
    plugins: [nodeRedEditorPlugin()],
  },
  {
    input: "src/editor.ts",
    platform: "browser",
    output: {
      dir: "dist",
      format: "iife",
      sourcemap: true,
    },
  },
]);
