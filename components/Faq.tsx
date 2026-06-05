import Link from "next/link";
import type { ReactNode } from "react";
import type { Faq as FaqItem } from "@/lib/content";
import SectionHead from "./SectionHead";

type Related = { label: string; href: string; external?: boolean };

/**
 * FAQ section: native <details> accordion (answers always in the DOM, so they
 * stay readable by crawlers and AI engines even when collapsed). The page is
 * expected to also emit a faqSchema() JSON-LD with the same items.
 */
export default function Faq({
  id = "faq",
  kicker = "FAQ",
  title,
  items,
  related,
}: {
  id?: string;
  kicker?: string;
  title: ReactNode;
  items: FaqItem[];
  related?: Related[];
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[840px]">
        <SectionHead kicker={kicker} title={title} center />

        <div className="overflow-hidden rounded-[18px] border border-line bg-surface">
          {items.map((it) => (
            <details
              key={it.q}
              className="group border-b border-line px-6 last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-head text-[1.05rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {it.q}
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong text-orange transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="-mt-1 pb-6 text-[0.98rem] leading-relaxed text-mut">
                {it.a}
              </p>
            </details>
          ))}
        </div>

        {related && related.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-[0.92rem] text-dim">
            <span>Approfondisci:</span>
            {related.map((r, i) => (
              <span key={r.href} className="inline-flex items-center">
                {r.external ? (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber underline-offset-4 hover:underline"
                  >
                    {r.label} ↗
                  </a>
                ) : (
                  <Link
                    href={r.href}
                    className="text-amber underline-offset-4 hover:underline"
                  >
                    {r.label}
                  </Link>
                )}
                {i < related.length - 1 && (
                  <span className="mx-1.5 text-dim">·</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
