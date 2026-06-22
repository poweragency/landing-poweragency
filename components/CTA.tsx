"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/content";
import { EASE } from "@/lib/motion";
import MagneticButton from "./MagneticButton";
import LeadModal from "./LeadModal";

type Props = {
  kicker?: string;
  title?: string;
  titleAccent?: string;
  lead?: string;
  primaryLabel?: string;
};

export default function CTA({
  kicker = "Costruiamo insieme",
  title = "Pronto a costruire un sistema che",
  titleAccent = "genera clienti?",
  lead = "Una call, zero impegno. Ti diciamo cosa funziona davvero per il tuo business. E se non è il caso, te lo diciamo.",
  primaryLabel = "Prenota una call",
}: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <section id="contatti" className="scroll-mt-24 px-6 pb-32 pt-4">
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[26px] border border-line-strong bg-gradient-to-b from-surface-2 to-bg px-[clamp(24px,5vw,64px)] py-[clamp(48px,8vw,96px)] text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(202,111,42,0.3), transparent 70%)",
            }}
          />

          <span className="relative font-head text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-orange">
            {kicker}
          </span>

          <h2 className="relative mx-auto mt-3.5 max-w-[20ch] font-head text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.025em]">
            {title} <span className="grad-text">{titleAccent}</span>
          </h2>

          <p className="relative mx-auto mt-5 max-w-[56ch] text-[1.05rem] text-mut">
            {lead}
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <MagneticButton
              onClick={() => setOpen(true)}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber via-orange to-red px-7 py-4 font-head text-base font-semibold text-[#1a0a03] shadow-[0_10px_40px_-8px_rgba(168,64,26,0.55)]"
            >
              {primaryLabel}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </MagneticButton>

            <MagneticButton
              href={`mailto:${CONTACT.email}`}
              strength={0.25}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-7 py-4 font-head text-base font-semibold text-ink transition-colors hover:border-line-strong hover:bg-orange/[0.08]"
            >
              {CONTACT.email}
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <LeadModal
        open={open}
        onClose={() => setOpen(false)}
        source={pathname}
        title={primaryLabel}
      />
    </section>
  );
}
