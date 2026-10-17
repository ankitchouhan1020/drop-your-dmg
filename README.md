# Drop Your DMG

An agent skill that inspects a macOS product, proposes three installer designs, iterates on the selected direction, and builds a polished drag-to-Applications DMG.

No visual editor. No product dependency. The agent uses the product's existing identity and `create-dmg`.

## Install

### Pi

```sh
pi install npm:drop-your-dmg
```

Then ask:

```text
Design a DMG installer for this app.
```

Or invoke it directly:

```text
/skill:drop-your-dmg
```

## What it does

1. Inspects the product, app icon, screenshots, and release assets.
2. Creates three distinct visual directions.
3. Shows real previews and waits for a choice.
4. Iterates on the selected design.
5. Builds and verifies the final DMG.

## Requirements

- macOS
- [create-dmg](https://github.com/create-dmg/create-dmg) for the final build

The skill checks for `create-dmg` and asks before installing it with Homebrew.

## Publish

```sh
npm login
npm publish
```

## License

MIT
