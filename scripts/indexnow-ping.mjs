#!/usr/bin/env node
// indexnow-ping.mjs — notifica a IndexNow (Bing & partner) gli URL del sito.
// Perché: Bingbot ricrawla poweragency.it molto di rado (07/2026: warning BWT stale,
// 6 impression/2 mesi) e Bing alimenta ChatGPT Search e Copilot → IndexNow è il canale
// per fargli vedere subito le pagine nuove/aggiornate (raccomandazione #1 di BWT).
//
// La chiave è il file public/<hex32>.txt servito alla root del sito (pubblica by design:
// dimostra solo il controllo dell'host, non è un segreto).
//
// Uso:
//   node scripts/indexnow-ping.mjs                       # pinga tutti gli URL della sitemap di prod
//   node scripts/indexnow-ping.mjs --urls https://www.poweragency.it/blog/x,https://...
//   node scripts/indexnow-ping.mjs --wait                # prima aspetta che il deploy esponga il key file
//
// Gira in CI (.github/workflows/indexnow.yml) a ogni push su main, DOPO il deploy Vercel
// (--wait polla il key file live). Zero dipendenze.

import { readdir, readFile } from "node:fs/promises";

const HOST = "www.poweragency.it";
const args = process.argv.slice(2);
const get = (flag, def) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : def);

const keyFile = (await readdir("public")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("[indexnow] nessun key file public/<hex32>.txt trovato.");
  process.exit(1);
}
const key = (await readFile(`public/${keyFile}`, "utf8")).trim();
const keyLocation = `https://${HOST}/${keyFile}`;

// --wait: il workflow parte al push, ma il deploy Vercel impiega ~1-2 min.
// Polla il key file live (max ~8 min) prima di pingare, altrimenti Bing valida a vuoto.
if (args.includes("--wait")) {
  let live = false;
  for (let i = 0; i < 32 && !live; i++) {
    try {
      const res = await fetch(keyLocation, { redirect: "follow" });
      live = res.ok && (await res.text()).trim() === key;
    } catch {
      /* deploy non ancora pronto */
    }
    if (!live) await new Promise((r) => setTimeout(r, 15_000));
  }
  if (!live) {
    console.error(`[indexnow] key file non raggiungibile dopo 8 min: ${keyLocation} — salto il ping.`);
    process.exit(1);
  }
  console.error("[indexnow] key file live, procedo.");
}

let urls;
const urlsArg = get("--urls", "");
if (urlsArg) {
  urls = urlsArg.split(",").map((u) => u.trim()).filter(Boolean);
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) {
  console.error("[indexnow] nessun URL da inviare.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation, urlList: urls }),
});

// 200 = ok, 202 = accettato (chiave in validazione): entrambi successo.
if (res.status === 200 || res.status === 202) {
  console.error(`[indexnow] inviati ${urls.length} URL (HTTP ${res.status}).`);
} else {
  console.error(`[indexnow] errore HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  process.exit(1);
}
