# Build

Read the command before running it. The build handles a distributable app and may invoke Finder automation.

## Requirements

- macOS;
- a release `.app`;
- `create-dmg`;
- a PNG, GIF or JPEG background;
- enough disk space for a temporary copy of the app and image.

Check `create-dmg`:

```sh
command -v create-dmg
create-dmg --version
```

If it is absent, ask before `brew install create-dmg`.

## Inputs

Record these values before building:

| Value | Example |
|---|---|
| App path | `dist/Product.app` |
| App filename | `Product.app` |
| Volume name | `Product` |
| Background PNG | `installer/background@2x.png` |
| Outer window size | `660 386` |
| Icon size | `112` |
| App position | `155 200` |
| Applications position | `505 200` |
| Output | `dist/Product.dmg` |

Use the exact app filename in both `--icon` and `--hide-extension`.

`--window-size` sets the outer Finder window. Finder chrome reduces the visible content area by an OS-dependent amount, so artwork dimensions do not guarantee that low icons or labels remain visible. Keep labels above a 52 point bottom safe zone and treat all coordinates as starting values until the mounted Finder window is inspected.

## Signature gate

Run:

```sh
codesign --verify --deep --strict "/path/to/Product.app"
```

If this fails, report the output. Do not ad-hoc sign, replace a signature, remove quarantine, or alter entitlements unless the user explicitly asks and understands the release consequence.

## Rendering

For a 660 × 386 logical background, author a 1320 × 772 SVG and render:

```sh
sips -s format png installer/background.svg --out installer/background@2x.png
sips -g pixelWidth -g pixelHeight installer/background@2x.png
```

The result must report 1320 × 772.

## Staging

Copy the app with `ditto` so bundle metadata and resource forks survive:

```sh
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT HUP INT TERM
mkdir -p "$work/staging"
ditto "/path/to/Product.app" "$work/staging/Product.app"
```

Do not stage installer source, previews, screenshots or secrets. The trap removes temporary staging on success, failure or interruption.

After verification, remove rejected generations, preview experiments, superseded or renamed artifacts, test DMGs and intermediate exports created by the workflow. Keep only final delivery artifacts and never delete pre-existing or user-owned files.

## create-dmg

```sh
create-dmg \
  --overwrite \
  --volname "Product" \
  --background "/absolute/path/to/background@2x.png" \
  --window-size 660 386 \
  --icon-size 112 \
  --icon "Product.app" 155 200 \
  --hide-extension "Product.app" \
  --app-drop-link 505 200 \
  "/absolute/path/to/Product.dmg" \
  "$work/staging"
```

Use absolute paths for the background and output. Keep all values in a checked-in release script or documented command so another agent can rebuild the image.

## Optional flags

Use only when required:

- `--volicon icon.icns` for a custom mounted-volume icon;
- `--add-file` for deliberate additional files;
- `--eula` for approved license text;
- `--filesystem APFS` when the supported macOS range allows it;
- `--codesign` with a user-provided identity;
- `--notarize` with an existing user-provided keychain profile.

Do not combine product signing and DMG signing conceptually. The app should already be signed before packaging.

## Headless environments

`create-dmg` normally uses Finder and AppleScript to arrange the window. In a sandbox, CI runner or SSH session this may fail. `--skip-jenkins` and `--sandbox-safe` skip cosmetic Finder work and therefore do not prove the intended layout. Use them only when the user accepts that limitation, and perform a real Finder build before release.
