---
name: drop-your-dmg
description: Inspect a macOS product, propose several polished drag-to-Applications installer designs, iterate with the user, and build the chosen DMG with create-dmg. Use when someone wants a branded macOS DMG, installer background, Finder disk-image layout, release DMG, or alternatives for how an app-install window should look.
compatibility: Requires macOS. Building requires create-dmg; preview generation uses built-in sips.
---

# Drop Your DMG

Design the installer from the product itself, show real choices, then create the DMG on demand. Do not build or suggest a separate visual-editor app.

A DMG window has one job: make dragging the app to Applications obvious. Treat it as product packaging, not a landing page.

## Workflow

Follow these stages in order. Stop for user choice after concepts unless the user explicitly says to choose for them.

### 1. Inspect the product

Find the product's actual identity before designing:

- Read the README, package manifest, release configuration, website, screenshots, and brand guidelines that already exist.
- Locate the app icon, logo, colors, fonts, marketing copy, and the built `.app` if present.
- Run or inspect the product when that materially clarifies its visual language. Do not change product code merely to understand it.
- Determine the app name, audience, tone, minimum macOS version, and whether the interface is light, dark, playful, technical, editorial, or utilitarian.
- Prefer shipped assets over inventing a second visual identity. Do not copy another product's installer.

Summarize the product direction in 3–5 bullets. State missing inputs instead of guessing important brand facts.

### 2. Check the build path

Building is macOS-only. Check the dependency:

```sh
command -v create-dmg && create-dmg --version
```

If it is absent, ask before installing software, then use:

```sh
brew install create-dmg
```

Do not install a GUI editor or add a runtime dependency to the product.

Locate the release `.app`. If none exists, ask whether to build it or receive its path. Before packaging, check it without altering it:

```sh
codesign --verify --deep --strict "/path/to/Product.app"
```

A failed signature check is not permission to re-sign the app. Report it and ask how to proceed.

### 3. Create three product-specific directions

Create **three visibly distinct concepts**, not three color variations. Derive them from the inspected product. Useful differences include composition, density, typography, illustration, material, and light/dark treatment.

For each direction provide:

- a short name;
- one sentence explaining why it fits the product;
- a real visual preview;
- the intended background, icon size, app position, and Applications position.

Use a 660 × 386 point window by default, with roughly 112 pt icons at `(155, 210)` and `(505, 210)`. Change those values when the product or composition benefits, while keeping both icons comfortably inside the window.

Create editable SVG artwork at 2× output size:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="772" viewBox="0 0 660 386">
  <!-- artwork in 660 × 386 logical coordinates -->
</svg>
```

Convert SVG to PNG with the macOS-native tool:

```sh
sips -s format png concept.svg --out concept.png
```

For each concept, distinguish between:

- **background artwork**: what will actually ship in the DMG;
- **preview composition**: the background plus representative app and Applications icons and their Finder labels.

Never bake the app icon, Applications icon, selection state, Finder chrome, or icon labels into the final background. Those are real Finder elements created by `create-dmg`.

Show the three previews together when possible, and also keep each preview separately so details can be reviewed. If the environment can display images, display them rather than merely listing paths.

### 4. Ask for a direction

Present the concepts as numbered choices and ask which one to continue with. Invite concrete combinations such as “2's layout with 1's colors.”

Do not build all three DMGs. Do not continue polishing rejected directions. If the user says “choose for me,” pick the strongest direction and explain the choice in one sentence.

### 5. Iterate the selected design

Apply feedback to the chosen direction and show the revised preview. Keep iterations focused on visible decisions: hierarchy, spacing, contrast, arrow/path, copy, and brand fidelity.

Ask again only when feedback leaves a real design decision unresolved. Otherwise make the obvious correction and show it.

### 6. Build the chosen DMG

Keep temporary staging outside the source tree. Preserve the chosen background SVG/PNG and the final command in a small `installer/` or existing release-assets directory; follow the project's existing convention when one exists.

Stage the app without modifying it:

```sh
work="$(mktemp -d)"
mkdir -p "$work/staging"
ditto "/path/to/Product.app" "$work/staging/Product.app"
```

Build with the selected dimensions and coordinates:

```sh
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

Quote every path. Use the app bundle's exact filename for `--icon` and `--hide-extension`. Add `--volicon`, extra files, signing, or notarization only when the product already requires them or the user asks.

Always clean up temporary staging, including on failure.

### 7. Verify the artifact

At minimum run:

```sh
hdiutil verify "/path/to/Product.dmg"
```

Then mount read-only without opening Finder, confirm the app and Applications link exist, and detach:

```sh
mount_output="$(hdiutil attach -readonly -nobrowse "/path/to/Product.dmg")"
mount_point="$(printf '%s\n' "$mount_output" | awk -F '\t' '/\/Volumes\// {print $NF; exit}')"
ls -la "$mount_point"
hdiutil detach "$mount_point"
```

Finally open the DMG for visual inspection when the environment permits. Confirm:

- both icons are fully visible and correctly named;
- the visual path clearly reads from app to Applications;
- text and icon labels remain legible;
- artwork is sharp on Retina displays;
- no temporary or source files leaked into the volume;
- the DMG verifies successfully.

If Finder automation fails in a headless or sandboxed environment, explain the limitation. Do not claim the visual layout was verified when it was not.

## Design rules

- One obvious action beats explanatory copy.
- Use at most one short headline and one short instruction; often the instruction alone is enough.
- Keep artwork behind the icon-label zones quiet enough for Finder text to remain readable.
- Make the direction from the app to Applications unmistakable without making the arrow the visual hero.
- Use real product assets and visual motifs, but simplify them for a small installer window.
- Avoid feature lists, screenshots with unreadable UI, fake buttons, fake window chrome, testimonials, gradients unrelated to the brand, and decorative clutter.
- Respect safe margins of about 28 points and leave breathing room around both icons.
- Prefer SVG vectors and restrained typography. Use fonts available on the target Mac or convert essential custom lettering to paths.
- The final background must still work if Finder takes a moment to render the icons.
- Do not add analytics, network calls, or executable code to the DMG artwork.

## Final response

Return only what helps the user ship:

- selected concept and any important design rationale;
- final DMG path;
- preserved background/source-art paths;
- verification result;
- any unresolved signing or notarization issue.

Do not present the work as complete if only previews were created or if `hdiutil verify` failed.
