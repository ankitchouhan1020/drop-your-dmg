import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appIcon = readFileSync(join(here, "assets/notion-app-icon.png")).toString("base64");

const concepts = [
  {
    id: "quiet-page",
    name: "Quiet Page",
    note: "Notion’s paper-like workspace becomes a calm, direct installation surface.",
    app: [155, 200],
    applications: [505, 200],
    labelTone: "dark",
    art: `
<rect width="660" height="386" fill="#f7f6f3"/>
<path d="M614 0H660V46Z" fill="#e8e6e1"/>
<path d="M614 0L660 46" stroke="#d9d7d2" stroke-width="1"/>
<text x="330" y="91" text-anchor="middle" fill="#37352f" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" letter-spacing="1.15">DRAG TO APPLICATIONS</text>
<path d="M224 200H436M426 194L437 200L426 206" fill="none" stroke="#787774" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" opacity=".48"/>`,
  },
  {
    id: "block-path",
    name: "Block Path",
    note: "A rising sequence of blocks turns Notion’s modular structure into the drag path.",
    app: [145, 220],
    applications: [515, 175],
    labelTone: "light",
    art: `
<rect width="660" height="386" fill="#242424"/>
<text x="330" y="78" text-anchor="middle" fill="#f7f6f3" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" letter-spacing="1.15">DRAG TO APPLICATIONS</text>
<g fill="#f7f6f3" opacity=".52"><rect x="269" y="202" width="5" height="5" rx="1"/><rect x="328" y="190" width="5" height="5" rx="1"/><rect x="387" y="178" width="5" height="5" rx="1"/></g>`,
  },
  {
    id: "sidebar-shift",
    name: "Sidebar Shift",
    note: "A single sidebar cue creates an asymmetric route through Notion’s familiar workspace structure.",
    app: [185, 175],
    applications: [485, 220],
    labelTone: "dark",
    art: `
<rect width="660" height="386" fill="#f3f2ef"/>
<rect width="76" height="386" fill="#e9e7e3"/>
<path d="M76 0V386" stroke="#d4d2cd" stroke-width="1"/>
<text x="350" y="82" text-anchor="middle" fill="#37352f" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" letter-spacing="1.15">DRAG TO APPLICATIONS</text>
<path d="M254 175Q335 178 418 220M406 219L418 220L411 210" fill="none" stroke="#787774" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" opacity=".44"/>`,
  },
];

function document(content, title) {
  const accessibility = title ? ` role="img"><title>${title}</title>` : ">";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="772" viewBox="0 0 660 386"${accessibility}${content}\n</svg>\n`;
}

function finderItems({ app, applications, labelTone }) {
  const foreground = labelTone === "light" ? "#fff" : "#292824";
  const shadow = labelTone === "light" ? "#000" : "#fff";
  const item = ([x, y], content, label) => `
  <g transform="translate(${x - 56} ${y - 56})">
    ${content}
    <text x="56.6" y="135.8" text-anchor="middle" fill="${shadow}" opacity=".78" font-size="12">${label}</text>
    <text x="56" y="135" text-anchor="middle" fill="${foreground}" font-size="12">${label}</text>
  </g>`;
  const notion = `<g filter="url(#icon-shadow)"><rect width="112" height="112" rx="23" fill="#fff"/><image href="data:image/png;base64,${appIcon}" width="112" height="112" clip-path="url(#notion-icon-mask)"/><rect x=".5" y=".5" width="111" height="111" rx="22.5" fill="none" stroke="#000" stroke-opacity=".1"/></g>`;
  const folder = `<g filter="url(#icon-shadow)"><path d="M5 24Q5 13 16 13H47L58 24H96Q107 24 107 35V96Q107 107 96 107H16Q5 107 5 96Z" fill="url(#folder-back)"/><path d="M5 37H107V96Q107 107 96 107H16Q5 107 5 96Z" fill="url(#folder-front)"/><path d="M56 49L77 87H68L63 78H49L44 87H35L55 49ZM52 70H60L56 62Z" fill="#fff" opacity=".82"/></g><g transform="translate(4 85)"><circle cx="10" cy="10" r="10" fill="#f5f5f5" stroke="#a8a8a8" stroke-width=".7"/><path d="M7 14V7H14M8 8L14 14" fill="none" stroke="#555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  return `<g data-role="finder-item" font-family="-apple-system, BlinkMacSystemFont, sans-serif"><defs><clipPath id="notion-icon-mask"><rect width="112" height="112" rx="23"/></clipPath><linearGradient id="folder-back" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#70c9ee"/><stop offset="1" stop-color="#3da4d5"/></linearGradient><linearGradient id="folder-front" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#6fcaf2"/><stop offset="1" stop-color="#42a8dc"/></linearGradient><filter id="icon-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity=".18"/></filter></defs>${item(app, notion, "Notion")}${item(applications, folder, "Applications")}\n</g>`;
}

for (const concept of concepts) {
  writeFileSync(join(here, `${concept.id}-background.svg`), document(concept.art));
  writeFileSync(join(here, `${concept.id}-preview.svg`), document(`${concept.art}${finderItems(concept)}`, `${concept.name} Notion DMG concept preview`));
}

const cards = concepts.map((concept, index) => `<article><a class="window" href="${concept.id}-preview.svg" aria-label="Open full-size ${concept.name} concept preview"><div class="titlebar"><i></i><i></i><i></i><strong>Notion Installer <em>Preview</em></strong></div><img src="${concept.id}-preview.svg" alt=""></a><div class="caption"><h2>${index + 1}. ${concept.name}</h2><p>${concept.note}</p></div></article>`).join("\n");
writeFileSync(join(here, "notion.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Notion — DMG directions</title><style>:root{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#eeede9;color:#202020}*{box-sizing:border-box}body{margin:0;padding:40px 20px}main{max-width:1200px;margin:auto}h1{font-size:26px;letter-spacing:-.03em;margin:0 0 28px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}article{min-width:0}.window{display:block;overflow:hidden;color:inherit;text-decoration:none;border:1px solid #aaa8a2;border-radius:11px;background:#fff;box-shadow:0 16px 40px #2f2d2817,0 2px 7px #2f2d2812}.window:focus-visible{outline:3px solid #2383e2;outline-offset:3px}.titlebar{position:relative;height:38px;display:flex;align-items:center;gap:8px;padding:0 13px;background:linear-gradient(#f5f5f5,#e5e5e5);border-bottom:1px solid #c9c9c9}.titlebar i{width:12px;height:12px;border-radius:50%;background:#ff5f57;box-shadow:inset 0 0 0 .5px #0003}.titlebar i:nth-child(2){background:#febc2e}.titlebar i:nth-child(3){background:#28c840}.titlebar strong{position:absolute;inset:0;display:grid;place-items:center;font-size:13px;color:#3a3a3a}.titlebar em{margin-left:5px;font-style:normal;font-weight:500;color:#777}img{display:block;width:100%}.caption{padding:14px 3px 0}.caption h2{margin:0;font-size:14px}.caption p{margin:5px 0 0;color:#66645f;font-size:13px;line-height:1.45}@media(max-width:760px){body{padding:24px 12px}.titlebar{height:34px}.grid{grid-template-columns:1fr;gap:26px}}</style></head><body><main><h1>Notion — three restrained directions</h1><section class="grid">${cards}</section></main></body></html>\n`);
