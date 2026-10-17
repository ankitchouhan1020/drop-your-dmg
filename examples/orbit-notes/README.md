# Orbit Notes example

Three installer directions for a fictional spatial notes app:

1. **Quiet Orbit** — dark and restrained.
2. **Paper Trail** — warm and editorial.
3. **Signal Bloom** — vivid and expressive.

This example demonstrates the concept gate: inspect one product, create three genuinely different directions, present all three, then stop for selection.

## Build

```sh
node examples/orbit-notes/build.mjs
open examples/orbit-notes/orbit-notes.html
```

The build writes an editable shipping background and a Finder-item preview for each direction. Preview-only groups use `data-role="finder-item"` and never appear in the shipping backgrounds.

No DMG is produced because there is no real signed app bundle in this example.
