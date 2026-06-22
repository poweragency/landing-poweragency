// Brand asset generator — Power Agency ecosystem (logo "PAI").
//
// Sorgente unica: public/brand/source/logo-master.jpeg (logo ufficiale PAI,
// monogramma metallico + wordmark "POWER AGENCY · AI AUTOMATION & SaaS SYSTEM").
// Da qui derivano TUTTI gli asset di brand della landing e dello shop ecom:
// monogramma, set icone (favicon/192/512/maskable/apple), OG image.
//
// Esegui dalla root della landing (ha `sharp` installato):
//   node scripts/brand/gen-assets.mjs
//
// Scrive sia nella landing sia nel repo sibling "POWERAGENCY ECOM" (se presente
// accanto, com'è su Z:\SAAS). Se il sibling manca, salta e segnala (non fallisce).

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { mkdir, writeFile, access } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LANDING = resolve(__dirname, "..", "..");
const ECOM = resolve(LANDING, "..", "POWERAGENCY ECOM", "web");

const SRC = join(LANDING, "public", "brand", "source", "logo-master.jpeg");

// Bounding box del solo monogramma "PAI" (+ nodo AI) dentro il logo 1290x680.
// Calibrato visivamente: include P, A, I e il nodo neurale in alto a destra.
const MARK_BBOX = { left: 430, top: 90, width: 500, height: 380 };

const DARK = "#0a0606"; // base scura di brand
// Soglia alta: rimuove anche la vignette scura attorno al monogramma (non solo
// il nero puro), così sul canvas non resta il rettangolo del ritaglio. Il metallo
// e il nodo arancio sono lontani dal nero → non vengono intaccati.
const TRIM = { background: "#000000", threshold: 60 };

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

// Monogramma PAI con sfondo reso TRASPARENTE (alpha da luminanza): restano solo
// le lettere metalliche e il nodo arancio, lo sfondo scuro del logo sparisce così
// non lascia un rettangolo quando il mark va su un canvas con glow.
//   - alpha = rampa sulla luminanza: pixel scuri (sfondo) → 0, metallo/nodo → 255.
//   - poi trim del bordo trasparente per stringere al contenuto.
const KEY_LO = 26;  // sotto questa luminanza → totalmente trasparente (sfondo)
const KEY_HI = 78;  // sopra → totalmente opaco (metallo/nodo); in mezzo, rampa
async function markKeyed() {
  const crop = await sharp(SRC).extract(MARK_BBOX).removeAlpha().png().toBuffer();
  const slope = 255 / (KEY_HI - KEY_LO);
  const alpha = await sharp(crop)
    .grayscale()
    .linear(slope, -KEY_LO * slope)
    .toColourspace("b-w")
    .png()
    .toBuffer();
  const keyed = await sharp(crop).joinChannel(alpha).png().toBuffer();
  // trim del bordo ora trasparente
  return sharp(keyed).trim({ threshold: 1 }).png().toBuffer();
}

// Logo completo (lockup) trimmato dal nero esterno, alla larghezza richiesta.
// Versione con sfondo (per comporre l'OG su canvas scuro).
async function fullLogo(width) {
  return sharp(SRC).trim(TRIM).resize({ width }).png().toBuffer();
}

// Logo completo con sfondo TRASPARENTE (alpha-key da luminanza): galleggia pulito
// su qualunque fondo (header con blur, footer) senza il rettangolo nero. Soglie
// più morbide del monogramma per non perdere la riga piccola "AI AUTOMATION…".
async function fullLogoKeyed(width) {
  const trimmed = await sharp(SRC).trim({ background: "#000000", threshold: 28 }).resize({ width }).png().toBuffer();
  const lo = 16, hi = 72, slope = 255 / (hi - lo);
  const alpha = await sharp(trimmed).grayscale().linear(slope, -lo * slope).toColourspace("b-w").png().toBuffer();
  // 640px = nitido fino a ~retina nell'header (mostrato ~48px); compresso per il web.
  return sharp(trimmed).removeAlpha().joinChannel(alpha).png({ compressionLevel: 9 }).toBuffer();
}

// Sfondo scuro con glow caldo radiale dietro il mark: riprende l'illuminazione
// del logo originale e fonde l'alone del ritaglio (niente "rettangolo" visibile).
function glowBg(size) {
  return Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="g" cx="50%" cy="44%" r="62%">
    <stop offset="0%" stop-color="#2c170b"/>
    <stop offset="55%" stop-color="#130a07"/>
    <stop offset="100%" stop-color="#0a0606"/>
  </radialGradient></defs>
  <rect width="${size}" height="${size}" fill="url(#g)"/>
</svg>`);
}

// Icona quadrata: monogramma centrato dentro un canvas scuro con glow.
// innerRatio = quota del lato occupata dal mark (resto = padding/safe-area).
async function squareIcon(size, innerRatio, { rounded = false } = {}) {
  const inner = Math.round(size * innerRatio);
  const mark = await sharp(await markKeyed())
    .resize({ width: inner, height: inner, fit: "inside" })
    .png()
    .toBuffer();
  const m = await sharp(mark).metadata();
  const left = Math.round((size - m.width) / 2);
  const top = Math.round((size - m.height) / 2);
  let img = await sharp({
    create: { width: size, height: size, channels: 4, background: DARK },
  })
    .composite([
      { input: glowBg(size), left: 0, top: 0 },
      { input: mark, left, top },
    ])
    .png()
    .toBuffer();
  if (rounded) {
    const r = Math.round(size * 0.22);
    const mask = `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}"/></svg>`;
    img = await sharp(img)
      .composite([{ input: Buffer.from(mask), blend: "dest-in" }])
      .png()
      .toBuffer();
  }
  return img;
}

// OG 1200x630: glow scuro + logo completo centrato + eyebrow/dominio opzionali.
async function ogImage({ eyebrow = "", domain }) {
  const W = 1200, H = 630;
  const logoW = eyebrow ? 600 : 680;
  const logo = await fullLogo(logoW);
  const lm = await sharp(logo).metadata();
  const lLeft = Math.round((W - lm.width) / 2);
  // Centro verticale del logo lasciando aria per eyebrow (sopra) e dominio (sotto).
  const centerY = eyebrow ? 326 : 296;
  const lTop = Math.round(centerY - lm.height / 2);

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const bg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="16%" r="75%">
      <stop offset="0%" stop-color="#5a2a0e"/>
      <stop offset="45%" stop-color="#1a0d08"/>
      <stop offset="100%" stop-color="#0a0606"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0a0606"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${eyebrow ? `<text x="${W / 2}" y="78" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="30" letter-spacing="7" fill="#ff8a3d">${esc(eyebrow)}</text>` : ""}
  <text x="${W / 2}" y="590" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="29" letter-spacing="1" fill="#ff6a1a">${esc(domain)}</text>
</svg>`;

  return sharp(Buffer.from(bg))
    .composite([{ input: logo, left: lLeft, top: lTop }])
    .png()
    .toBuffer();
}

async function write(path, buf) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, buf);
  console.log("  ✓", path.replace(LANDING, "landing").replace(ECOM, "ecom"));
}

async function buildLanding() {
  console.log("Landing (poweragency.it):");
  const pub = join(LANDING, "public");
  const app = join(LANDING, "app");
  // Logo completo (lockup PAI + wordmark) trasparente: header/footer + JSON-LD
  await write(join(pub, "brand", "logo.png"), await fullLogoKeyed(640));
  // Set icone PWA
  await write(join(pub, "icon-192.png"), await squareIcon(192, 0.76));
  await write(join(pub, "icon-512.png"), await squareIcon(512, 0.76));
  await write(join(pub, "icon-maskable-512.png"), await squareIcon(512, 0.62));
  // Favicon + apple touch (convention Next.js in app/)
  await write(join(app, "icon.png"), await squareIcon(256, 0.82));
  await write(join(app, "apple-icon.png"), await squareIcon(180, 0.78));
  // OG statica
  await write(join(pub, "og.png"), await ogImage({ domain: "poweragency.it" }));
}

async function buildEcom() {
  if (!(await exists(ECOM))) {
    console.log("Ecom: repo sibling non trovato accanto alla landing — SALTATO.");
    return;
  }
  console.log("Shop ecom (shop.poweragency.it):");
  const pub = join(ECOM, "public");
  await write(join(pub, "brand", "logo.png"), await fullLogoKeyed(640));
  await write(join(pub, "favicon.png"), await squareIcon(256, 0.82, { rounded: true }));
  await write(join(pub, "icon-192.png"), await squareIcon(192, 0.76));
  await write(join(pub, "icon-512.png"), await squareIcon(512, 0.76));
  await write(join(pub, "icon-maskable-512.png"), await squareIcon(512, 0.62));
  await write(join(pub, "og-default.png"), await ogImage({ eyebrow: "CATALOGO PRODOTTI", domain: "shop.poweragency.it" }));
}

await buildLanding();
await buildEcom();
console.log("Fatto.");
