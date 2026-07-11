import LegalHubDoc from "@/components/LegalHubDoc";
import { fetchLegalDoc } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

// DPA (accordo sul trattamento dei dati, art. 28 GDPR): parte integrante dei
// Termini e Condizioni per i clienti dei prodotti SaaS. Contenuto dall'hub
// centrale (legal_docs su Power Hub). Vedi lib/legal.ts.

export const metadata = pageMeta({
  title: "Data Processing Agreement (DPA)",
  description:
    "Accordo sul trattamento dei dati personali ex art. 28 GDPR per i servizi SaaS Power Agency.",
  path: "/dpa",
});

export default async function DpaPage() {
  const doc = await fetchLegalDoc("dpa");
  return <LegalHubDoc doc={doc} fallbackTitle="Data Processing Agreement" />;
}
