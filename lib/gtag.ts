// Google Analytics 4 (Google tag) — proprietà "PowerAgency Web".
// Lo script gtag.js è caricato SOLO dopo consenso analitico
// (components/AnalyticsLoader.tsx); il Consent Mode v2 è impostato nel layout.
// La gestione del consenso vive in lib/consent.ts.

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
