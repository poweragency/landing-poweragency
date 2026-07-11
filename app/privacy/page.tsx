import LegalHubDoc from "@/components/LegalHubDoc";
import { fetchLegalDoc } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

// Privacy quadro dell'ecosistema: contenuto dall'hub centrale (legal_docs su
// Power Hub), NON nel repo. Vedi lib/legal.ts. La cookie policy resta
// per-sito in app/cookie.

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "Informativa sul trattamento dei dati personali di PowerAgency.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const doc = await fetchLegalDoc("privacy");
  return <LegalHubDoc doc={doc} fallbackTitle="Privacy Policy" />;
}
