// Google Analytics 4 (Google tag) — proprietà "PowerAgency Web".
// Installato via next/script nel layout (vedi app/layout.tsx). Helper per
// inviare eventi lato client (es. generate_lead dal form lead).

export const GA_ID = "G-Q2F9MKE0YZ";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

/** Invia un evento GA4 se il tag è caricato (no-op in SSR o se assente). */
export function gaEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params ?? {});
  }
}

// ── Consenso cookie (Google Consent Mode v2) ───────────────────────────────
// Default = negato (impostato nel tag in layout.tsx). Il banner aggiorna il
// consenso e lo memorizza; ai caricamenti successivi il default lo rilegge.
export const CONSENT_KEY = "pa_cookie_consent";
export type Consent = "granted" | "denied";

export function getStoredConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Memorizza la scelta e aggiorna il consenso analytics nel tag GA4. */
export function setAnalyticsConsent(granted: boolean) {
  const value: Consent = granted ? "granted" : "denied";
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage non disponibile */
  }
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: value });
  }
}
