import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Icon from "@/components/Icon";
import CTA from "@/components/CTA";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import MagneticButton from "@/components/MagneticButton";
import { ECOSISTEMA, ECOSISTEMA_FAQ } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { serviceSchema, faqSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "Sito che converte, lead generation con qualifica AI e CRM in un'unica infrastruttura: un sistema integrato di acquisizione clienti. Lo costruiamo e lo usiamo prima sui nostri business.";

export const metadata = pageMeta({
  title: "Sistema integrato di acquisizione clienti",
  description: DESCRIPTION,
  path: "/ecosistema",
});

export default function EcosistemaPage() {
  return (
    <main id="top">
      <JsonLd
        data={[
          serviceSchema({
            name: "Sistema integrato di acquisizione clienti PowerAgency",
            description: DESCRIPTION,
            path: "/ecosistema",
            serviceType: "Sistema integrato: sito, lead generation e CRM con AI",
          }),
          faqSchema(ECOSISTEMA_FAQ),
        ]}
      />

      <PageHero
        kicker={ECOSISTEMA.hero.kicker}
        title={
          <>
            {ECOSISTEMA.hero.title}{" "}
            <span className="grad-text">{ECOSISTEMA.hero.titleAccent}</span>
          </>
        }
        lead={ECOSISTEMA.hero.lead}
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

      {/* Le tre componenti */}
      <section className="px-6 pb-24 pt-8">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            kicker="Come funziona"
            title="Un ecosistema, tre componenti"
            lead="Le costruiamo perché lavorino insieme dal primo giorno: un solo database, una sola interfaccia. Niente tool da coordinare a mano."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {ECOSISTEMA.pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.1}>
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

      {/* Come lavoriamo */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            kicker="Come lavoriamo"
            title="4 step, 30 giorni operativi"
            lead="Un percorso definito, con consegne misurabili a ogni step. Niente sviluppo eterno, niente preventivi nebulosi."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ECOSISTEMA.process.map((s, i) => (
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

      <Faq
        title={<>Domande sull&apos;ecosistema</>}
        items={ECOSISTEMA_FAQ}
        related={[
          { label: "Agenzia di lead generation", href: "/agenzia-lead-generation" },
          { label: "Gestionali e CRM verticali", href: "/crm" },
          { label: "I nostri software", href: "/software" },
        ]}
      />

      <CTA
        kicker="Il prossimo passo"
        title="Pronto a vedere come funziona sul tuo"
        titleAccent="business?"
        lead="30 minuti, zero impegno. Ti diciamo se siamo i partner giusti — e se non lo siamo, ti diciamo chi cercare."
        primaryLabel="Prenota la call"
      />
    </main>
  );
}
