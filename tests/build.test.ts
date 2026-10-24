import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe.each(["chromium", "firefox"])("%s build", (target) => {
  it("содержит manifest и один content script", () => {
    const output = resolve("dist", target);
    const files = readdirSync(output).sort();

    expect(files).toEqual(["content-script.js", "manifest.json"]);
    expect(existsSync(resolve(output, "manifest.json"))).toBe(true);
    expect(readFileSync(resolve(output, "content-script.js"), "utf8")).not.toContain(
      "fetch("
    );
  });
});
