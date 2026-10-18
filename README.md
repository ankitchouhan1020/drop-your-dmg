<h1 align="center">Drop Your DMG</h1>

<p align="center"><strong>An Agent Skill for Pi, Claude Code and Codex that designs the installer from the product, then builds it.</strong><br>Three curated directions, one approved DMG, no visual editor.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/drop-your-dmg"><img src="https://img.shields.io/npm/v/drop-your-dmg?style=flat-square&color=1f201d" alt="npm version"></a>
  <a href="https://agentskills.io"><img src="https://img.shields.io/badge/Agent_Skills-compatible-1f201d?style=flat-square" alt="Agent Skills compatible"></a>
  <img src="https://img.shields.io/badge/platform-macOS-1f201d?style=flat-square" alt="macOS">
  <img src="https://img.shields.io/badge/dependencies-0-1f201d?style=flat-square" alt="No npm dependencies">
  <a href="https://github.com/ankitchouhan1020/drop-your-dmg/actions/workflows/ci.yml"><img src="https://github.com/ankitchouhan1020/drop-your-dmg/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <img src="https://img.shields.io/badge/license-MIT-1f201d?style=flat-square" alt="MIT">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ankitchouhan1020/drop-your-dmg/main/.github/assets/notion-installer.png" width="760" alt="A rendered Notion DMG concept preview with Notion on the left, Applications on the right and a quiet arrow between them."><br>
  <sub>Unofficial Notion concept preview—not a mounted Finder capture.</sub>
</p>

---

Most DMG builders start with an empty canvas. Drop Your DMG starts with the product.

It inspects the app, icon, screenshots, brand assets and release setup; creates three genuinely different installer directions; shows rendered concept previews; waits for a choice; refines one; then builds and verifies the disk image with [`create-dmg`](https://github.com/create-dmg/create-dmg).

## Install

| Agent | Global install | Skill location |
|---|---|---|
| **Pi** | `pi install npm:drop-your-dmg` | Pi package directory |
| **Claude Code** | `npx skills add ankitchouhan1020/drop-your-dmg -g -a claude-code -s drop-your-dmg -y` | `~/.claude/skills/drop-your-dmg` |
| **Codex** | `npx skills add ankitchouhan1020/drop-your-dmg -g -a codex -s drop-your-dmg -y` | `~/.agents/skills/drop-your-dmg` |

Install for both Claude Code and Codex in one command:

```sh
npx skills add ankitchouhan1020/drop-your-dmg \
  --skill drop-your-dmg \
  --agent claude-code codex \
  --global --yes
```

Omit `--global` for a project-only install. The open [`skills`](https://github.com/vercel-labs/skills) CLI discovers the root `SKILL.md` automatically.

## Quick start

Ask your agent:

```text
Design a DMG installer for this app. Show me three directions before you build it.
```

The skill inspects the product, shows exactly three curated previews, pauses for selection, refines only the chosen direction, then builds and verifies one DMG.

Invoke it directly when supported:

| Agent | Command |
|---|---|
| Pi | `/skill:drop-your-dmg` |
| Claude Code | `/drop-your-dmg` |
| Codex | `$drop-your-dmg` |

The final build requires macOS and `create-dmg`. The skill checks for it and asks before installing it with Homebrew.

## Example

Notion gets three curated directions from the same minimal brief:

<table>
  <tr>
    <td width="33%"><img src="https://raw.githubusercontent.com/ankitchouhan1020/drop-your-dmg/main/examples/notion/quiet-page-preview.svg" alt="Quiet Page Notion DMG concept preview"></td>
    <td width="33%"><img src="https://raw.githubusercontent.com/ankitchouhan1020/drop-your-dmg/main/examples/notion/block-path-preview.svg" alt="Block Path Notion DMG concept preview"></td>
    <td width="33%"><img src="https://raw.githubusercontent.com/ankitchouhan1020/drop-your-dmg/main/examples/notion/sidebar-shift-preview.svg" alt="Sidebar Shift Notion DMG concept preview"></td>
  </tr>
  <tr>
    <td><b>Quiet Page</b><br><sub>Calm and symmetrical</sub></td>
    <td><b>Block Path</b><br><sub>Dark and modular</sub></td>
    <td><b>Sidebar Shift</b><br><sub>Light and asymmetric</sub></td>
  </tr>
</table>

<sub>Unofficial workflow demonstration using Notion’s public app icon. Notion and its logo are trademarks of Notion Labs, Inc.</sub>

Rebuild and open the contact sheet:

```sh
npm run examples
open examples/notion/notion.html
```

## What it produces

Before selection:

- a short evidence-based product read;
- three named design directions;
- editable Retina background SVGs;
- separate previews with representative Finder items;
- explicit window, icon and coordinate values.

After selection:

- one refined background SVG and PNG;
- one reproducible `create-dmg` command or release script;
- one final DMG;
- integrity, mounted-content and Finder-presentation results;
- separate signing and notarization status.

It never paints fake app or Applications icons into the shipping background. Finder places the real items.

## How it works

1. **Inspect.** Read the product and release inputs without changing them.
2. **Direct.** Create three concepts that differ in layout and idea, not just color.
3. **Choose.** Stop for the user's selection, unless they explicitly delegate it.
4. **Refine.** Iterate only on the chosen direction.
5. **Build.** Render with macOS `sips` and package with `create-dmg`.
6. **Verify.** Run `hdiutil verify`, mount read-only, inspect contents and review the actual Finder window.
7. **Clean.** Remove rejected renders, test images and temporary staging before delivery.

## Requirements

| Requirement | Needed for | Notes |
|---|---|---|
| **macOS** | rendering, packaging and Finder verification | Required for the complete workflow |
| **A release `.app`** | final DMG | The skill verifies but does not repair its signature |
| **[`create-dmg`](https://github.com/create-dmg/create-dmg)** | final build | The skill asks before installing it with Homebrew |
| **Node.js** | `npx skills` installs and rebuilding examples | The skill itself has no npm runtime dependencies |

The complete instructions are in [`SKILL.md`](SKILL.md). Focused guidance lives under [`references/`](references), and evaluation cases under [`evals/`](evals).

<details>
<summary><b>Repository and development checks</b></summary>

<br>

```text
.
├── SKILL.md                 main workflow
├── references/              product, design, build and verification guidance
├── examples/notion/         three generated backgrounds and previews
├── evals/evals.json         behavioral evaluation cases
├── scripts/                 repository and rendering checks
└── tests/                   Node regression tests
```

```sh
npm run verify
./scripts/render-examples.sh
npm pack --dry-run
```

Generated PNGs go to ignored `shots/`.

</details>

## Limits

- DMG building and real Finder verification require macOS.
- A headless CI build cannot prove Finder presentation.
- The skill does not repair app signing, invent signing identities or claim notarization from a successful build.
- It does not replace the product's release pipeline; it adds the selected artwork and reproducible DMG step.

## Links

- [npm package](https://www.npmjs.com/package/drop-your-dmg)
- [source](https://github.com/ankitchouhan1020/drop-your-dmg)
- [report a bug](https://github.com/ankitchouhan1020/drop-your-dmg/issues/new?template=bug_report.yml)
- [request a design](https://github.com/ankitchouhan1020/drop-your-dmg/issues/new?template=design_request.yml)
- [changelog](CHANGELOG.md)

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md). Visual changes must rebuild the examples and include reviewed previews. Instruction changes should add or update an eval.

## License

[MIT](LICENSE)
