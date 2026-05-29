"use client";

import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { EASE } from "@/lib/motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

function item(reduce: boolean | null) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };
}

export default function Hero() {
  const reduce = useReducedMotion();
  const v = item(reduce);

  return (
    <section className="relative px-6 pb-24 pt-40 text-center md:pt-44">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-[1180px]"
      >
        <motion.p
          variants={v}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-4 py-2 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-mut backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-amber to-red" />
          </span>
          Sistemi AI · Risultati reali
        </motion.p>

        <motion.h1
          variants={v}
          className="mx-auto mt-7 w-full max-w-[16ch] font-head text-[clamp(2.2rem,7vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.03em]"
        >
          Sistemi AI per chi vuole{" "}
          <span className="grad-text block">risultati, non demo</span>
        </motion.h1>

        <motion.p
          variants={v}
          className="mx-auto mt-7 w-full max-w-[62ch] text-[clamp(1.02rem,1.6vw,1.22rem)] leading-relaxed text-mut"
        >
          Costruiamo asset che generano clienti: sito, lead generation e CRM in un
          unico sistema guidato dall&apos;AI. Non un&apos;agenzia, ma un team che ogni
          giorno testa sul proprio business ciò che vende.
        </motion.p>

        <motion.div
          variants={v}
          className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          <MagneticButton
            href="#contatti"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber via-orange to-red px-7 py-4 font-head text-base font-semibold text-[#1a0a03] shadow-[0_10px_40px_-8px_rgba(255,45,45,0.55)]"
          >
            Prenota una call
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </MagneticButton>
        </motion.div>

        <motion.p
          variants={v}
          className="mt-12 font-head text-[0.98rem] italic text-dim"
        >
          &ldquo;Se non funziona sul nostro business, non lo portiamo fuori.&rdquo;
        </motion.p>
      </motion.div>

    </section>
  );
}
