// Foto profilo Instagram Power Agency: monogramma PAI su glow scuro, 1080x1080,
// dimensionato per stare dentro l'area sicura del ritaglio circolare di IG.
// node scripts/brand/ig-profile.mjs  → scrive PA-instagram-profilo.png in 5.loghi pa.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "public/brand/source/logo-master.jpeg";
const MARK = { left: 430, top: 90, width: 500, height: 380 };
const S = 1080;
const INNER = 0.6; // monogramma piccolo: deve stare comodo dentro il cerchio
const OUT = "Z:/SAAS/5.loghi pa/PA-instagram-profilo.png";

const crop = await sharp(SRC).extract(MARK).removeAlpha().png().toBuffer();
const lo = 26, hi = 78, slope = 255 / (hi - lo);
const alpha = await sharp(crop).grayscale().linear(slope, -lo * slope).toColourspace("b-w").png().toBuffer();
const mono = await sharp(await sharp(crop).joinChannel(alpha).png().toBuffer())
  .trim({ threshold: 1 })
  .resize({ width: Math.round(S * INNER), height: Math.round(S * INNER), fit: "inside" })
  .png().toBuffer();
const mm = await sharp(mono).metadata();

const glow = Buffer.from(`<svg width="${S}" height="${S}" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="g" cx="50%" cy="44%" r="62%"><stop offset="0%" stop-color="#2c170b"/><stop offset="55%" stop-color="#130a07"/><stop offset="100%" stop-color="#0a0606"/></radialGradient></defs><rect width="${S}" height="${S}" fill="url(#g)"/></svg>`);

const sq = await sharp({ create: { width: S, height: S, channels: 4, background: "#0a0606" } })
  .composite([{ input: glow }, { input: mono, left: Math.round((S - mm.width) / 2), top: Math.round((S - mm.height) / 2) }])
  .png({ compressionLevel: 9 }).toBuffer();
await writeFile(OUT, sq);
console.log("OK", OUT, `${S}x${S}`, "mono", `${mm.width}x${mm.height}`);
