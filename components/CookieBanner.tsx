"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredConsent, setAnalyticsConsent } from "@/lib/gtag";

// Banner di consenso cookie (Google Consent Mode v2). Appare solo se l'utente
// non ha ancora scelto. "Accetta" attiva analytics_storage; "Rifiuta" lo lascia
// negato. La scelta è memorizzata (lib/gtag.ts) e riletta al caricamento.
export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(getStoredConsent() === null);
  }, []);

  if (!show) return null;

  const choose = (granted: boolean) => {
    setAnalyticsConsent(granted);
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Consenso cookie"
      className="fixed inset-x-3 bottom-3 z-[400] mx-auto max-w-3xl rounded-[18px] border border-line-strong p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] sm:p-6"
      style={{
        background:
          "radial-gradient(circle at 0% 0%, rgba(202,111,42,0.14), transparent 55%), #16100d",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.92rem] leading-relaxed text-mut">
          Usiamo cookie analitici (Google Analytics) per capire come viene usato il sito e
          migliorarlo. Puoi accettare o rifiutare.{" "}
          <Link href="/cookie" className="text-orange underline underline-offset-2">
            Cookie policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => choose(false)}
            data-cursor="hover"
            className="rounded-full border border-line px-5 py-2.5 font-head text-[0.9rem] font-semibold text-ink transition-colors hover:border-line-strong"
          >
            Rifiuta
          </button>
          <button
            onClick={() => choose(true)}
            data-cursor="hover"
            className="rounded-full bg-gradient-to-r from-amber via-orange to-red px-6 py-2.5 font-head text-[0.9rem] font-semibold text-[#1a0a03] transition-opacity hover:opacity-95"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
