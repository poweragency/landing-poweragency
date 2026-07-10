"use client";

import { useEffect } from "react";
import { GA_ID } from "@/lib/gtag";
import { getConsent, CONSENT_CHANGED_EVENT } from "@/lib/consent";

const SCRIPT_ID = "ga4-src";

// Blocco preventivo degli analitici: gtag.js viene richiesto a Google SOLO
// dopo che l'utente ha acconsentito alla categoria "analytics" (nessuna
// richiesta a googletagmanager.com prima della scelta). Il Consent Mode v2
// impostato nel layout resta come difesa in profondità: anche a script
// caricato, analytics_storage segue la scelta dell'utente.
export default function AnalyticsLoader() {
  useEffect(() => {
    const loadIfGranted = () => {
      if (!getConsent()?.categories.analytics) return;
      if (document.getElementById(SCRIPT_ID)) return;
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);
    };
    loadIfGranted();
    window.addEventListener(CONSENT_CHANGED_EVENT, loadIfGranted);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, loadIfGranted);
  }, []);

  return null;
}
