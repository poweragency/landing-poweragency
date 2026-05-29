import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VerticalShowcase from "@/components/VerticalShowcase";
import CTA from "@/components/CTA";
import { PROP } from "@/lib/content";

export const metadata: Metadata = {
  title: PROP.metaTitle,
  description: PROP.metaDescription,
};

export default function PropPage() {
  return (
    <main id="top">
      <PageHero
        kicker={PROP.kicker}
        title={
          <>
            {PROP.title} <span className="grad-text">{PROP.titleAccent}</span>
          </>
        }
        lead={PROP.lead}
      />

      <VerticalShowcase vertical={PROP} />

      <div className="pt-4">
        <CTA
          kicker="Sistematizza l'operatività"
          title="Vuoi sistematizzare i tuoi"
          titleAccent="account prop?"
          lead="Ti raccontiamo come gestiamo 120+ account con software interno e hedging automatico. Una call, zero fuffa."
          primaryLabel="Parliamone"
        />
      </div>
    </main>
  );
}
