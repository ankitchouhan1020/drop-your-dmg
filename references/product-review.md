# Product review

The installer should feel inevitable for this product. Inspect first; draw second.

## Evidence order

Use the strongest evidence first:

1. A shipped or release-candidate `.app`.
2. Product screenshots and the app icon.
3. Brand guidelines, website assets and marketing pages.
4. The live interface and design tokens.
5. README copy and repository metadata.
6. Your own inference.

When sources disagree, prefer the newest shipped product and call out the mismatch.

## Repository pass

Look for:

- `README*`, package manifests and release notes;
- `Info.plist`, entitlements and packaging scripts;
- `.xcassets`, `.icns`, logos, screenshots and website images;
- color, typography and spacing tokens;
- existing DMG, Sparkle, notarization or release automation;
- built apps under `dist/`, `build/`, `.build/`, `DerivedData/` or release folders.

Useful commands:

```sh
find . -maxdepth 4 \( -name '*.app' -o -name '*.icns' -o -name '*.xcassets' -o -iname '*logo*' -o -iname '*screenshot*' \) -print
find . -maxdepth 3 \( -name 'Info.plist' -o -iname '*release*' -o -iname '*dmg*' \) -print
```

Keep searches bounded. Do not crawl dependency caches or the user's whole home directory.

## App inspection

Read metadata without launching the app:

```sh
plutil -p "/path/to/Product.app/Contents/Info.plist"
codesign -dvv "/path/to/Product.app" 2>&1
codesign --verify --deep --strict "/path/to/Product.app"
```

Find the icon filename from `CFBundleIconFile` or the asset catalog. Convert an `.icns` preview with:

```sh
sips -s format png "/path/to/AppIcon.icns" --out "/tmp/app-icon.png"
```

Do not launch an app from an untrusted download. If runtime inspection is needed, ask first and explain why.

## Product read

Before concepts, write a compact brief:

- **Purpose:** one sentence.
- **Audience:** who installs it.
- **Character:** three adjectives grounded in evidence.
- **Palette:** 2–4 useful colors.
- **Typography:** system, branded, editorial, technical, playful, and so on.
- **Motifs:** shapes or visual behaviors worth carrying into the installer.
- **Avoid:** visual choices that would contradict the product.
- **Release input:** exact app path and signature status.

This is not a strategy presentation. It is enough context to make three coherent directions.

## Missing inputs

Ask only for information that changes the output:

- the release `.app` path;
- which brand variant is current;
- required legal text or bundled files;
- signing/notarization expectations;
- a target output directory.

Do not block concept work on a missing signing identity or final build path. Do block the final build when the app itself is unavailable.
