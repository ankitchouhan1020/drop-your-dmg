# Contributing

Drop Your DMG is an instruction set, references, examples and checks. Changes should make an agent's output more product-specific, safer or easier to verify.

## Setup

Requirements:

- Node.js 20 or later;
- macOS for `sips`, `hdiutil` and real DMG checks;
- `create-dmg` only when testing an actual disk-image build.

No npm dependencies are required.

## Checks

Run:

```sh
npm run verify
npm pack --dry-run
```

On macOS:

```sh
./scripts/render-examples.sh
```

Open every changed preview and inspect it. A command passing does not establish visual quality.

## Changing the skill

Keep `SKILL.md` direct and operational. Put detailed procedures in `references/` and link them from the skill.

When behavior changes:

1. update the relevant instruction or reference;
2. add or update an eval in `evals/evals.json`;
3. update an example when the artifact shape changes;
4. add a changelog entry.

The frontmatter description controls discovery. It must say what the skill does and when it should load.

## Changing examples

Each example directory contains:

- `README.md`;
- `build.mjs`;
- generated background SVGs;
- generated preview SVGs;
- a reviewable HTML page when several directions belong together.

Shipping backgrounds must not contain `data-role="finder-item"`. Previews must contain it. SVGs use a 1320 × 772 output size and a `0 0 660 386` logical viewBox unless the example documents a deliberate exception.

After rebuilding, `git status --short` should show only intentional changes.

## Pull requests

- Keep one coherent change per pull request.
- Explain the user-visible behavior.
- Include screenshots for visual changes.
- List the checks you ran.
- Update `CHANGELOG.md`.
- Never include real signing credentials, private app bundles or proprietary brand assets.
