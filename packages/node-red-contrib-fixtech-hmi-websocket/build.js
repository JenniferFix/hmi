import esbuild from "esbuild";
import { copyFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isWatch = process.argv.includes("--watch");

async function copyNodeFiles() {
  // Ensure dist/nodes directory exists
  const nodesDistDir = join(__dirname, "dist", "nodes");
  if (!existsSync(nodesDistDir)) {
    await mkdir(nodesDistDir, { recursive: true });
  }

  // Copy HTML files
  await copyFile(
    join(__dirname, "src", "nodes", "widgetstate", "widget.html"),
    join(nodesDistDir, "widget.html"),
  );
}

async function build() {
  try {
    const ctx = await esbuild.context({
      entryPoints: ["src/index.ts"],
      bundle: true,
      outdir: "dist",
      platform: "node",
      format: "cjs",
      target: "node18",
      sourcemap: true,
      external: ["node-red"], // Don't bundle node-red
      plugins: [],
    });

    if (isWatch) {
      await ctx.watch();
      console.log("Watching for changes...");
    } else {
      await ctx.rebuild();
      await ctx.dispose();
    }

    await copyNodeFiles();
    console.log("Build completed successfully");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
