# PowerAgency — landing principale

> Fonte di verità del progetto, committata nel repo. Tienila concisa.

## ⚠️ Cos'è questo progetto
- È la landing PowerAgency **reale**, servita su **`www.poweragency.it`** (l'apex `poweragency.it` fa 307 → www). Single-locale IT.
- Vercel project **`landing-poweragency`** · repo **`poweragency/landing-poweragency`** · **deploy automatico a ogni push su `main`**.
- Il vecchio progetto `poweragency-web` è stato **eliminato** (2026-06): NON cercare il HUB altrove. Pagine: `/`, `/agenzia-lead-generation` (landing SEO dedicata alla keyword "agenzia lead generation", creata 2026-06-23 da PowerSEO), `/ecosistema`, `/software`, `/crm` (OMBRELLO della linea gestionali: su misura + prodotti verticali), `/gestionale-carrozzeria` (prodotto verticale carrozzeria, landing SEO; pagina di nicchia FUORI dall'header, linkata da /crm + sitemap), `/prop`, `/ecommerce` + legali (privacy/termini/cookie con dati fiscali reali da `lib/content.ts`). `/shop` NON è una pagina: è un **redirect** (`next.config.mjs`) verso lo shop prodotti su `https://shop.poweragency.it` (app Astro separata, repo `POWERAGENCY ECOM`), presente in `NAV_LINKS` come voce "Shop". NB: `/ecommerce` è invece la pagina-verticale sull'esperienza ecommerce di PA, da non confondere con lo shop. Sempre in `next.config.mjs` ci sono i **redirect 308 di compatibilità** `/it` → `/` e `/it/:path*` → `/:path*`: eredità del vecchio hub multilingua (route `[locale]`), per chiudere i 404/duplicati residui in Google Search Console.
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
- Il case carrozzeria resta **anonimo** (mai nome/città).
- **Strategia verticali (agg. 2026-06-24):** PA ha due linee — gestionali **su misura** (servizio) e **prodotti verticali** per nicchia (prodotto). Ogni prodotto verticale può avere la sua **landing SEO dedicata** (es. `/gestionale-carrozzeria`), MA le pagine di nicchia stanno **FUORI dall'header** (no voce in `NAV_LINKS`): si raggiungono dall'ombrello `/crm`, dal footer e dalla sitemap. L'header resta a livello categoria. (Aggiorna la vecchia regola "carrozzeria non come pagina dedicata": ora è ammessa come landing verticale, purché non in header e con `/crm` come hub.)

## Blog (dal 2026-06-23)
- Sezione `/blog` (indice) + `/blog/[slug]` (articolo). **Sorgente = file markdown** in `content/blog/*.md` (frontmatter: `title`, `description`, `keyword`, `date`, `author` + opzionale `updated` = data ultimo refresh del contenuto, dal 07/07/2026). Letti/parsati da `lib/blog.ts` (parser frontmatter minimale + `marked` per md→HTML). Blog interamente statico (`dynamicParams = false`, `generateStaticParams`).
- **Freshness (GAIO, dal 07/07/2026):** se il frontmatter ha `updated`, l'articolo mostra "Aggiornato il ..." accanto alla data, lo schema `BlogPosting` usa `dateModified = updated` e la sitemap usa `updated` come `lastModified`. I contenuti citati dagli AI sono ~3x più spesso aggiornati da <30gg: il refresh periodico degli articoli (statistiche aggiornate + `updated` nel frontmatter) è una leva, non cosmesi.
- SEO: `pageMeta()` per indice e per-articolo; JSON-LD `Blog` (indice) e `BlogPosting` + `BreadcrumbList` (articolo) via `articleSchema`/`breadcrumbSchema` in `lib/structured-data.ts`. Articoli aggiunti dinamicamente in `app/sitemap.ts`. Corpo articolo stilizzato con `.prose-pa` in `globals.css` (on-brand, no plugin typography).
- **Workflow di pubblicazione:** gli articoli li genera **PowerSEO** (`Z:\SAAS\POWERSEO`) come nuovo `.md`. **AUTOMATICO dal 25/06**, **auto-pubblicazione con gate dal 29/06:** la routine cloud `/schedule` "PowerSEO blog" (lun 08:00) genera → umanizza (EEAT) → auto-giudica → se promuovibile **e** build Vercel verde **auto-mergia** (LIVE), altrimenti apre PR `[DA RIVEDERE]` per la revisione umana. (L'on-page resta report+PR+revisione umana, mai auto-merge.) **Dal 06/07 i topic vengono dalle query GSC in crescita** (snapshot nel repo powerseo), lista nicchie = fallback.
- **On-page automatico (dal 06/07):** routine cloud mensile "PowerSEO on-page quick-win" (16 del mese ~09:00) → PR `[ON-PAGE]` su questo repo, **sempre revisione umana, mai auto-merge**.
- **Avvisi email (dal 06/07):** `.github/workflows/pr-alert.yml` manda una email (Resend, secret `RESEND_API_KEY`) a `admin@poweragency.it` SOLO per le PR che richiedono revisione umana: titolo `[ON-PAGE]` o label `needs-human`. Le PR auto-pubblicate non generano email. Pattern: brain `[[avvisi-pr-needs-human-action-resend]]`.

## IndexNow → Bing/ChatGPT/Copilot (dal 2026-07-07)
- **Perché:** Bing alimenta ChatGPT Search e Copilot; Bingbot ci ricrawlava quasi mai (6 impression
  in 2 mesi in BWT, warning basati su crawl stale del vecchio hub). IndexNow gli notifica gli URL.
- **Come:** chiave = `public/<hex32>.txt` (pubblica by design, servita alla root); script
  `scripts/indexnow-ping.mjs` (zero-dep: legge la sitemap di prod e POSTa a `api.indexnow.org`);
  workflow `.github/workflows/indexnow.yml` a ogni push su main (`--wait` polla il key file live
  prima di pingare, il deploy Vercel corre in parallelo). Ping manuale: `node scripts/indexnow-ping.mjs`.
- Monitoraggio: BWT → IndexNow (URL ricevuti) e **AI Performance** (citazioni Copilot). Contesto GAIO:
  brain `[[gaio-rankare-nelle-risposte-llm]]`, pilastro GAIO di PowerSEO.

## Analytics & cookie consent — CMP completo (2026-07-10, prima 2026-06-27)
- **GA4** (proprietà *PowerAgency Web*, `G-Q2F9MKE0YZ`) — zero deps. Helper in `lib/gtag.ts` (`GA_ID`, `gaEvent`). **Blocco preventivo:** `gtag.js` NON è più nel layout: lo inietta `components/AnalyticsLoader.tsx` SOLO dopo consenso "analytics". L'init inline in `app/layout.tsx` prepara solo la coda dataLayer + Consent Mode v2 (default denied, difesa in profondità).
- **CMP:** `components/CookieBanner.tsx` = banner a 3 scelte (Accetta tutti / Rifiuta non necessari / Personalizza) + pannello granulare per categoria. Consenso in localStorage `pa_consent` (JSON: `{id, version, categories, ts}` — migra la vecchia chiave `pa_cookie_consent`), logica in `lib/consent.ts` (`POLICY_VERSION` da tenere allineata alla data in `app/cookie/page.tsx`). Revoca/modifica sempre possibile dal link "Preferenze cookie" nel footer (`components/CookiePreferencesLink.tsx`, evento `pa:open-cookie-preferences`). **Re-prompt su cambio versione (11/07):** un consenso salvato con `version ≠ POLICY_VERSION` NON è valido → banner riappare e analytics resta spento finché l'utente non ri-sceglie (`getConsent()` in `lib/consent.ts` + check versione nell'inline script del layout — tenere in sync). Bumpare `POLICY_VERSION` SOLO per modifiche sostanziali della policy.
- **Pagine legali dall'hub centrale (11/07):** `/privacy`, `/termini` e `/dpa` NON hanno più testi nel repo — contenuto da `crm.poweragency.it/api/legal/[slug]` (tabella `legal_docs` Power Hub, ISR 1h) via `lib/legal.ts` + `components/LegalHubDoc.tsx` (markdown → `marked` → `prose-pa`). `/cookie` resta per-sito (agganciata al CMP). Modello: brain `[[hub-legale-legal-docs-power-hub]]`.
- **Prova del consenso (GDPR art. 7):** ogni scelta → POST `/api/consent` (`app/api/consent/route.ts`) → inoltro server-to-server al webhook Power Hub `/api/webhooks/consent` (stesso secret `POWERHUB_WEBFORM_SECRET` del form lead) → tabella `cookie_consent_log` (append-only: consent_id, sito, azione, categorie, versione policy, ip hashato, timestamp).
- **Lead tracking:** `LeadModal.tsx` spara `gaEvent("generate_lead", {source, sector})` sul submit ok (`/api/lead`). Da marcare come *evento chiave* in GA4 → KPI lead nel report di crescita PowerSEO. ⚠️ Prima del 27/06 GA4 NON era installato (proprietà vuota). Pattern: brain `[[ga4-consent-mode-nextjs-zero-dip]]`.

## Brand
Email `info@poweragency.it` · IG `@_poweragency_` · logo ufficiale **PAI** (monogramma metallico + nodo AI, wordmark "POWER AGENCY · AI AUTOMATION & SaaS SYSTEM"). Master: `public/brand/source/logo-master.jpeg`. Derivati (sfondo trasparente): `public/brand/logo-horizontal.png` = **lockup orizzontale** (monogramma + wordmark affiancati), usato così com'è nell'header/footer da `components/Logo.tsx` (niente testo HTML); `public/brand/logo.png` = lockup impilato completo, usato in JSON-LD. Palette: base scuro `#0a0606`, accento arancio **rame** `#ca6f2a` (gradient ambra→rame→bronzo `#f6a64a → #ca6f2a → #a8401a`, allineato all'arancione del logo PAI dal 22/06/2026), font Space Grotesk (`font-head`) + Inter.

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

**Copertine prodotto** `public/products/<slug>.jpg` (powerleads/powersocial/powerlanding): NON generate
da `gen-assets.mjs` — sono **copiate dallo shop** (`POWERAGENCY ECOM/web/public/products/`, generate lì con
fal.ai, 16:10). Le usa `SoftwareDetail.tsx` come visual delle card `/software` (campo `cover` in `SOFTWARE`,
fallback al placeholder a icona se assente). Per aggiornarle: ricopiarle dallo shop, non rigenerarle qui.

**Asset social/manuali** (non usati dal sito): `node scripts/brand/ig-profile.mjs` genera la foto
profilo Instagram (1080×1080, monogramma nell'area sicura del cerchio) in `Z:\SAAS\5.loghi pa\`,
dove c'è anche il set export `PA-*.png` (logo orizzontale/verticale, monogramma, icona, OG) accanto al master.
