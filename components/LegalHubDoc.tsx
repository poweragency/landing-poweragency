import PageHero from "./PageHero";
import { CONTACT } from "@/lib/content";
import type { LegalDoc } from "@/lib/legal";

// Rende un documento legale quadro proveniente dall'hub centrale (lib/legal.ts).
// Se il documento non è raggiungibile (mai successo a regime: ISR conserva
// l'ultima versione generata), degrada con un recapito invece di una pagina rotta.
export default function LegalHubDoc({
  doc,
  fallbackTitle,
}: {
  doc: LegalDoc | null;
  fallbackTitle: string;
}) {
  if (!doc) {
    return (
      <main id="top">
        <PageHero kicker="Legale" title={fallbackTitle} lead="Documento temporaneamente non disponibile" />
        <section className="px-6 pb-28">
          <p className="mx-auto max-w-[760px] text-[0.98rem] leading-relaxed text-mut">
            Il documento non è al momento raggiungibile. Puoi richiederne copia a{" "}
            {CONTACT.email}.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main id="top">
      <PageHero
        kicker="Legale"
        title={doc.titolo}
        lead={`Versione ${doc.version} · in vigore dal ${doc.validFrom}`}
      />
      <section className="px-6 pb-28">
        <div
          className="prose-pa mx-auto max-w-[760px]"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </section>
    </main>
  );
}
