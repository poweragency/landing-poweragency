import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { getAllPostsMeta } from "@/lib/blog";

const DESCRIPTION =
  "Guide e analisi su AI, lead generation, CRM e automazione per chi vuole generare clienti. Scritte da chi questi sistemi li usa ogni giorno sul proprio business.";

export const metadata = pageMeta({
  title: "Blog",
  description: DESCRIPTION,
  path: "/blog",
});

const fmtDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }) : "";

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main id="top">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          url: `${SITE_URL}/blog`,
          name: "Blog PowerAgency",
          description: DESCRIPTION,
          inLanguage: "it-IT",
          publisher: { "@id": `${SITE_URL}/#organization` },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }}
      />

      <PageHero
        kicker="Il blog"
        title={
          <>
            Sistemi, non <span className="grad-text">teoria.</span>
          </>
        }
        lead={DESCRIPTION}
      />

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-[1180px] gap-6 md:grid-cols-2">
          {posts.length === 0 && <p className="text-mut">Presto i primi articoli.</p>}
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="ring-grad group rounded-2xl border border-line bg-surface/40 p-7 transition-colors hover:border-line-strong"
            >
              <p className="font-head text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-dim">
                {fmtDate(p.date)} · {p.readingTime} min
              </p>
              <h2 className="mt-3 font-head text-[1.35rem] font-bold leading-snug tracking-[-0.01em] text-ink">
                {p.title}
              </h2>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-mut">{p.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-head text-[0.9rem] font-semibold text-amber">
                Leggi{" "}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
