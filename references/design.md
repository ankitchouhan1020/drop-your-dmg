# DMG design

A Finder DMG window is a tiny installation surface, not a marketing page.

## Minimal design doctrine

1. The real app and Applications Finder items are the primary hierarchy.
2. Use one direct instruction: **“Drag to Applications.”**
3. Use one field, one evidenced product cue and at most one path cue.
4. Start by subtracting; effects and contrast plates are last resorts.
5. Preserve empty space around icons and labels.
6. Make three compositionally distinct concepts with the same restraint.
7. Shipping backgrounds contain no Finder items; previews contain clearly marked representative overlays.
8. Field color and icon arrangement may vary when the shipped product identity requires it. The one-instruction budget, empty label zones and background/preview separation do not.

Every element must improve action recognition, product recognition or label legibility. Otherwise remove it.

## Composition

The two real Finder items are the anchors:

- the app bundle;
- the Applications alias.

The destination should read in under one second. Placement should make the action obvious without decoration. If a path cue is necessary, use one restrained line or arrow subordinate to the Finder items and instruction. Start around 1–1.5 pt with reduced contrast; it must never be the strongest visual element.

Default layout:

| Item | Value |
|---|---:|
| Outer Finder window | 660 × 386 pt |
| Retina artwork | 1320 × 772 px |
| Icon size | 112 pt |
| App center | 155, 200 |
| Applications center | 505, 200 |
| Side safe margin | 28 pt |
| Bottom safe zone | 52 pt |

`create-dmg --window-size` describes the outer Finder window, not a guaranteed content area. The title bar reduces visible height and varies across macOS versions. These are conservative starting values, not geometry guarantees. Keep the lowest label above the bottom safe zone, check long names and validate the mounted window before release.

## Three directions

Each concept needs a different idea. Vary at least two of:

- spatial composition;
- light versus dark field;
- product cue;
- path treatment;
- icon arrangement.

Three palette swaps are one concept, not three. A useful restrained set is:

1. **Quiet field:** a horizontal installation path on a light or dark field.
2. **Asymmetric cue:** one product motif away from both label zones.
3. **Structural:** a different icon arrangement or sparse geometry derived from the product.

All three must obey the same copy and element budgets. Distinct does not mean progressively more decorative. Name concepts by their idea, not “Option A.”

## Brief and medium

Before drawing, record:

- **Action:** “Drag to Applications.”
- **Product cue:** one evidenced palette, type, tone or motif.
- **Composition:** item placement and empty label zones.
- **Path:** none, or one restrained cue.
- **Omissions:** effects and details deliberately excluded.

Start with a solid or near-solid field. Add at most one product motif and, only if needed, one directional line or arrow. Use at most one subtle gradient. Do not add texture, grain, glow, glass, cards, wells, repeated nodes or decorative typography by default.

Choose the lightest suitable medium:

1. Existing product artwork with clear provenance and license.
2. Minimal SVG geometry.
3. Generated raster artwork only when photography or organic imagery is central to the shipped product identity and cannot be represented by a restrained crop or SVG.

Generate at most one candidate for a concept that genuinely needs raster artwork. Specify `1320 × 772`, quiet label zones and exclusions. Reject lettering, fake UI, malformed objects, edge seams or detail behind labels. Preserve the accepted prompt and source, but show the client only the accepted concept preview. Never claim that a placeholder is generated artwork.

## Learn without copying

Use references to judge hierarchy, spacing and contrast, not to borrow artwork or layouts. Translate one relevant decision through the current product’s evidence. Product specificity comes from the chosen cue, not accumulated decoration.

## Background versus preview

The shipping background contains artwork only. The preview may add:

- a representative app icon;
- a representative Applications icon;
- Finder item labels;
- a plain crop or window boundary for context.

Mark preview-only content with `data-role="finder-item"`. Never copy it into the background. Do not fake selection highlights, aliases, labels or Finder chrome in shipping artwork.

## Artwork

Use a Retina SVG with `width="1320"`, `height="772"` and `viewBox="0 0 660 386"`. Keep major geometry on whole or half logical pixels. Convert with `sips` and inspect the PNG dimensions.

Use no more than one subtle gradient. Protect labels by removing artwork behind them first; use a plate or vignette only when subtraction cannot provide sufficient contrast. Use product assets only with clear provenance. Avoid large data URIs in shipping backgrounds. Preview-only raster Finder icons may be embedded as data URIs so `sips` receives a self-contained SVG. Prefer system fonts, licensed included fonts or paths for essential lettering.

## Copy

Use one instructional line by default: **“Drag to Applications.”**

Finder already names both items, so omit the product name, headline, slogan, version, feature copy and secondary instructions. Change the wording only for localization or a documented product requirement.

## Presentation

For concept selection, show exactly three curated previews: one final preview per direction. Keep rejected generations, source artwork, background-only renders, intermediate exports and unrequested variants out of the client presentation. After selection, show only the revised selected preview and, after building, the final Finder inspection image.

## Pre-selection check

At actual Finder size, confirm:

- one self-contained preview renders correctly before producing the full set;
- the destination reads within one second;
- both labels remain legible and the lowest label clears the bottom safe zone;
- only one instructional line appears;
- Finder items dominate the background;
- every decorative element justifies its presence.

## Common failures

- Generic gradient or a high-contrast, oversized arrow.
- More than one product cue or instruction.
- Slogans, feature copy or decorative typography.
- Texture, glow, glass, cards, wells or repeated nodes without product necessity.
- Decorative detail behind Finder labels.
- Three concepts that share one layout or grow progressively busier.
- App or Applications icons baked into the background.
- Product screenshots reduced until unreadable.
- Generated text, fake UI, logos or malformed objects.
- Thin one-pixel artwork rasterized off-grid.
- A background named without `@2x` while relying on Retina interpretation.
- Designing from another app’s DMG instead of the current product.
