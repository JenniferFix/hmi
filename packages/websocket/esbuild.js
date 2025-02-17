import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  format: "esm",
  sourcemap: true,
  bundle: true,
});
