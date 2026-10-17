import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const concepts = [
  {
    id: "quiet-orbit",
    name: "Quiet Orbit",
    note: "A restrained night field carries Orbit Notes' spatial metaphor without competing with the Finder items.",
    art: `
<defs>
  <linearGradient id="qo-bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#20211f"/><stop offset="1" stop-color="#111310"/></linearGradient>
  <radialGradient id="qo-halo"><stop stop-color="#ad9fc7" stop-opacity=".18"/><stop offset="1" stop-color="#ad9fc7" stop-opacity="0"/></radialGradient>
</defs>
<rect width="660" height="386" fill="url(#qo-bg)"/>
<circle cx="116" cy="214" r="180" fill="url(#qo-halo)"/>
<circle cx="90" cy="228" r="132" fill="none" stroke="#c0afd9" stroke-opacity=".17"/>
<circle cx="563" cy="346" r="171" fill="none" stroke="#c0afd9" stroke-opacity=".12"/>
<circle cx="247" cy="53" r="2" fill="#d9caed" opacity=".8"/><circle cx="566" cy="73" r="2" fill="#d9caed" opacity=".65"/>
<text x="42" y="44" fill="#d8d3df" opacity=".58" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" letter-spacing="2">ORBIT NOTES  /  INSTALL</text>
<text x="330" y="156" text-anchor="middle" fill="#fff" opacity=".58" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" letter-spacing=".8">DRAG TO APPLICATIONS</text>
<path d="M224 214 Q330 154 436 214" fill="none" stroke="#c0afd9" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 8" opacity=".82"/>
<path d="M426 204 L438 214 L423 219" fill="none" stroke="#c0afd9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".82"/>
<text x="42" y="350" fill="#fff" opacity=".38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11">Ideas need somewhere to land.</text>`,
  },
  {
    id: "paper-trail",
    name: "Paper Trail",
    note: "A warm ruled workspace connects installation to the product's writing and card-based experience.",
    art: `
<defs>
  <linearGradient id="pt-bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fbfaf6"/><stop offset="1" stop-color="#eee9df"/></linearGradient>
  <filter id="pt-shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#40382c" flood-opacity=".12"/></filter>
</defs>
<rect width="660" height="386" fill="url(#pt-bg)"/>
<g opacity=".45" stroke="#b7aa98" stroke-width=".7"><path d="M0 72H660M0 104H660M0 136H660M0 168H660M0 200H660M0 232H660M0 264H660M0 296H660M0 328H660"/></g>
<rect x="32" y="28" width="596" height="330" rx="22" fill="#fffdf8" opacity=".72" filter="url(#pt-shadow)"/>
<path d="M48 28V358" stroke="#d07d6d" stroke-width="1" opacity=".55"/>
<text x="70" y="62" fill="#243c59" font-family="Georgia, serif" font-size="17">Put Orbit Notes where it belongs.</text>
<text x="70" y="82" fill="#625e57" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" letter-spacing="1.2">DRAG THE APP TO APPLICATIONS</text>
<path d="M224 213 C275 236 382 236 436 213" fill="none" stroke="#476f9f" stroke-width="2.4" stroke-linecap="round"/>
<path d="M424 204 L438 213 L424 221" fill="none" stroke="#476f9f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="330" cy="231" r="3.5" fill="#d07d6d"/>
<text x="70" y="333" fill="#625e57" font-family="Georgia, serif" font-size="11" font-style="italic">One move, then start connecting ideas.</text>`,
  },
  {
    id: "signal-bloom",
    name: "Signal Bloom",
    note: "A vivid launch surface turns the install moment into a burst of connected ideas while preserving clear icon zones.",
    art: `
<defs>
  <linearGradient id="sb-bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#29145f"/><stop offset=".52" stop-color="#5e37c8"/><stop offset="1" stop-color="#a653d0"/></linearGradient>
  <radialGradient id="sb-glow"><stop stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <filter id="sb-shadow"><feDropShadow dx="0" dy="14" stdDeviation="20" flood-color="#160631" flood-opacity=".35"/></filter>
</defs>
<rect width="660" height="386" fill="url(#sb-bg)"/>
<circle cx="170" cy="208" r="210" fill="url(#sb-glow)" opacity=".34"/>
<circle cx="545" cy="305" r="250" fill="url(#sb-glow)" opacity=".24"/>
<path d="M-20 330 C130 248 167 89 334 68 C473 50 540 145 696 78" fill="none" stroke="#fff" stroke-width="1" opacity=".14"/>
<path d="M-25 350 C142 266 188 110 346 91 C489 74 551 162 690 105" fill="none" stroke="#fff" stroke-width="1" opacity=".1"/>
<rect x="28" y="28" width="604" height="330" rx="28" fill="#fff" fill-opacity=".09" stroke="#fff" stroke-opacity=".19" filter="url(#sb-shadow)"/>
<text x="330" y="67" text-anchor="middle" fill="#fff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="21" font-weight="700">Make space for your ideas.</text>
<text x="330" y="89" text-anchor="middle" fill="#fff" opacity=".67" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" letter-spacing="1.5">DRAG ORBIT NOTES TO APPLICATIONS</text>
<path d="M227 211 C280 171 379 171 433 211" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".88"/>
<path d="M421 200 L436 211 L420 220" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".88"/>
<g fill="#fff"><circle cx="284" cy="181" r="2" opacity=".45"/><circle cx="330" cy="173" r="3" opacity=".72"/><circle cx="377" cy="183" r="2" opacity=".45"/></g>`,
  },
];

function document(content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="772" viewBox="0 0 660 386" role="img">${content}\n</svg>\n`;
}

function finderItems() {
  return `
<g data-role="finder-item" font-family="-apple-system, BlinkMacSystemFont, sans-serif">
  <g transform="translate(99 154)">
    <defs><linearGradient id="app-icon" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9f91d3"/><stop offset="1" stop-color="#4a3e72"/></linearGradient></defs>
    <rect width="112" height="112" rx="25" fill="url(#app-icon)"/>
    <circle cx="56" cy="56" r="30" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>
    <circle cx="76" cy="36" r="6" fill="#fff"/>
    <circle cx="41" cy="69" r="4" fill="#fff" opacity=".75"/>
    <text x="56.8" y="136" text-anchor="middle" fill="#000" opacity=".72" font-size="12">Orbit Notes</text>
    <text x="56" y="135" text-anchor="middle" fill="#fff" font-size="12">Orbit Notes</text>
  </g>
  <g transform="translate(449 154)">
    <path d="M5 23 Q5 12 16 12 H48 L59 23 H96 Q107 23 107 34 V96 Q107 107 96 107 H16 Q5 107 5 96Z" fill="#65a8ef"/>
    <path d="M5 35 H107 V96 Q107 107 96 107 H16 Q5 107 5 96Z" fill="#79b9f7"/>
    <path d="M56 47 L78 87 H68 L63 77 H48 L43 87 H33 L55 47ZM52 69H59L56 61Z" fill="#fff" opacity=".92"/>
    <text x="56.8" y="136" text-anchor="middle" fill="#000" opacity=".72" font-size="12">Applications</text>
    <text x="56" y="135" text-anchor="middle" fill="#fff" font-size="12">Applications</text>
  </g>
</g>`;
}

for (const concept of concepts) {
  writeFileSync(join(here, `${concept.id}-background.svg`), document(concept.art));
  writeFileSync(join(here, `${concept.id}-preview.svg`), document(`${concept.art}${finderItems()}`));
}

const cards = concepts.map((concept, index) => `<article><img src="${concept.id}-preview.svg" alt="${concept.name} DMG concept for Orbit Notes"><div><span>${index + 1}</span><h2>${concept.name}</h2><p>${concept.note}</p></div></article>`).join("\n");

writeFileSync(join(here, "orbit-notes.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Orbit Notes — DMG directions</title><style>
:root{color-scheme:light;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f2f0eb;color:#1f201d}body{margin:0;padding:48px}main{max-width:920px;margin:auto}header{margin-bottom:32px}h1{font-size:32px;letter-spacing:-.04em;margin:0 0 8px}header p{color:#676963;margin:0}.grid{display:grid;gap:28px}article{background:#fff;border:1px solid #d9d7d1;border-radius:18px;overflow:hidden;box-shadow:0 12px 36px #302d2512}img{display:block;width:100%;height:auto}article div{display:grid;grid-template-columns:32px auto;column-gap:12px;padding:18px 20px 21px}span{grid-row:1/3;width:26px;height:26px;display:grid;place-items:center;border-radius:50%;background:#20211f;color:#fff;font-size:12px;font-weight:700}h2{font-size:16px;margin:2px 0 5px}article p{font-size:13px;line-height:1.45;color:#676963;margin:0}</style></head><body><main><header><h1>Orbit Notes</h1><p>Three distinct installer directions. Choose one before refinement and build.</p></header><section class="grid">${cards}</section></main></body></html>\n`);
