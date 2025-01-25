import * as esbuild from "esbuild";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const Nodes = ["widgetstate", "tagstate"];

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function generateNodeRedHTML(jsContent) {
  const htmlContent = Nodes.map((nodeType) => {
    const editorPath = join(__dirname, "src", "nodes", nodeType, "editor.html");
    const helpPath = join(__dirname, "src", "nodes", nodeType, "help.html");
    const editorContent = readFileSync(editorPath, "utf-8");
    const helpContent = readFileSync(helpPath, "utf-8");
    return `<script type="text/html" data-template-name="${nodeType}">
${editorContent}
</script>
<script type="text/html" data-help-name="${nodeType}">
${helpContent}
</script>`;
  }).join("\n");
  const jsWrapper = `<script type="text/javascript">
${jsContent}
</script>`;

  return jsWrapper + "\n" + htmlContent;
}

await esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  format: "cjs",
  sourcemap: true,
  bundle: true,
});

const result = await esbuild.build({
  entryPoints: ["src/editor.ts"],
  outfile: "dist/editor.js",
  format: "iife",
  //   sourcemap: true,
  bundle: true,
  globalName: "nodeRedEditor",
  write: false,
});

const jsContent = new TextDecoder().decode(result.outputFiles[0].contents);

const htmlContent = generateNodeRedHTML(jsContent);

writeFileSync(join(__dirname, "dist", "index.html"), htmlContent);
