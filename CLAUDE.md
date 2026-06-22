# PowerAgency — landing principale

> Fonte di verità del progetto, committata nel repo. Tienila concisa.

## ⚠️ Cos'è questo progetto
- È la landing PowerAgency **reale**, servita su **`www.poweragency.it`** (l'apex `poweragency.it` fa 307 → www). Single-locale IT.
- Vercel project **`landing-poweragency`** · repo **`poweragency/landing-poweragency`** · **deploy automatico a ogni push su `main`**.
- Il vecchio progetto `poweragency-web` è stato **eliminato** (2026-06): NON cercare il HUB altrove. Pagine: `/`, `/ecosistema`, `/software`, `/crm`, `/prop`, `/ecommerce` + legali (privacy/termini/cookie con dati fiscali reali da `lib/content.ts`). `/shop` NON è una pagina: è un **redirect** (`next.config.mjs`) verso lo shop prodotti su `https://shop.poweragency.it` (app Astro separata, repo `POWERAGENCY ECOM`), presente in `NAV_LINKS` come voce "Shop". NB: `/ecommerce` è invece la pagina-verticale sull'esperienza ecommerce di PA, da non confondere con lo shop.
- **Lead capture (2026-06-09):** il form contatti fa POST a **`/api/lead`** (`app/api/lead/route.ts`): valida nome/email/telefono, poi inoltra best-effort (mai bloccante per l'utente) a (1) `LEAD_WEBHOOK_URL` se configurata (Zapier/Make/...) e (2) **Power Hub** come lead `web_form` con `source: "poweragency.it"` — env su Vercel: `POWERHUB_WEBFORM_SECRET` (= `WEBFORM_WEBHOOK_SECRET` lato Power Hub) e `POWERHUB_WEBFORM_URL` (default `https://crm.poweragency.it/api/webhooks/web-form`). Il secret resta server-side.

## Comandi
- `npm run dev` — sviluppo
- `npm run build` — build (Turbopack; lento/instabile su questa share SMB)
- `npm run lint` — lint
- **Deploy = `git push origin main`** → Vercel builda e pubblica. La build di Vercel è il gate vero di typecheck/build.

## Gotcha (non ovvi)
- **Git su share SMB:** "dubious ownership" → prima di operare: `git config --global --add safe.directory "<path>"`.
- **`tsc`/build locale lentissimi su SMB:** non aspettarli all'infinito, pusha e lascia il check a Vercel.
- **Next.js 16:** `params` di pagine/route è una `Promise` (va `await`). Doc offline in `node_modules/next/dist/docs/`.
- Alias `@/*` → root del progetto (niente `src/`): tutto in `app/`, `components/`, `lib/`.

## Convenzioni (IMPORTANT, segui per coerenza)
- **Contenuti SEMPRE in `lib/content.ts`** (NAV_LINKS, STATS, SOFTWARE, CRM, ECOSISTEMA, `*_FAQ`, CONTACT…). Mai hardcodare copy sparso nelle pagine.
- **SEO per pagina:** `export const metadata = pageMeta({ title, description, path })` da `lib/seo.ts` → canonical self-ref + OG + Twitter. La home usa i default in `app/layout.tsx`. Host canonico = `www.poweragency.it`.
- **Structured data:** `<JsonLd data={...} />` coi builder di `lib/structured-data.ts`. `Organization` è site-wide (nel layout); le pagine aggiungono `Service`/`FAQPage`/`WebSite`.
- **Immagine OG:** statica `public/og.png` (logo PAI su glow scuro, 1200x630), referenziata come `/og.png` da `OG_IMAGE` in `lib/seo.ts` (NON via convenzione file `opengraph-image`, altrimenti gli override per-pagina la perdono). Rigenerabile con `scripts/brand/gen-assets.mjs`.
- **Le pagine sono server component** (esportano `metadata`): NON usare `motion`/hook direttamente → wrappa la logica client in `Reveal` (client). `TiltCard` e `MagneticButton` sono wrapper **statici** (vedi Brand): mantengono l'API ma non hanno più effetti legati al mouse.
- **Pattern pagina-servizio (asciutto):** `PageHero` → 1-2 sezioni (`SectionHead` + griglia `TiltCard`) → `Faq` → `CTA`. **Niente contenuti duplicati tra pagine** (es. `CaseStudy` sta solo su `/crm`).

## Regole di contenuto (YOU MUST)
- **Mai esporre prezzi in pagina:** rimanda alle landing dei prodotti; sito/CRM = "preventivo dopo audit / range in call".
- **Bundling:** PowerLeads e PowerSocial = SaaS in abbonamento (self-service); sito (PowerLanding) e CRM = servizi su misura.
- **Solo numeri reali:** 10.000€/day ecom, 120+ account prop, case carrozzeria 60+ lead / 5 clienti / 15.000€. **Non inventarne altri.**
- Il case carrozzeria resta **anonimo** (mai nome/città). Carrozzerie/dentisti/edili NON sono verticali da spingere come pagine dedicate.

## Brand
Email `info@poweragency.it` · IG `@_poweragency_` · logo ufficiale **PAI** (monogramma metallico + nodo AI, wordmark "POWER AGENCY · AI AUTOMATION & SaaS SYSTEM"). Master: `public/brand/source/logo-master.jpeg`. Derivati (sfondo trasparente): `public/brand/logo-horizontal.png` = **lockup orizzontale** (monogramma + wordmark affiancati), usato così com'è nell'header/footer da `components/Logo.tsx` (niente testo HTML); `public/brand/logo.png` = lockup impilato completo, usato in JSON-LD. Palette: base scuro `#0a0606`, accento arancio `#ff6a1a` (gradient amber→red), font Space Grotesk (`font-head`) + Inter.

**Sfondo statico (rebrand 22/06/2026, allineato a shop.poweragency.it):** `components/Background.tsx` è un solo gradiente "fuoco" radiale fisso su `#0a0606` — **niente WebGL/three.js, niente particelle, niente griglia, niente cursore custom, niente effetti legati al mouse**. Sono stati rimossi `AuroraBackground`/`CustomCursor` (+ deps `three`, `@react-three/fiber`, `@react-three/drei`) e neutralizzati `MagneticButton`/`TiltCard` (API intatta, solo hover/press sobri). Regola brand: lo sfondo resta **scuro e statico** come lo shop.

## Icone, OG e manifest (logo PAI dal 22/06/2026)

**Tutti** gli asset di brand derivano dal master `public/brand/source/logo-master.jpeg`
e si rigenerano con **`node scripts/brand/gen-assets.mjs`** (richiede `sharp`, già dipendenza
del progetto). Lo script scrive anche nel repo sibling `POWERAGENCY ECOM/web` se presente
accanto (Z:\SAAS), così landing e shop restano allineati allo stesso logo.

Set: `public/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (monogramma su glow scuro;
maskable con safe-area ampia) + `app/icon.png` (favicon via convention, sostituisce il vecchio
`icons:{}` esplicito nel metadata) + `app/apple-icon.png` (180) + `public/brand/logo-horizontal.png`
(header/footer) + `public/brand/logo.png` (impilato, JSON-LD) + `public/og.png` (OG 1200x630).
`app/manifest.ts` è **light** (display `browser`): sito vetrina,
niente PWA standalone/sw.js. Pattern icone: `Z:\SECOND-BRAIN\sources\stack\pattern-icone-pwa-progetto.md`.

**Asset social/manuali** (non usati dal sito): `node scripts/brand/ig-profile.mjs` genera la foto
profilo Instagram (1080×1080, monogramma nell'area sicura del cerchio) in `Z:\SAAS\5.loghi pa\`,
dove c'è anche il set export `PA-*.png` (logo orizzontale/verticale, monogramma, icona, OG) accanto al master.
