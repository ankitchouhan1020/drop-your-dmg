#!/bin/bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/shots/examples"
rm -rf "$out"
mkdir -p "$out"

while IFS= read -r svg; do
  name="${svg#"$root/"}"
  png="$out/${name//\//-}.png"
  sips -s format png "$svg" --out "$png" >/dev/null
  width="$(sips -g pixelWidth "$png" | awk '/pixelWidth/ {print $2}')"
  height="$(sips -g pixelHeight "$png" | awk '/pixelHeight/ {print $2}')"
  test "$width" = "1320"
  test "$height" = "772"
  printf '%s\n' "$png"
done < <(find "$root/examples" -name '*.svg' -type f | sort)
