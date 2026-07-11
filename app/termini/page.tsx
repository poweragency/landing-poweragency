import LegalHubDoc from "@/components/LegalHubDoc";
import { fetchLegalDoc } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

// Termini e Condizioni quadro (servizi di agenzia + SaaS): contenuto
// dall'hub centrale (legal_docs su Power Hub). Vedi lib/legal.ts.

export const metadata = pageMeta({
  title: "Termini e Condizioni",
  description: "Termini e condizioni dei servizi e prodotti Power Agency.",
  path: "/termini",
});

export default async function TerminiPage() {
  const doc = await fetchLegalDoc("termini");
  return <LegalHubDoc doc={doc} fallbackTitle="Termini e Condizioni" />;
}
