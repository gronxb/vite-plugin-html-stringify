# vite-plugin-html-stringify

Converts index.html into a string, transforming it into a file that can be read in code.

For example, if your index.html contains the following:

```html
<div>Hello</div>
```

It will be transformed into the following at the output path, and a file will be generated:

```ts
export default "<div>Hello</div>";
```

## Motivation

This plugin is intended to inject static web content into `react-native-webview`. After setting up a typical web app, you can create a single HTML file using `vite-plugin-singlefile`, wrap the HTML in a string, and inject it into the webview.

## Usage

```sh
> pnpm add vite-plugin-html-stringify -D # or npm, yarn
```

- vite.config.ts (for react)

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile"; // recommend

export default defineConfig({
  root: "./web",
  plugins: [
    react(),
    viteSingleFile({
      deleteInlinedFiles: true,
      removeViteModuleLoader: true,
    }),
    viteHtmlStringify({
      output: "./html.ts",
    }),
  ],
});
```

- react-native-webview

```tsx
import html from "./html";

<WebView
  ref={webviewRef}
  source={
    __DEV
      ? {
          uri: "http://localhost:5173",
        }
      : {
          html: html,
        }
  }
  style={{ height: "50%", width: "100%" }}
/>;
```
