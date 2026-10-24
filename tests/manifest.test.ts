import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Manifest = Record<string, unknown> & {
  content_scripts: Array<Record<string, unknown> & { matches: string[] }>;
};

function readManifest(target: "chromium" | "firefox"): Manifest {
  return JSON.parse(
    readFileSync(resolve("manifests", target, "manifest.json"), "utf8")
  ) as Manifest;
}

describe.each(["chromium", "firefox"] as const)("%s manifest", (target) => {
  it("ограничен точным HTTPS-доменом ГАРАНТа", () => {
    const manifest = readManifest(target);

    expect(manifest.content_scripts).toHaveLength(1);
    expect(manifest.content_scripts[0].matches).toEqual([
      "https://internet.garant.ru/*"
    ]);
    expect(manifest.content_scripts[0].all_frames).toBe(false);
  });

  it("не запрашивает разрешения и не запускает фоновые процессы", () => {
    const manifest = readManifest(target);
    const serialized = JSON.stringify(manifest).toLowerCase();

    expect(manifest).not.toHaveProperty("permissions");
    expect(manifest).not.toHaveProperty("host_permissions");
    expect(manifest).not.toHaveProperty("background");
    expect(serialized).not.toContain("openai");
    expect(serialized).not.toContain("oauth");
  });
});

it("Firefox декларирует отсутствие сбора данных", () => {
  const manifest = readManifest("firefox");

  expect(manifest).toMatchObject({
    browser_specific_settings: {
      gecko: {
        id: "legal-ai-companion@snetkov.ru",
        strict_min_version: "115.0",
        data_collection_permissions: { required: ["none"] }
      }
    }
  });
});
