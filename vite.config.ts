import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const target = mode === "firefox" ? "firefox" : "chromium";

  return {
    publicDir: resolve(import.meta.dirname, "manifests", target),
    build: {
      copyPublicDir: true,
      emptyOutDir: true,
      outDir: resolve(import.meta.dirname, "dist", target),
      lib: {
        entry: resolve(import.meta.dirname, "src", "content.ts"),
        formats: ["iife"],
        name: "LegalAiCompanion",
        fileName: () => "content-script.js"
      },
      minify: false
    },
    test: {
      environment: "jsdom",
      environmentOptions: {
        jsdom: { url: "https://example.test/" }
      },
      restoreMocks: true
    }
  };
});
