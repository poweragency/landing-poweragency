"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  getConsent,
  saveConsent,
  OPEN_PREFERENCES_EVENT,
} from "@/lib/consent";

// Banner CMP: alla prima visita nessun cookie non necessario è attivo e
// l'utente sceglie tra "Accetta tutti" / "Rifiuta non necessari" /
// "Personalizza" (toggle per categoria). Riapribile in ogni momento dal link
// "Preferenze cookie" nel footer (evento OPEN_PREFERENCES_EVENT) per
// modificare o revocare il consenso. Ogni scelta è registrata nel registro
// consensi (lib/consent.ts → /api/consent).
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [firstChoice, setFirstChoice] = useState(true);

  useEffect(() => {
    const stored = getConsent();
    setShow(stored === null);
    setAnalytics(stored?.categories.analytics ?? false);
    setFirstChoice(stored === null);

    const openPrefs = () => {
      const current = getConsent();
      setAnalytics(current?.categories.analytics ?? false);
      setFirstChoice(current === null);
      setPrefs(true);
      setShow(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPrefs);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPrefs);
  }, []);

  const close = useCallback(() => {
    setShow(false);
    setPrefs(false);
  }, []);

  if (!show) return null;

  const acceptAll = () => {
    saveConsent(true, "accept_all");
    close();
  };
  const rejectAll = () => {
    saveConsent(false, firstChoice ? "reject_all" : "revoke");
    close();
  };
  const savePrefs = () => {
    saveConsent(analytics, firstChoice ? "custom" : "update");
    close();
  };

  const btnGhost =
    "rounded-full border border-line px-5 py-2.5 font-head text-[0.9rem] font-semibold text-ink transition-colors hover:border-line-strong";
  const btnSolid =
    "rounded-full bg-gradient-to-r from-amber via-orange to-red px-6 py-2.5 font-head text-[0.9rem] font-semibold text-[#1a0a03] transition-opacity hover:opacity-95";

  return (
    <div
      role="dialog"
      aria-label="Preferenze cookie"
      aria-modal="false"
      className="fixed inset-x-3 bottom-3 z-[400] mx-auto max-w-3xl rounded-[18px] border border-line-strong p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] sm:p-6"
      style={{
        background:
          "radial-gradient(circle at 0% 0%, rgba(202,111,42,0.14), transparent 55%), #16100d",
      }}
    >
      {!prefs ? (
        <div className="flex flex-col gap-4">
          <p className="text-[0.92rem] leading-relaxed text-mut">
            Questo sito usa cookie tecnici necessari e, solo con il tuo consenso,
            cookie analitici (Google Analytics 4) per capire come viene usato il
            sito. Nessun cookie non necessario viene installato prima della tua
            scelta, che puoi modificare o revocare in ogni momento da
            &ldquo;Preferenze cookie&rdquo; nel footer.{" "}
            <Link href="/cookie" className="text-orange underline underline-offset-2">
              Cookie policy
            </Link>
            .
          </p>
          <div className="flex flex-wrap justify-end gap-3">
            <button onClick={() => setPrefs(true)} data-cursor="hover" className={btnGhost}>
              Personalizza
            </button>
            <button onClick={rejectAll} data-cursor="hover" className={btnGhost}>
              Rifiuta non necessari
            </button>
            <button onClick={acceptAll} data-cursor="hover" className={btnSolid}>
              Accetta tutti
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="font-head text-[1.02rem] font-semibold text-ink">
            Preferenze cookie
          </p>

          <div className="flex items-start justify-between gap-4 rounded-[12px] border border-line p-4">
            <div>
              <p className="font-head text-[0.92rem] font-semibold text-ink">
                Necessari <span className="font-normal text-dim">— sempre attivi</span>
              </p>
              <p className="mt-1 text-[0.86rem] leading-relaxed text-mut">
                Archiviazione tecnica indispensabile al funzionamento del sito e
                alla memorizzazione di questa scelta. Non richiede consenso.
              </p>
            </div>
            <input type="checkbox" checked disabled aria-label="Cookie necessari (sempre attivi)" className="mt-1 h-5 w-5 accent-[#ca6f2a] opacity-60" />
          </div>

          <div className="flex items-start justify-between gap-4 rounded-[12px] border border-line p-4">
            <div>
              <p className="font-head text-[0.92rem] font-semibold text-ink">Analitici</p>
              <p className="mt-1 text-[0.86rem] leading-relaxed text-mut">
                Google Analytics 4 (cookie <code>_ga</code>, <code>_ga_Q2F9MKE0YZ</code>,
                durata 2 anni): statistiche aggregate su visite e pagine. Lo
                script si carica solo se attivi questa categoria.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              aria-label="Consenti cookie analitici"
              className="mt-1 h-5 w-5 cursor-pointer accent-[#ca6f2a]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/cookie" className="text-[0.86rem] text-orange underline underline-offset-2">
              Leggi la cookie policy
            </Link>
            <div className="flex flex-wrap gap-3">
              <button onClick={rejectAll} data-cursor="hover" className={btnGhost}>
                Rifiuta non necessari
              </button>
              <button onClick={savePrefs} data-cursor="hover" className={btnSolid}>
                Salva preferenze
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
