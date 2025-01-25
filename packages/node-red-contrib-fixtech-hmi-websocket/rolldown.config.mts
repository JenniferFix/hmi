import { defineConfig } from "rolldown";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { NodeType } from "./src/consts.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Plugin to combine HTML files for Node-RED
function nodeRedEditorPlugin() {
  return {
    name: "node-red-html",
    async generateBundle(options, bundle) {
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

          return `<script type="text/html" data-template-name="${nodeType}">
${editorContent}
</script>
<script type="text/html" data-help-name="${nodeType}">
${helpContent}
</script>`;
        })
        .join("\n");

      const jsContent = `<script type="text/javascript">
${bundle["editor.js"].code || ""}
</script>`;

      const fullOutput = jsContent + "\n" + htmlContent;

      this.emitFile({
        type: "asset",
        fileName: "index.html",
        source: fullOutput,
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
      exports: "auto",
    },
  },
  {
    input: "src/editor.ts",
    platform: "browser",
    output: {
      dir: "dist",
      exports: "auto",
      format: "iife",
      sourcemap: true,
      name: "nodeRedEditor",
    },
    external: ["node-red"],
    plugins: [nodeRedEditorPlugin()],
  },
]);
