import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { parseFrontmatter, validateRepository, validateSvg } from "../scripts/check.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("skill frontmatter is portable", () => {
  const fields = parseFrontmatter(readFileSync(resolve(root, "SKILL.md"), "utf8"));
  assert.equal(fields.name, "drop-your-dmg");
  assert.match(fields.description, /macOS/);
  assert.equal(fields.license, "MIT");
});

test("backgrounds and previews keep Finder content separate", () => {
  const base = '<svg width="1320" height="772" viewBox="0 0 660 386">';
  assert.deepEqual(validateSvg(`${base}</svg>`, false), []);
  assert.deepEqual(validateSvg(`${base}<g data-role="finder-item"/></svg>`, true), []);
  assert.match(validateSvg(`${base}<g data-role="finder-item"/></svg>`, false)[0], /background/);
});

test("repository architecture is valid", () => {
  assert.deepEqual(validateRepository(root), []);
});
