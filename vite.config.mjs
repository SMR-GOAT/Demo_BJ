import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));
const pages = readdirSync(root).filter((file) => file.endsWith(".html"));

export default defineConfig({
  build: {
    rollupOptions: {
      input: pages.map((file) => resolve(root, file)),
    },
  },
  plugins: [
    {
      name: "copy-classic-scripts",
      // Classic scripts share globals and must retain their paths and load order.
      generateBundle() {
        for (const file of ["app.js", "script.js", "i18n.js", "components/sidebar.js"]) {
          this.emitFile({
            type: "asset",
            fileName: file,
            source: readFileSync(resolve(root, file)),
          });
        }
      },
    },
  ],
});
