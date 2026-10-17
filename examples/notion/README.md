# Notion example

Three restrained installer directions based on Notion’s shipped identity:

1. **Quiet Page** — calm and symmetrical.
2. **Block Path** — dark and modular.
3. **Sidebar Shift** — light and asymmetric.

This example demonstrates the concept gate: inspect one product, create exactly three curated directions, present only their final previews, then stop for selection.

| Direction | Product cue | Composition |
| --- | --- | --- |
| Quiet Page | Paper-like workspace | Horizontal layout with one folded corner |
| Block Path | Modular blocks | Rising icon arrangement with a three-block path |
| Sidebar Shift | Workspace sidebar | Falling asymmetric layout with one sidebar edge |

All three use one instruction, one product cue, quiet paths, empty label zones and no decorative copy. The app icon is embedded only in preview SVGs so `sips` receives a self-contained file; shipping backgrounds contain no Finder items.

The representative app icon comes from Notion’s public [`logo-ios.png`](https://www.notion.so/images/logo-ios.png) asset. Notion and its logo are trademarks of Notion Labs, Inc.; this example is for workflow demonstration and is not an official Notion installer.

## Build

```sh
node examples/notion/build.mjs
open examples/notion/notion.html
```

The build writes one editable shipping background and one curated Finder-item preview for each direction. Preview-only groups use `data-role="finder-item"` and never appear in shipping backgrounds.

No DMG is produced because the example does not include a release app bundle.
