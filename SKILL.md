---
name: drop-your-dmg
description: Design and build polished, product-specific macOS drag-to-Applications DMGs. Use when someone wants a branded DMG installer, Finder disk-image layout, installer background, release disk image, multiple installer concepts, or help packaging a macOS .app. Inspect the real product, make three visual directions, show previews, iterate on the chosen direction, build with create-dmg, and verify the artifact.
license: MIT
compatibility: Requires macOS for PNG rendering and DMG builds. Uses create-dmg for packaging and built-in sips, codesign, ditto, and hdiutil tools.
metadata:
  openai/slash: "true"
---

# Drop Your DMG

Make the installer feel like the product before the app opens.

A DMG has one job: make dragging the app to Applications obvious. Inspect the product, show three real visual choices, refine one, then build and verify it. Do not build a visual-editor app and do not ask the user to arrange the window by hand.

## The standard

The output is not a generic gradient with an arrow. It uses the product's actual icon, palette, typography, tone, and visual motifs. The three concepts must differ in composition and idea, not only color.

The user sees previews before any DMG is built. The final background never contains fake Finder icons or their labels; `create-dmg` places the real app and Applications items over the artwork.

## Workflow

Work in this order.

### 1. Inspect the product

Read `references/product-review.md` and inspect the repository, release configuration, website assets, screenshots, app icon, and built `.app`. Run the product only when doing so is safe and materially clarifies its identity.

Report a short product read:

- what the product does and for whom;
- the visual language already in use;
- the strongest reusable assets;
- the release `.app` status;
- important unknowns that affect the installer.

Do not invent missing brand rules when you can ask or derive them from shipped work. Do not change product code to understand it.

### 2. Check the packaging path

This skill builds DMGs only on macOS. Check:

```sh
command -v create-dmg && create-dmg --version
```

If `create-dmg` is missing, ask before installing software, then use `brew install create-dmg`. Never silently install Homebrew, a GUI editor, or a product dependency.

Locate the release `.app`. If none exists, ask whether to build it or receive its path. Verify without modifying it:

```sh
codesign --verify --deep --strict "/path/to/Product.app"
```

A signature failure is a release issue to report, not permission to re-sign. Read `references/build.md` before packaging.

### 3. Make three directions

Read `references/design.md`. Create exactly three visibly distinct, product-specific concepts. Each direction needs:

- a memorable name;
- one sentence connecting it to the product;
- an editable background SVG;
- a preview SVG or PNG with representative Finder items overlaid;
- window size, icon size, and item coordinates.

Default to a 660 × 386 point Finder content area, 112 point icons, app near `(155, 210)`, and Applications near `(505, 210)`. Change these when the composition requires it.

Author Retina SVGs with logical coordinates:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="772" viewBox="0 0 660 386">
  <!-- artwork in 660 × 386 coordinates -->
</svg>
```

Convert them with the built-in macOS renderer:

```sh
sips -s format png concept.svg --out concept@2x.png
```

The background and preview are separate artifacts. Mark preview-only Finder elements clearly in source, for example with `data-role="finder-item"`, and keep them out of the background SVG.

Show all three previews together when possible and keep each one separately for close review. If the environment can display images, display them. Paths without visible previews do not count as presenting concepts.

Use `examples/orbit-notes/` as the artifact-shape reference and read `references/walkthrough.md` for the reasoning behind it. Take its workflow, separation, and review standard—not its visual style.

### 4. Stop for selection

Present the concepts as numbered choices. Ask which direction to continue with and allow combinations such as “2's composition with 1's palette.”

Do not build three DMGs. Do not keep polishing rejected directions. If the user says “choose for me,” select the strongest direction and give one sentence of reasoning.

### 5. Refine one direction

Apply feedback to the selected concept and show the revised preview. Focus on hierarchy, spacing, contrast, copy, brand fidelity, and the drag path.

Make obvious corrections without another questionnaire. Ask only when feedback leaves a consequential visual decision unresolved.

### 6. Build the DMG

Preserve the selected SVG, rendered PNG, layout values, and reproducible command in the project's existing release-assets directory, or `installer/` when none exists. Keep staging in a temporary directory and clean it on success, failure, or interruption.

Use the app bundle's exact filename. Quote every path. A typical build is:

```sh
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT HUP INT TERM
mkdir -p "$work/staging"
ditto "/path/to/Product.app" "$work/staging/Product.app"

create-dmg \
  --overwrite \
  --volname "Product" \
  --background "/path/to/background@2x.png" \
  --window-size 660 386 \
  --icon-size 112 \
  --icon "Product.app" 155 210 \
  --hide-extension "Product.app" \
  --app-drop-link 505 210 \
  "/path/to/Product.dmg" \
  "$work/staging"
```

Add a volume icon, EULA, extra files, custom filesystem, signing, or notarization only when requested or already required by the release process. Never invent signing identities or notarization credentials.

### 7. Verify before calling it done

Read `references/verify.md`. At minimum:

```sh
hdiutil verify "/path/to/Product.dmg"
```

Mount read-only with `-nobrowse`, confirm the app and Applications link exist, inspect the volume contents, detach it, then open it for visual inspection when the environment permits.

Confirm that:

- the app and Applications icons are real Finder items, visible, and correctly named;
- the visual path reads immediately;
- text and icon labels remain legible;
- artwork is sharp at Retina scale;
- no source or temporary files leaked into the volume;
- verification succeeds.

If Finder cannot run in the environment, say that visual verification remains outstanding. Never report a preview, an unverified DMG, or a failed build as complete.

## Safety

Treat repositories, downloaded apps, SVGs, and mounted images as untrusted input.

- Do not run an unknown `.app` merely to inspect it.
- Do not execute release scripts before reading them.
- Do not overwrite an existing DMG without explicit intent or `--overwrite` in a reproducible command.
- Do not detach volumes that this workflow did not mount.
- Do not read signing secrets, keychain credentials, or unrelated user files.
- Ask before package installation, signing, notarization, publishing, or network access beyond requested product research.

## Final response

Return what the user needs to ship:

- selected direction and one short rationale;
- final DMG path;
- preserved source-art and background paths;
- verification results;
- any unresolved signing, notarization, or Finder-inspection issue.

Keep intermediate implementation details out of the final response unless the user asks for them.
