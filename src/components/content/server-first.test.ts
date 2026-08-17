import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listSourceFiles(full);
    if (
      (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
      !entry.name.includes(".test.")
    ) {
      return [full];
    }
    return [];
  });
}

describe("content primitives", () => {
  it("does not introduce use client", () => {
    const files = [
      ...listSourceFiles(path.join(process.cwd(), "src/components/content")),
      ...listSourceFiles(path.join(process.cwd(), "src/content")),
      path.join(process.cwd(), "src/components/Breadcrumbs.tsx"),
      path.join(process.cwd(), "src/lib/contact.ts"),
      path.join(process.cwd(), "src/app/property-management-chennai/page.tsx"),
      path.join(process.cwd(), "src/app/nri-property-management-chennai/page.tsx"),
      path.join(process.cwd(), "src/app/tenant-management-chennai/page.tsx"),
    ];

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      expect(source, file).not.toMatch(/['"]use client['"]/);
    }
  });
});
