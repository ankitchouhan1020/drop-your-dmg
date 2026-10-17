# DMG design

A Finder DMG window is a tiny installation surface, not a marketing page.

## Composition

The two real Finder items are the composition anchors:

- the app bundle;
- the Applications alias.

The eye should move from the app to Applications in under a second. An arrow, trail, repeated motif, directional lighting or spatial rhythm may carry that motion. The path should support the icons rather than dominate them.

Default layout:

| Item | Value |
|---|---:|
| Content area | 660 × 386 pt |
| Retina artwork | 1320 × 772 px |
| Icon size | 112 pt |
| App center | 155, 210 |
| Applications center | 505, 210 |
| Safe margin | 28 pt |

These are defaults, not rules. Check long app names and nonstandard window proportions.

## Three directions

Each concept needs a different design idea. Vary at least two of:

- spatial composition;
- light versus dark material;
- typography and copy hierarchy;
- illustration or product motif;
- path treatment;
- density and texture.

Three palette swaps are one concept, not three.

A useful set often includes:

1. **Quiet:** restrained and product-led.
2. **Expressive:** a recognizable product motif with more personality.
3. **Editorial or technical:** a structurally different interpretation.

Name concepts by their idea, not “Option A.”

## Background versus preview

The shipping background contains only artwork. The preview may also contain:

- a representative app icon;
- a representative Applications icon;
- Finder item labels;
- optional crop or window framing used only to explain the composition.

Mark all preview-only content with `data-role="finder-item"`. Never copy it into the background SVG.

Do not fake selection highlights, aliases, icon labels or Finder chrome in the shipping background. Finder owns those pixels.

## Artwork

Use a Retina SVG with `width="1320"`, `height="772"` and `viewBox="0 0 660 386"`. Keep major geometry on whole or half logical pixels. Convert with `sips` and inspect the PNG dimensions.

Use product assets where their license and provenance are clear. Link or copy only the files needed for the installer. Avoid data URIs for large raster assets because they make iteration and review harder.

Custom fonts may not exist on every machine that builds the DMG. Prefer system fonts for live SVG text, include a licensed font in the build process, or convert essential display lettering to paths. Never embed a font without permission.

## Copy

A DMG rarely needs more than one instruction:

- “Drag to Applications”
- “Move to Applications”
- “Install in Applications”

Product-specific language is welcome when it remains immediate. Avoid feature lists, onboarding, release notes and legal copy in the background.

Remember that Finder draws labels under both icons. Keep those zones visually quiet and test with the longest expected app name.

## Contrast

Check the background behind:

- the icon silhouettes;
- app and Applications labels;
- the drag path;
- any instructional copy.

A beautiful background that hides the labels fails. Use local quiet zones, subtle plates, vignettes or restrained texture rather than global darkness.

## Common failures

- Generic gradient plus oversized arrow.
- Three concepts that share the same layout.
- App or Applications icons baked into the background.
- Product screenshot shrunk until it is unreadable.
- Copy competing with the action.
- Decorative shapes behind Finder labels.
- Thin one-pixel artwork rasterized off-grid.
- A background named without `@2x` while relying on Retina interpretation.
- Designing from another app's DMG instead of the current product.
