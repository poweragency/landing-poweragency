import PageHero from "@/components/PageHero";
import SoftwareDetail from "@/components/SoftwareDetail";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import { SOFTWARE, SOFTWARE_FAQ } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { serviceSchema, faqSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "PowerLeads, PowerSocial e PowerLanding: i software che usiamo ogni giorno sul nostro business prima di portarli fuori. Lead generation, social e siti che convertono.";

export const metadata = pageMeta({
  title: "Software proprietari",
  description: DESCRIPTION,
  path: "/software",
});

export default function SoftwarePage() {
  return (
    <main id="top">
      <JsonLd
        data={[
          serviceSchema({
            name: "Software proprietari PowerAgency",
            description: DESCRIPTION,
            path: "/software",
            serviceType: "Software e siti web AI-powered",
          }),
          faqSchema(SOFTWARE_FAQ),
        ]}
      />
      <PageHero
        kicker="I software proprietari"
        title={
          <>
            Software che usiamo <span className="grad-text">prima di vendere.</span>
          </>
        }
        lead="Tre strumenti nati dalle nostre operazioni quotidiane: lead generation, contenuti e siti. Ognuno testato sul campo, non in una demo."
      />

      {SOFTWARE.map((s) => (
        <SoftwareDetail key={s.slug} software={s} />
      ))}

      <Faq
        title={<>Domande sui software</>}
        items={SOFTWARE_FAQ}
        related={[
          { label: "Il CRM su misura", href: "/crm" },
          { label: "Vai a PowerLeads", href: "https://powerleads.poweragency.it", external: true },
        ]}
      />

      <div className="pt-8">
        <CTA
          kicker="Provali sul campo"
          title="Vuoi i nostri software"
          titleAccent="al lavoro per te?"
          lead="Ti mostriamo PowerLeads, PowerLanding e gli altri al lavoro su operazioni reali, non in una demo. Una call, zero impegno."
          primaryLabel="Richiedi una demo"
        />
      </div>
    </main>
  );
}
