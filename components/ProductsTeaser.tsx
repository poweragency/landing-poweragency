"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SOFTWARE, CRM } from "@/lib/content";
import { EASE } from "@/lib/motion";
import SectionHead from "./SectionHead";
import TiltCard from "./TiltCard";

const cards = [
  {
    href: "/software",
    tag: "I software proprietari",
    title: "Software proprietari",
    text: "Tre strumenti nati dalle nostre operazioni: lead generation, contenuti e siti che convertono. Testati sul campo prima di venderli.",
    items: SOFTWARE.map((s) => s.name),
    cta: "Esplora i software",
    accent: false,
  },
  {
    href: "/crm",
    tag: "Il verticale",
    title: CRM.name,
    text: CRM.description,
    items: ["Gestione lead", "Pratiche & preventivi", "Follow-up AI"],
    cta: "Scopri il CRM",
    accent: true,
  },
];

export default function ProductsTeaser() {
  return (
    <section id="prodotti" className="scroll-mt-24 px-6 pb-28 pt-8">
      <div className="mx-auto max-w-[1180px]">
        <SectionHead
          kicker="Cosa costruiamo"
          title="Due mondi, un solo sistema"
          lead="Software proprietari che usiamo ogni giorno e un CRM verticale già a regime sul campo. Scegli da dove partire."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {cards.map((c, i) => (
            <motion.div
              key={c.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <TiltCard className="h-full">
                <Link
                  href={c.href}
                  data-cursor="hover"
                  className={`ring-grad flex h-full flex-col overflow-hidden rounded-[18px] border p-8 transition-[transform,box-shadow,background] duration-300 hover:shadow-[0_30px_60px_-30px_rgba(255,45,45,0.5)] ${
                    c.accent
                      ? "border-line-strong bg-[linear-gradient(150deg,rgba(255,122,24,0.12),#16100d_60%)]"
                      : "border-line bg-surface hover:bg-surface-2"
                  }`}
                  style={{ transform: "translateZ(0)" }}
                >
                  <span className="mb-5 inline-block w-fit rounded-full border border-line px-3 py-1.5 font-head text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-mut [transform:translateZ(30px)]">
                    {c.tag}
                  </span>

                  <h3 className="font-head text-[1.7rem] font-semibold tracking-tight [transform:translateZ(25px)]">
                    {c.title}
                  </h3>
                  <p className="mt-3.5 flex-1 text-[0.98rem] text-mut">{c.text}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-[0.85rem] text-mut"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>

                  <span className="group/link mt-7 inline-flex items-center gap-2 self-start font-head text-[0.95rem] font-semibold text-ink transition-colors hover:text-amber">
                    {c.cta}
                    <span className="text-orange transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
