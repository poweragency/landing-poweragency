import PageHero from "@/components/PageHero";
import CrmShowcase from "@/components/CrmShowcase";
import CaseStudy from "@/components/CaseStudy";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import MagneticButton from "@/components/MagneticButton";
import { GESTIONALE_CARROZZERIA, GESTIONALE_CARROZZERIA_FAQ } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { serviceSchema, faqSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "Gestionale per carrozzeria che trasforma i lead in clienti: preventivi, pratiche e follow-up automatici via email e WhatsApp. Si integra col tuo gestionale. Prova la demo.";

export const metadata = pageMeta({
  title: "Gestionale carrozzeria: CRM, preventivi e follow-up",
  description: DESCRIPTION,
  path: "/gestionale-carrozzeria",
});

export default function GestionaleCarrozzeriaPage() {
  return (
    <main id="top">
      <JsonLd
        data={[
          serviceSchema({
            name: "Gestionale per carrozzeria PowerAgency",
            description: DESCRIPTION,
            path: "/gestionale-carrozzeria",
            serviceType: "Gestionale e CRM per carrozzeria",
          }),
          faqSchema(GESTIONALE_CARROZZERIA_FAQ),
        ]}
      />

      <PageHero
        kicker={GESTIONALE_CARROZZERIA.hero.kicker}
        title={
          <>
            {GESTIONALE_CARROZZERIA.hero.title}{" "}
            <span className="grad-text">{GESTIONALE_CARROZZERIA.hero.titleAccent}</span>
          </>
        }
        lead={GESTIONALE_CARROZZERIA.hero.lead}
      >
        <MagneticButton
          href="#contatti"
          className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber via-orange to-red px-7 py-4 font-head text-base font-semibold text-[#1a0a03] shadow-[0_10px_40px_-8px_rgba(168,64,26,0.55)]"
        >
          Prenota una demo
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </MagneticButton>
      </PageHero>

      <CrmShowcase />

      <CaseStudy />

      <Faq
        title={<>Domande sul gestionale carrozzeria</>}
        items={GESTIONALE_CARROZZERIA_FAQ}
        related={[
          { label: "Gestionali e CRM verticali", href: "/crm" },
          { label: "La lead generation con PowerLeads", href: "/software" },
        ]}
      />

      <div className="pt-8">
        <CTA
          kicker="Il gestionale della tua carrozzeria"
          title="Pronto a non perdere più un"
          titleAccent="preventivo?"
          lead="Ti mostriamo il gestionale sui numeri veri di una carrozzeria e come lo attiviamo sulla tua. Una call, zero impegno."
          primaryLabel="Prenota una demo"
        />
      </div>
    </main>
  );
}
