# PowerAgency — landing principale (project context)

> **Fonte unica di verità** per qualunque agent (Claude Code, Cursor, Copilot…) che lavori su questo progetto. Committato nel repo. Aggiornare qui a ogni cambio strutturale.

---

## 0. ⚠️ Questo È il progetto della landing principale

Questa cartella (`NUOVA LANDING PA`) **è** la landing PowerAgency reale, servita su **`www.poweragency.it`** (l'apex `poweragency.it` fa 307 → www).

- **Vercel project:** `landing-p-a` (id `prj_N7TecvJJhgyDtJHMbE2p5MZQQiOB`, team `poweragency`)
- **Repo GitHub:** `poweragency/landing-pa` — **deploy automatico** a ogni push su `main`
- **Vecchio progetto dismesso (2026-06-05):** `LANDING POWER AGENCY/web` (Vercel `poweragency-web`) è stato **eliminato**. Serviva `ai.poweragency.it` (ora 404). Non cercare lì il HUB. Resta solo come archivio GitHub `poweragency/poweragency-web`.

---

## 1. Chi è PowerAgency (per il copy)

Agenzia che costruisce **asset digitali che generano clienti: sito + lead generation + CRM, AI-powered**. Tesi centrale: *"non vendiamo teoria, usiamo i nostri stessi sistemi sul nostro business prima di proporli"*.

- **Fondatori/team:** Vincenzo (CEO, ecommerce), Wassim (head of power hedging, prop firms), Mattia (tecnico/software), William (CTO) + marketing (Gabriele, Giorgio).
- **Business interni reali (credibilità, NON in vendita):** ecommerce fino a **10.000€/day** (ancora attivo), **120+ account prop firm** gestiti con software interno.
- **Offerta in vendita:** il servizio completo sito+leadgen+CRM (pagina `/ecosistema`), il CRM su misura (`/crm`), i software proprietari (`/software`: PowerLeads, PowerSocial, PowerLanding).

### Regole di contenuto (vincolanti)
1. **Prezzi:** NON esporli in pagina. I prezzi dei SaaS vivono sulle loro landing → rimandare lì. Sito/CRM = "preventivo dopo audit / range in call".
2. **Bundling:** PowerLeads e PowerSocial = **SaaS in abbonamento** (self-service). Sito (PowerLanding) e CRM = **servizi su misura** (su preventivo).
3. **Numeri:** usare solo quelli reali approvati (10k/day, 120+ prop, case carrozzeria 60+ lead / 5 clienti / 15.000€ in 2 settimane). **Non inventare** altri numeri.
4. **Niente nicchie finte:** carrozzerie/dentisti/edili NON sono verticali reali da spingere come pagine dedicate (decisione utente 2026-06-05). Il case study carrozzeria resta **anonimo** (mai nome/città).
5. **Lingua:** IT, single-locale. Rispondere all'utente sempre in italiano.

---

## 2. Stack & vincoli

- **Next.js 16.2.6** (App Router) — ⚠️ breaking changes vs training data: `params` è una `Promise` (qui però nessuna route dinamica). Doc offline in `node_modules/next/dist/docs/`.
- **React 19**, **TypeScript 5**, **Tailwind CSS** (token custom: `bg-surface`, `border-line`/`line-strong`, `text-mut`/`dim`/`ink`, `grad-text`, `font-head`, `orange`/`amber`/`red`…).
- **React Three Fiber + three** (sfondo 3D), **framer-motion** (animazioni). `transpilePackages: ["three"]`.
- **Font:** Space Grotesk (display, `font-head`) + Inter (body).
- **Alias:** `@/*` → root (`./*`). Niente `src/`: tutto in `app/`, `components/`, `lib/`.

### Vincoli operativi
- **Git "dubious ownership"** (share SMB): prima di operazioni git serve `git config --global --add safe.directory "<path>"`.
- **Build locale lento/problematico su SMB** (Turbopack default). **Non aspettare `tsc` locale** all'infinito: il gate di build vero è **Vercel** (typecheck+build su push). Per verifica rapida basta `tsc --noEmit` se gira in tempi umani, altrimenti pushare e lasciar fare a Vercel.
- **Deploy = push su `main`** (no PR obbligatoria; storia a commit diretti).

---

## 3. Struttura

```
NUOVA LANDING PA/
├── app/
│   ├── layout.tsx              # metadata globali (metadataBase, OG, twitter, icona) + JsonLd Organization
│   ├── page.tsx                # HOME: Hero · Stats · Manifesto · Team · Faq · CTA
│   ├── ecosistema/page.tsx     # servizio completo sito+leadgen+CRM
│   ├── software/page.tsx       # PowerLeads · PowerSocial · PowerLanding
│   ├── crm/page.tsx            # CRM su misura + CaseStudy (carrozzeria)
│   ├── prop/page.tsx           # verticale credibilità prop firms
│   ├── ecommerce/page.tsx      # verticale credibilità ecommerce
│   ├── privacy|termini|cookie/page.tsx
│   ├── og/route.tsx            # immagine OG 1200x630 (next/og) — referenziata come /og
│   ├── robots.ts · sitemap.ts  # SEO
│   └── api/lead/route.ts       # endpoint form lead capture
├── components/                 # Nav, Footer, Hero, Faq, CTA, PageHero, SectionHead,
│                               # Reveal, TiltCard, Icon, CaseStudy, *Showcase, LeadModal…
├── lib/
│   ├── content.ts              # ⭐ SINGLE SOURCE OF CONTENT: NAV_LINKS, STATS, SOFTWARE,
│   │                           #   CRM, ECOSISTEMA, *_FAQ, TEAM, CONTACT, ecc.
│   ├── seo.ts                  # SITE_URL, OG_IMAGE, pageMeta() (canonical + OG + twitter)
│   ├── structured-data.ts      # organizationSchema/websiteSchema/serviceSchema/faqSchema
│   └── motion.ts               # EASE
└── public/                     # team/*.jpg (foto reali), brand/logo.png
```

---

## 4. Convenzioni (rispettarle per coerenza)

- **Contenuti → sempre in `lib/content.ts`**, mai hardcoded sparsi. Le pagine importano i dati da lì.
- **SEO per pagina:** `export const metadata = pageMeta({ title, description, path })` (da `lib/seo.ts`) → genera canonical self-ref + Open Graph + Twitter + immagine OG. La HOME usa i default nel `layout.tsx`.
- **Structured data:** `<JsonLd data={...} />` (server component) con i builder di `lib/structured-data.ts`. `Organization` è site-wide (layout); le pagine aggiungono `Service`/`FAQPage`/`WebSite`. Service referenzia l'org via `@id` (presente nel layout).
- **Immagine OG:** generata da `app/og/route.tsx`, referenziata esplicitamente come `/og` in `pageMeta` (NON via convenzione file `opengraph-image`, per evitare che gli override per-pagina la perdano).
- **Pagine = server components** (esportano `metadata`). Le animazioni stanno in **componenti client** (`Reveal`, `TiltCard`, `motion`): una pagina server NON può usare `motion`/hook direttamente → wrappare in `Reveal`/`TiltCard`.
- **Pattern pagina-servizio (asciutto, da seguire):** `PageHero` → 1-2 sezioni showcase (`SectionHead` + griglia di `TiltCard`) → sezione `Faq` → `CTA`. Vedi `/ecosistema`, `/crm`, `/software`. **Niente duplicazioni** tra pagine (es. `CaseStudy` sta solo su `/crm`).
- **FAQ:** componente `Faq` (accordion `<details>`, risposte sempre nel DOM) + `faqSchema()` JSON-LD sulla stessa pagina. FAQ generiche in home, specifiche per pagina, **senza sovrapporsi**.

---

## 5. SEO / indicizzazione (stato 2026-06-05)

In essere: `metadataBase` + canonical self-ref su tutte le pagine, JSON-LD `Organization`+`WebSite` (home) / `Service`+`FAQPage` (pagine), immagine OG, `robots.txt` + `sitemap.xml`, sezioni FAQ con `FAQPage` schema, crosslink interni descrittivi. **Canonico = `www.poweragency.it`**.

Per scrivere FAQ/contenuti pensati per essere citati dalle AI (GEO): domanda = query reale, risposta-prima (BLUF) auto-conclusiva, fatti specifici, ~40-80 parole, entità nominata, una domanda = un'intenzione.

---

## 6. Contatti / brand

- Email: `info@poweragency.it` · Instagram: `@_poweragency_` (https://instagram.com/_poweragency_)
- Logo: `public/brand/logo.png` · Palette: base scuro `#0a0606`, accento arancio `#ff6a1a`/gradient amber→red.
- SaaS collegati (progetti Vercel separati, NON parte di questo repo): `powerleads.poweragency.it`, `powersocial.poweragency.it`, `crm-carrozzerie.vercel.app`, `powersite.vercel.app` (PowerLanding).
