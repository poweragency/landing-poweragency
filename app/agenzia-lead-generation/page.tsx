import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Icon from "@/components/Icon";
import CTA from "@/components/CTA";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import MagneticButton from "@/components/MagneticButton";
import { LEAD_GEN, LEAD_GEN_FAQ, CASE_METRICS } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { serviceSchema, faqSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "Agenzia di lead generation B2B: attiriamo e qualifichiamo i contatti con l'AI e te li consegniamo pronti a comprare. Sito, campagne e CRM in un solo sistema, usato prima sul nostro business.";

export const metadata = pageMeta({
  title: "Agenzia Lead Generation B2B con AI",
  description: DESCRIPTION,
  path: "/agenzia-lead-generation",
});

export default function LeadGenerationPage() {
  return (
    <main id="top">
      <JsonLd
        data={[
          serviceSchema({
            name: "Agenzia di lead generation B2B PowerAgency",
            description: DESCRIPTION,
            path: "/agenzia-lead-generation",
            serviceType: "Lead generation B2B con qualifica AI",
          }),
          faqSchema(LEAD_GEN_FAQ),
        ]}
      />

      <PageHero
        kicker={LEAD_GEN.hero.kicker}
        title={
          <>
            {LEAD_GEN.hero.title}{" "}
            <span className="grad-text">{LEAD_GEN.hero.titleAccent}</span>
          </>
        }
        lead={LEAD_GEN.hero.lead}
      >
        <MagneticButton
          href="#contatti"
          className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber via-orange to-red px-7 py-4 font-head text-base font-semibold text-[#1a0a03] shadow-[0_10px_40px_-8px_rgba(168,64,26,0.55)]"
        >
          Prenota una call
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </MagneticButton>
      </PageHero>

      {/* Cos'è un'agenzia di lead generation — intento informativo */}
      <section className="px-6 pb-20 pt-8">
        <div className="mx-auto max-w-[820px]">
          <SectionHead
            kicker={LEAD_GEN.definition.kicker}
            title={LEAD_GEN.definition.title}
          />
          <div className="mt-6 space-y-5">
            {LEAD_GEN.definition.paragraphs.map((p) => (
              <Reveal key={p.slice(0, 24)}>
                <p className="text-[1.02rem] leading-relaxed text-mut">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strategie di lead generation che usiamo */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            kicker="Come generiamo lead qualificati"
            title="Le strategie di lead generation che usiamo"
            lead="Non una tattica isolata: un sistema in cui acquisizione, qualifica AI e CRM lavorano come una macchina sola."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {LEAD_GEN.pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.1}>
                <TiltCard className="h-full">
                  <article className="ring-grad flex h-full flex-col rounded-[18px] border border-line bg-gradient-to-b from-surface to-bg p-8 transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(168,64,26,0.4)]">
                    <div className="mb-5 grid h-14 w-14 place-items-center rounded-[14px] border border-line-strong bg-orange/10">
                      <Icon name={p.icon} className="h-6 w-6 text-orange" />
                    </div>
                    <h3 className="font-head text-[1.28rem] font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] text-mut">{p.text}</p>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Come lavoriamo — il metodo in 4 step */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            kicker="Il metodo"
            title="Dalla call ai lead nel CRM, in 4 step"
            lead="Un percorso definito, con consegne misurabili a ogni step. Niente lavoro eterno, niente preventivi nebulosi."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {LEAD_GEN.process.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <div className="ring-grad relative h-full rounded-[18px] border border-line bg-surface p-7 transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(202,111,42,0.45)]">
                    <span className="grad-text font-head text-[2.4rem] font-bold leading-none">
                      {s.step}
                    </span>
                    <h3 className="mt-4 font-head text-[1.12rem] font-semibold">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[0.92rem] text-mut">{s.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prova reale — case carrozzeria (anonimo, numeri veri) */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            kicker="Una prova, non una promessa"
            title="Cosa significa lead generation che funziona"
            lead="Numeri reali da un nostro cliente nel verticale carrozzerie: stesso sistema che costruiamo per te."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {CASE_METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.1}>
                <div className="ring-grad h-full rounded-[18px] border border-line bg-surface p-8 text-center">
                  <div className="grad-text font-head text-[2.6rem] font-bold leading-none">
                    {m.value.toLocaleString("it-IT")}
                    {m.suffix}
                  </div>
                  <p className="mt-3 text-[0.95rem] text-mut">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq
        title={<>Domande sulla lead generation</>}
        items={LEAD_GEN_FAQ}
        related={[
          { label: "L'ecosistema completo", href: "/ecosistema" },
          { label: "Il CRM su misura", href: "/crm" },
          { label: "PowerLeads, il software", href: "/software" },
        ]}
      />

      <CTA
        kicker="Il prossimo passo"
        title="Pronto a ricevere lead che"
        titleAccent="comprano davvero?"
        lead="30 minuti, zero impegno. Ti diciamo se possiamo generare lead nel tuo settore — e se non siamo i partner giusti, ti diciamo chi cercare."
        primaryLabel="Prenota la call"
      />
    </main>
  );
}
