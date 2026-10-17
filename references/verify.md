# Verification

A successful command is not enough. Verify the image, its contents and its Finder presentation.

## 1. Disk image integrity

```sh
hdiutil verify "/path/to/Product.dmg"
```

Any nonzero exit is a failed artifact.

## 2. Read-only mount

Mount without opening Finder:

```sh
mount_output="$(hdiutil attach -readonly -nobrowse "/path/to/Product.dmg")"
mount_point="$(printf '%s\n' "$mount_output" | awk -F '\t' '/\/Volumes\// {print $NF; exit}')"
test -n "$mount_point"
```

Record the mount point created by this command. Detach only that mount point:

```sh
hdiutil detach "$mount_point"
```

Use a trap if later checks can fail.

## 3. Contents

The mounted root should contain:

- the expected `.app`;
- the Applications alias or symbolic link;
- hidden Finder metadata created by the builder;
- only explicitly requested additional files.

Inspect:

```sh
find "$mount_point" -maxdepth 2 -print
test -d "$mount_point/Product.app"
test -e "$mount_point/Applications"
codesign --verify --deep --strict "$mount_point/Product.app"
```

Do not execute the mounted app as part of packaging verification.

## 4. Visual Finder review

Open the DMG on a graphical macOS session and inspect the actual Finder window, not only the concept preview.

Check:

- intended window dimensions;
- icon size and exact coordinates;
- app name and extension hiding;
- Applications alias and alias badge;
- background crop and Retina sharpness;
- icon-label contrast;
- arrow or path alignment;
- no clipped artwork;
- no horizontal or vertical scrollbars;
- the window still reads after deselecting all items.

Take a screenshot when possible. Compare it with the selected preview and explain any Finder-specific difference.

## 5. Release checks

When the release process requires them, separately check:

- app signature and hardened runtime;
- app notarization and stapling;
- DMG signature;
- DMG notarization and stapling;
- download checksum.

Do not claim notarization from a successful local build. Use the release team's existing commands and credentials.

## Report

Report each gate explicitly:

| Gate | Result |
|---|---|
| Background dimensions | pass/fail |
| App signature | pass/fail/not requested |
| create-dmg build | pass/fail |
| hdiutil verify | pass/fail |
| Mounted contents | pass/fail |
| Finder visual review | pass/fail/not possible |
| DMG signing/notarization | pass/fail/not requested |

Anything marked fail keeps the artifact from being called complete.
