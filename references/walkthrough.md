# Walkthrough: Orbit Notes

`examples/orbit-notes/` shows the concept stage for a fictional spatial notes app. It demonstrates the expected artifacts and review flow, not a reusable visual template.

## 1. Product read

- **Purpose:** capture notes and connect them spatially.
- **Audience:** designers, researchers and writers.
- **Character:** calm, celestial, precise.
- **Palette:** near-black, muted lavender, warm paper and cobalt.
- **Motifs:** orbits, connected points, paper cards and paths.
- **Avoid:** loud gaming neon, dense dashboards and generic productivity blue.

## 2. Three directions

### Quiet Orbit

A dark, restrained field carries the product's spatial metaphor through two orbit rings and a curved dotted path. It is the closest match to a dark product interface.

### Paper Trail

A warm editorial sheet turns installation into moving a note across a ruled workspace. It serves users who know the product from its writing experience rather than its dark UI.

### Signal Bloom

A vivid violet field and translucent panel make the installer feel like a launch moment. It is the expressive option, with the product icon remaining the strongest object.

The layouts, materials and hierarchy differ. They are not palette variants.

## 3. Artifact separation

Each direction has:

- `*-background.svg`: shipping artwork only;
- `*-preview.svg`: the same artwork plus elements marked `data-role="finder-item"`;
- a card in `orbit-notes.html`.

The background files never include the fake app icon, Applications folder or Finder labels.

## 4. Selection

A good presentation would say:

1. **Quiet Orbit** — strongest match to the product UI.
2. **Paper Trail** — warmer and more editorial.
3. **Signal Bloom** — boldest launch experience.

Then stop and ask for one direction. If the user chooses Quiet Orbit but asks for Paper Trail's typography, revise Quiet Orbit only.

## 5. Build

The example has no real app, so it does not ship a fake DMG. With an actual app, render the selected background using `sips`, run the command in `references/build.md`, and complete every check in `references/verify.md`.

This is deliberate: examples may demonstrate design artifacts, but only a real signed app can produce a release artifact.
