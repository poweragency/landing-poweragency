// Documenti legali quadro dall'hub centrale Power Hub (tabella legal_docs,
// endpoint pubblico read-only). Modello "hub + schede": privacy/termini/DPA
// arrivano da qui e si aggiornano da soli (ISR 1h + cache CDN endpoint);
// la cookie policy resta per-sito (app/cookie) perché descrive gli script
// reali di QUESTO sito ed è versionata col CMP (lib/consent.ts).

import { marked } from "marked";

const LEGAL_HUB_URL =
  process.env.LEGAL_HUB_URL || "https://crm.poweragency.it/api/legal";

export type LegalDoc = {
  slug: string;
  version: string;
  titolo: string;
  html: string;
  validFrom: string;
};

export async function fetchLegalDoc(slug: string): Promise<LegalDoc | null> {
  try {
    const res = await fetch(`${LEGAL_HUB_URL}/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as {
      ok: boolean;
      doc?: {
        slug: string;
        version: string;
        titolo: string;
        contenuto_md: string;
        valid_from: string;
      };
    };
    if (!body.ok || !body.doc) return null;
    // Il markdown apre con "# TITOLO": lo togliamo, il titolo lo mette PageHero.
    const md = body.doc.contenuto_md.replace(/^#\s+.*\n/, "");
    return {
      slug: body.doc.slug,
      version: body.doc.version,
      titolo: body.doc.titolo,
      html: marked.parse(md, { async: false }) as string,
      validFrom: new Date(body.doc.valid_from).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  } catch {
    return null;
  }
}
