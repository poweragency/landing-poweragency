// CMP (Consent Management) di www.poweragency.it.
//
// Categorie gestite: `necessary` (sempre attiva, esente da consenso) e
// `analytics` (Google Analytics 4 — attivata SOLO dopo consenso esplicito;
// vedi components/AnalyticsLoader.tsx per il blocco preventivo).
//
// Ogni scelta viene: (1) persistita in localStorage, (2) propagata al tag GA4
// via Consent Mode v2, (3) registrata come prova del consenso via /api/consent
// (→ webhook Power Hub, tabella cookie_consent_log) con un identificativo
// tecnico anonimo del browser, la versione della policy e il timestamp.

export const POLICY_VERSION = "2026-07-10";
export const CONSENT_STORAGE_KEY = "pa_consent";
// Chiave del vecchio banner Accetta/Rifiuta (PR #10): migrata al primo accesso.
const LEGACY_KEY = "pa_cookie_consent";

export const CONSENT_CHANGED_EVENT = "pa:consent-changed";
export const OPEN_PREFERENCES_EVENT = "pa:open-cookie-preferences";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
};

export type ConsentAction =
  | "accept_all"
  | "reject_all"
  | "custom"
  | "update"
  | "revoke";

export type StoredConsent = {
  /** Identificativo tecnico del browser (UUID), abbinato al registro consensi. */
  id: string;
  /** Versione della cookie policy accettata/rifiutata. */
  version: string;
  categories: ConsentCategories;
  /** Timestamp ISO della scelta. */
  ts: string;
};

function parseStored(raw: string): StoredConsent | null {
  try {
    const v = JSON.parse(raw) as StoredConsent;
    if (
      typeof v?.id === "string" &&
      typeof v?.version === "string" &&
      typeof v?.ts === "string" &&
      typeof v?.categories?.analytics === "boolean"
    ) {
      return { ...v, categories: { necessary: true, analytics: v.categories.analytics } };
    }
  } catch {
    /* valore corrotto → come assente */
  }
  return null;
}

/** Lettura grezza: anche consensi di versioni precedenti (per riusare l'id). */
function readRaw(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) return parseStored(raw);

    // Migrazione dal vecchio banner Accetta/Rifiuta (formato pre-CMP).
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === "granted" || legacy === "denied") {
      const migrated: StoredConsent = {
        id: crypto.randomUUID(),
        version: "2026-06-27", // versione policy del vecchio banner
        categories: { necessary: true, analytics: legacy === "granted" },
        ts: new Date().toISOString(),
      };
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(migrated));
      localStorage.removeItem(LEGACY_KEY);
      return migrated;
    }
  } catch {
    /* storage non disponibile */
  }
  return null;
}

/**
 * Scelta corrente VALIDA, o null se l'utente non ha ancora scelto.
 * Un consenso espresso su una versione precedente della policy NON è più
 * valido (re-prompt): il banner ricompare e gli script non necessari restano
 * spenti finché l'utente non sceglie di nuovo. L'id tecnico si conserva
 * (readRaw) così lo storico nel registro resta collegato allo stesso browser.
 */
export function getConsent(): StoredConsent | null {
  const stored = readRaw();
  if (!stored) return null;
  return stored.version === POLICY_VERSION ? stored : null;
}

/** Cancella best-effort i cookie GA4 quando l'utente revoca gli analitici. */
function clearAnalyticsCookies() {
  const names = ["_ga", "_ga_Q2F9MKE0YZ"];
  const domains = ["", ".poweragency.it", ".www.poweragency.it"];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ""
      }`;
    }
  }
}

/**
 * Salva la scelta, aggiorna il Consent Mode del tag GA4, notifica i listener
 * (AnalyticsLoader) e registra la prova del consenso lato server.
 */
export function saveConsent(analytics: boolean, action: ConsentAction) {
  const prev = readRaw();
  const consent: StoredConsent = {
    id: prev?.id ?? crypto.randomUUID(),
    version: POLICY_VERSION,
    categories: { necessary: true, analytics },
    ts: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* storage non disponibile: il consenso vale per la sessione corrente */
  }

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
    });
  }
  if (!analytics && prev?.categories.analytics) {
    clearAnalyticsCookies();
  }

  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));

  // Prova del consenso: fire-and-forget, non deve mai bloccare l'utente.
  try {
    void fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        consentId: consent.id,
        action,
        categories: consent.categories,
        policyVersion: consent.version,
      }),
    });
  } catch {
    /* offline o bloccato: la scelta locale resta comunque applicata */
  }
}

/** Riapre il pannello preferenze del banner (link "Preferenze cookie" nel footer). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
