"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

function item(reduce: boolean | null) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };
}

type Props = {
  kicker: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
};

export default function PageHero({ kicker, title, lead, children }: Props) {
  const reduce = useReducedMotion();
  const v = item(reduce);

  return (
    <section className="relative px-6 pb-16 pt-36 text-center md:pt-44">
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
          {kicker}
        </motion.p>

        <motion.h1
          variants={v}
          className="mx-auto mt-7 w-full max-w-[20ch] font-head text-[clamp(2rem,6vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.03em]"
        >
          {title}
        </motion.h1>

        {lead && (
          <motion.p
            variants={v}
            className="mx-auto mt-7 w-full max-w-[64ch] text-[clamp(1.02rem,1.6vw,1.2rem)] leading-relaxed text-mut"
          >
            {lead}
          </motion.p>
        )}

        {children && (
          <motion.div variants={v} className="mt-10">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
