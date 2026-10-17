import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return {};
  return Object.fromEntries(match[1].split("\n").flatMap((line) => {
    const field = line.match(/^([a-z][a-z0-9-]*):\s*(.*)$/);
    return field ? [[field[1], field[2].replace(/^["']|["']$/g, "")]] : [];
  }));
}

export function validateSvg(svg, preview) {
  const errors = [];
  if (!/width="1320"/.test(svg)) errors.push("width must be 1320");
  if (!/height="772"/.test(svg)) errors.push("height must be 772");
  if (!/viewBox="0 0 660 386"/.test(svg)) errors.push("viewBox must be 0 0 660 386");
  const hasFinderItems = /data-role="finder-item"/.test(svg);
  if (preview && !hasFinderItems) errors.push("preview must include finder-item content");
  if (!preview && hasFinderItems) errors.push("background must not include finder-item content");
  return errors;
}

export function validateLocalReferences(file) {
  const text = readFileSync(file, "utf8");
  const errors = [];
  for (const match of text.matchAll(/(?:src|href)=["']([^"']+)["']|\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g)) {
    const reference = match[1] ?? match[2];
    if (/^[a-z][a-z0-9+.-]*:/i.test(reference) || reference.startsWith("#")) continue;
    const path = reference.split(/[?#]/, 1)[0];
    if (!existsSync(resolve(dirname(file), decodeURIComponent(path)))) errors.push(`broken local reference: ${path}`);
  }
  return errors;
}

export function validateRepository(root) {
  const errors = [];
  const skillPath = join(root, "SKILL.md");
  if (!existsSync(skillPath)) return ["SKILL.md is missing"];
  const skill = readFileSync(skillPath, "utf8");
  for (const error of validateLocalReferences(join(root, "README.md"))) errors.push(`README.md: ${error}`);
  const frontmatter = parseFrontmatter(skill);
  if (frontmatter.name !== "drop-your-dmg") errors.push("skill name must be drop-your-dmg");
  if (!frontmatter.description) errors.push("skill description is missing");
  if ((frontmatter.description ?? "").length > 1024) errors.push("skill description exceeds 1024 characters");
  if (!frontmatter.compatibility) errors.push("skill compatibility is missing");

  for (const match of skill.matchAll(/`(references\/[^`]+\.md)`/g)) {
    if (!existsSync(join(root, match[1]))) errors.push(`missing referenced file: ${match[1]}`);
  }

  const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  if (packageJson.name !== "drop-your-dmg") errors.push("npm package name must be drop-your-dmg");
  if (!packageJson.pi?.skills?.includes("./SKILL.md")) errors.push("package.json must expose ./SKILL.md");
  if (!packageJson.keywords?.includes("pi-package")) errors.push("package.json must include the pi-package keyword");

  const evals = JSON.parse(readFileSync(join(root, "evals/evals.json"), "utf8"));
  if (evals.skill_name !== "drop-your-dmg") errors.push("eval skill_name must be drop-your-dmg");
  if (!Array.isArray(evals.evals) || evals.evals.length < 8) errors.push("at least eight evals are required");
  const ids = new Set();
  for (const entry of evals.evals ?? []) {
    if (ids.has(entry.id)) errors.push(`duplicate eval id: ${entry.id}`);
    ids.add(entry.id);
    if (!entry.prompt?.trim()) errors.push(`eval ${entry.id} has no prompt`);
    if (!entry.expected_output?.trim()) errors.push(`eval ${entry.id} has no expected_output`);
    if (!Array.isArray(entry.files)) errors.push(`eval ${entry.id} files must be an array`);
  }

  const examplesRoot = join(root, "examples");
  const exampleDirs = readdirSync(examplesRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  if (exampleDirs.length === 0) errors.push("at least one example is required");
  for (const entry of exampleDirs) {
    const dir = join(examplesRoot, entry.name);
    for (const required of ["README.md", "build.mjs"]) {
      if (!existsSync(join(dir, required))) errors.push(`examples/${entry.name}/${required} is missing`);
    }
    for (const error of validateLocalReferences(join(dir, "README.md"))) errors.push(`examples/${entry.name}/README.md: ${error}`);
    const artifacts = readdirSync(dir).filter((name) => name.endsWith("-background.svg") || name.endsWith("-preview.svg"));
    if (artifacts.some((name) => name.startsWith("undefined-"))) errors.push(`examples/${entry.name} contains an undefined artifact`);
    const backgrounds = artifacts.filter((name) => name.endsWith("-background.svg")).map((name) => name.replace("-background.svg", ""));
    const previews = artifacts.filter((name) => name.endsWith("-preview.svg")).map((name) => name.replace("-preview.svg", ""));
    if (backgrounds.sort().join() !== previews.sort().join()) errors.push(`examples/${entry.name} backgrounds and previews do not match`);
    for (const file of artifacts) {
      for (const error of validateSvg(readFileSync(join(dir, file), "utf8"), file.endsWith("-preview.svg"))) {
        errors.push(`examples/${entry.name}/${file}: ${error}`);
      }
    }
  }
  return errors;
}

const thisFile = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === thisFile) {
  const root = resolve(dirname(thisFile), "..");
  const errors = validateRepository(root);
  if (errors.length) {
    for (const error of errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
  } else {
    console.log("drop-your-dmg checks passed");
  }
}
