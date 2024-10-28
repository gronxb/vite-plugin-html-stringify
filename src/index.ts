import fs from "fs";

import type { Plugin } from "vite";

const handleHtml = (content: string, mode: "esm" | "cjs") => {
  switch (mode) {
    case "esm":
      return `export default ${JSON.stringify(content)}`;
    case "cjs":
      return `module.exports = ${JSON.stringify(content)}`;
  }
};

export function viteHtmlStringify({
  output,
  mode = "esm",
}: {
  output: string;
  mode?: "esm" | "cjs";
}): Plugin {
  return {
    name: "vite:html-stringify",
    enforce: "post",
    generateBundle(_, bundle) {
      for (const [fileName, assetInfo] of Object.entries(bundle)) {
        if (
          fileName.endsWith(".html") &&
          "source" in assetInfo &&
          typeof assetInfo.source === "string"
        ) {
          const outputContent = handleHtml(assetInfo.source, mode);
          fs.writeFileSync(output, outputContent);
          console.log(`Generated single string file at: ${output}`);
        }
      }
    },
  };
}
