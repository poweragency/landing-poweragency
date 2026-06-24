import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Icon from "@/components/Icon";
import CTA from "@/components/CTA";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import MagneticButton from "@/components/MagneticButton";
import { GESTIONALI, GESTIONALI_FAQ } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { serviceSchema, faqSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "Gestionali e CRM verticali su misura: lead, preventivi, lavorazioni e follow-up in un'unica pipeline. Su misura per la tua azienda, o come prodotto verticale pronto per la tua nicchia.";

export const metadata = pageMeta({
  title: "Gestionali e CRM verticali su misura",
  description: DESCRIPTION,
  path: "/crm",
});

export default function CrmPage() {
  return (
    <main id="top">
      <JsonLd
        data={[
          serviceSchema({
            name: "Gestionali e CRM verticali su misura PowerAgency",
            description: DESCRIPTION,
            path: "/crm",
            serviceType: "Sviluppo gestionali e CRM verticali su misura",
          }),
          faqSchema(GESTIONALI_FAQ),
        ]}
      />

      <PageHero
        kicker={GESTIONALI.hero.kicker}
        title={
          <>
            {GESTIONALI.hero.title}{" "}
            <span className="grad-text">{GESTIONALI.hero.titleAccent}</span>
          </>
        }
        lead={GESTIONALI.hero.lead}
      >
        <MagneticButton
          href="#contatti"
          className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber via-orange to-red px-7 py-4 font-head text-base font-semibold text-[#1a0a03] shadow-[0_10px_40px_-8px_rgba(168,64,26,0.55)]"
        >
          Parliamone in una call
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </MagneticButton>
      </PageHero>

      {/* Due modi di lavorare: su misura vs prodotto verticale */}
      <section className="px-6 pb-24 pt-8">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            kicker="Come lavoriamo"
            title="Su misura per te, o pronto per la tua nicchia"
            lead="Due strade per lo stesso obiettivo: un gestionale che lavora come la tua azienda, non il contrario."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {GESTIONALI.lines.map((l, i) => (
              <Reveal key={l.title} delay={(i % 2) * 0.1}>
                <TiltCard className="h-full">
                  <article className="ring-grad flex h-full flex-col rounded-[18px] border border-line bg-gradient-to-b from-surface to-bg p-8 transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(168,64,26,0.4)]">
                    <div className="mb-5 grid h-14 w-14 place-items-center rounded-[14px] border border-line-strong bg-orange/10">
                      <Icon name={l.icon} className="h-6 w-6 text-orange" />
                    </div>
                    <h3 className="font-head text-[1.28rem] font-semibold tracking-tight">
                      {l.title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] text-mut">{l.text}</p>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Perché un nostro gestionale */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            kicker="Cosa fanno tutti i nostri gestionali"
            title="Dal lead alla consegna, un posto solo"
            lead="Qualunque sia il settore, presidiamo i punti in cui di solito i contatti e i preventivi si perdono."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {GESTIONALI.why.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.1}>
                <TiltCard className="h-full">
                  <article className="ring-grad flex h-full flex-col rounded-[18px] border border-line bg-surface p-7 transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(168,64,26,0.4)]">
                    <div className="mb-5 grid h-13 w-13 place-items-center rounded-[14px] border border-line-strong bg-orange/10">
                      <Icon name={w.icon} className="h-6 w-6 text-orange" />
                    </div>
                    <h3 className="font-head text-[1.18rem] font-semibold tracking-tight">
                      {w.title}
                    </h3>
                    <p className="mt-2.5 text-[0.95rem] text-mut">{w.text}</p>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prodotto verticale in evidenza: carrozzeria */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <div className="ring-grad relative overflow-hidden rounded-[22px] border border-line-strong bg-gradient-to-b from-surface-2 to-bg p-[clamp(28px,5vw,56px)]">
              <span className="font-head text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-orange">
                Prodotto verticale pronto
              </span>
              <h2 className="mt-3 max-w-[20ch] font-head text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                Il gestionale per <span className="grad-text">carrozzeria</span>
              </h2>
              <p className="mt-4 max-w-[60ch] text-[1rem] text-mut">
                Il primo dei nostri prodotti verticali: lead, preventivi, pratiche e
                follow-up automatici via email e WhatsApp, già pronto per le carrozzerie.
                C&apos;è una demo navigabile.
              </p>
              <div className="mt-7">
                <MagneticButton
                  href="/gestionale-carrozzeria"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber via-orange to-red px-7 py-4 font-head text-base font-semibold text-[#1a0a03] shadow-[0_10px_40px_-8px_rgba(168,64,26,0.55)]"
                >
                  Scopri il gestionale carrozzeria
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq
        title={<>Domande sui gestionali</>}
        items={GESTIONALI_FAQ}
        related={[
          { label: "Il gestionale per carrozzeria", href: "/gestionale-carrozzeria" },
          { label: "I nostri software", href: "/software" },
          { label: "Tutti i servizi", href: "/" },
        ]}
      />

      <div className="pt-8">
        <CTA
          kicker="Il gestionale del tuo settore"
          title="Vuoi un gestionale cucito sul tuo"
          titleAccent="settore?"
          lead="Ti diciamo se per il tuo settore ha senso un gestionale su misura o un prodotto verticale. Una call, zero impegno."
          primaryLabel="Prenota una call"
        />
      </div>
    </main>
  );
}
