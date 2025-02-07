import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "lib/index.js",
  format: "esm",
  sourcemap: true,
  bundle: true,
});
