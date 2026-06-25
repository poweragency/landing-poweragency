// Brand asset generator — software proprietari Power Agency (pattern logo "PAI").
//
// Gemello di gen-assets.mjs (brand PAI/PowerAgency). Qui i loghi dei SINGOLI software
// in vetrina, stesso linguaggio del PAI ma VETTORIALI (SVG → Sharp), riproducibili.
//
// Mark = MONOGRAMMA A LETTERE metallico (estrusione 3D + faccia con sheen speculare +
// gloss), come il "PAI". Wordmark del prodotto + payoff "... SYSTEM".
//
// Esegui dalla root della landing (ha `sharp`):  node scripts/brand/gen-software-logos.mjs
// Output: Z:\SAAS\5.loghi pa\  (archivio loghi PA), prefisso {slug}-.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LANDING = resolve(__dirname, "..", "..");
const OUT = resolve(LANDING, "..", "5.loghi pa");

const DARK = "#0a0606";
const FONT = "Arial Black, Arial, sans-serif";

// Gradienti metallici riusabili.
//  - face: oro→rame→bronzo con BANDA SPECULARE chiara (#ffe7bf) al ~52% = riflesso lucido
//  - gloss: bianco→trasparente in alto = sheen vetroso sulla parte superiore delle lettere
//  - glow: sfondo radiale caldo per icone/OG (come il PAI)
function defs() {
  return `<defs>
    <linearGradient id="face" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0"    stop-color="#fff4e2"/>
      <stop offset="0.16" stop-color="#f7b75f"/>
      <stop offset="0.40" stop-color="#c9692a"/>
      <stop offset="0.52" stop-color="#ffe7bf"/>
      <stop offset="0.60" stop-color="#c06224"/>
      <stop offset="0.82" stop-color="#7e2f0e"/>
      <stop offset="1"    stop-color="#561f08"/>
    </linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0"    stop-color="#ffffff" stop-opacity="0.6"/>
      <stop offset="0.32" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="0.5"  stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="66%">
      <stop offset="0" stop-color="#3a1d0d"/>
      <stop offset="0.55" stop-color="#150b07"/>
      <stop offset="1" stop-color="#0a0606"/>
    </radialGradient>
  </defs>`;
}

// Lettere metalliche: estrusione 3D (copie sfalsate in bronzo scuro) + faccia (gradiente
// con sheen) + gloss superiore + sottile bordo scuro per stacco dal fondo.
function metalText(txt, { x, y, size, anchor = "middle", weight = 900, track = -0.02 }) {
  const t = `font-family="${FONT}" font-weight="${weight}" font-size="${size}" letter-spacing="${size * track}" text-anchor="${anchor}"`;
  const depth = Math.max(2, Math.round(size * 0.05));
  let out = "";
  for (let i = depth; i >= 1; i--) {
    const k = i / depth;
    const shade = i > depth * 0.5 ? "#3a1709" : "#5a2410"; // più scuro alla base
    out += `<text x="${x}" y="${y + i}" ${t} fill="${shade}" fill-opacity="${0.55 + 0.45 * k}">${txt}</text>`;
  }
  out += `<text x="${x}" y="${y}" ${t} fill="url(#face)" stroke="#4a1d09" stroke-width="${size * 0.012}" paint-order="stroke">${txt}</text>`;
  out += `<text x="${x}" y="${y}" ${t} fill="url(#gloss)">${txt}</text>`;
  return out;
}

function payoff(txt, { x, y, size, anchor = "middle" }) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Arial, sans-serif"
    font-weight="700" font-size="${size}" letter-spacing="${size * 0.2}" fill="#c9692a">${txt}</text>`;
}

async function render(svg, { trim = false } = {}) {
  let img = sharp(Buffer.from(svg));
  if (trim) img = img.trim({ threshold: 1 });
  return img.png({ compressionLevel: 9 }).toBuffer();
}

// --- monogramma: solo lettere metalliche, trasparente, trimmato ---
async function monogramma(p) {
  const S = 360;
  const svg = `<svg width="700" height="560" xmlns="http://www.w3.org/2000/svg">${defs()}
    ${metalText(p.mono, { x: 350, y: 400, size: S })}</svg>`;
  return render(svg, { trim: true });
}

// --- icona quadrata 512: app-icon (glow + angoli arrotondati + ring) + monogramma ---
async function iconaQuadrata(p, size = 512) {
  const r = Math.round(size * 0.22);
  const fs = Math.round(size * 0.5);
  const baseY = Math.round(size * 0.5 + fs * 0.36); // centratura ottica cap-height
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${defs()}
    <rect x="1" y="1" width="${size - 2}" height="${size - 2}" rx="${r}" ry="${r}" fill="url(#glow)"/>
    <rect x="1.5" y="1.5" width="${size - 3}" height="${size - 3}" rx="${r}" ry="${r}"
      fill="none" stroke="#7e2f0e" stroke-opacity="0.5" stroke-width="2"/>
    ${metalText(p.mono, { x: size / 2, y: baseY, size: fs })}</svg>`;
  return render(svg);
}

// --- lockup orizzontale: monogramma a sx + wordmark/payoff a dx, trasparente ---
async function orizzontale(p) {
  const svg = `<svg width="2600" height="640" xmlns="http://www.w3.org/2000/svg">${defs()}
    ${metalText(p.mono, { x: 250, y: 430, size: 360 })}
    ${metalText(p.word, { x: 560, y: 350, size: 190, anchor: "start" })}
    ${payoff(p.payoff, { x: 566, y: 440, size: 52, anchor: "start" })}</svg>`;
  return render(svg, { trim: true });
}

// --- lockup verticale: monogramma sopra, wordmark + payoff sotto, trasparente ---
async function verticale(p) {
  const cx = 900;
  const svg = `<svg width="1800" height="1100" xmlns="http://www.w3.org/2000/svg">${defs()}
    ${metalText(p.mono, { x: cx, y: 480, size: 420 })}
    ${metalText(p.word, { x: cx, y: 760, size: 165 })}
    ${payoff(p.payoff, { x: cx, y: 845, size: 48 })}</svg>`;
  return render(svg, { trim: true });
}

// --- OG 1200x630: glow + lockup verticale centrato + dominio ---
async function ogImage(p) {
  const W = 1200, H = 630;
  const lockup = await sharp(await verticale(p)).resize({ height: 430 }).png().toBuffer();
  const lm = await sharp(lockup).metadata();
  const left = Math.round((W - lm.width) / 2);
  const top = Math.round(286 - lm.height / 2);
  const bg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="g" cx="50%" cy="16%" r="78%">
      <stop offset="0" stop-color="#5a2a0e"/><stop offset="0.45" stop-color="#1a0d08"/>
      <stop offset="1" stop-color="#0a0606"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="${DARK}"/>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <text x="${W / 2}" y="592" text-anchor="middle" font-family="Arial, sans-serif"
      font-weight="700" font-size="28" letter-spacing="1" fill="#ff6a1a">${p.domain}</text>
  </svg>`;
  return sharp(Buffer.from(bg)).composite([{ input: lockup, left, top }]).png().toBuffer();
}

async function write(path, buf) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, buf);
  console.log("  ✓", path.replace(OUT, "5.loghi pa"));
}

// Round di validazione: solo Leads + Social per giudicare la resa METALLICA.
// PowerLanding aggiunto dopo (collide su "PL" con PowerLeads → lettere da decidere).
const SOFTWARE = [
  { slug: "powerleads", mono: "PL", word: "POWERLEADS", payoff: "LEAD GENERATION SYSTEM", domain: "powerleads.poweragency.it" },
  { slug: "powersocial", mono: "PS", word: "POWERSOCIAL", payoff: "SOCIAL AUTOMATION SYSTEM", domain: "powersocial.poweragency.it" },
];

for (const p of SOFTWARE) {
  console.log(`${p.word}:`);
  await write(join(OUT, `${p.slug}-monogramma.png`), await monogramma(p));
  await write(join(OUT, `${p.slug}-icona-quadrata-512.png`), await iconaQuadrata(p, 512));
  await write(join(OUT, `${p.slug}-logo-orizzontale.png`), await orizzontale(p));
  await write(join(OUT, `${p.slug}-logo-verticale.png`), await verticale(p));
  await write(join(OUT, `${p.slug}-og-image.png`), await ogImage(p));
}
console.log("Fatto.");
