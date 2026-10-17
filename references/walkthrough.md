# Walkthrough: Notion

`examples/notion/` shows the concept stage for Notion. It demonstrates the expected artifacts and review flow, not an official installer or a reusable visual template.

## 1. Product read

- **Purpose:** combine documents, knowledge, projects and collaboration in one workspace.
- **Audience:** individuals and teams organizing work and knowledge.
- **Character:** clear, editorial, modular.
- **Palette:** black, white and warm neutral gray.
- **Motifs:** pages, blocks and the workspace sidebar.
- **Selected cues:** one folded page, one block path or one sidebar edge.
- **Avoid:** colorful gradients, dense editor replicas and ornamental productivity graphics.

## 2. Three directions

### Quiet Page

A warm white field and one folded corner carry Notion’s page metaphor. The Finder items remain symmetrical and dominant.

### Block Path

A dark field uses three quiet blocks as the installation path. The app begins lower and Applications finishes higher, making the composition distinct without adding noise.

### Sidebar Shift

A single pale sidebar anchors an asymmetric light field. The app begins higher and the destination finishes lower while both labels remain inside the safe zone.

The fields, icon arrangements and product cues differ. They are not palette variants, and none is more decorative than the others.

## 3. Artifact separation

Each direction has:

- `*-background.svg`: shipping artwork only;
- `*-preview.svg`: the same artwork plus elements marked `data-role="finder-item"`;
- one card in `notion.html`.

The Notion icon is embedded only in previews so `sips` can render them without resolving an external PNG. Background files never contain the app icon, Applications folder or Finder labels.

## 4. Selection

Present only the three curated previews:

1. **Quiet Page** — calmest and most immediately Notion-like.
2. **Block Path** — strongest modular interpretation.
3. **Sidebar Shift** — clearest asymmetric alternative.

Then stop and ask for one direction. If the user combines ideas, revise only the selected direction and show one updated preview.

## 5. Build

The example has no release app, so it does not ship a fake DMG. With an actual app, render the approved background, follow `references/build.md`, and complete every check in `references/verify.md`.
