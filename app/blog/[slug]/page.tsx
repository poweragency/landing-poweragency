import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import CTA from "@/components/CTA";
import CtaProdottiDigitali from "@/components/CtaProdottiDigitali";
import { pageMeta } from "@/lib/seo";
import { getAllPostsMeta, getPost } from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

// solo gli slug noti: uno slug inesistente è 404 (blog interamente statico)
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostsMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.description, path: `/blog/${slug}` });
}

const fmtDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }) : "";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main id="top">
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            date: post.date,
            updated: post.updated,
            author: post.author,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="px-6 pb-24 pt-36 md:pt-44">
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/blog"
            className="font-head text-[0.85rem] font-semibold text-mut transition-colors hover:text-amber"
          >
            ← Tutti gli articoli
          </Link>

          <p className="mt-8 font-head text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-dim">
            {fmtDate(post.date)}
            {post.updated && post.updated !== post.date ? ` · Aggiornato il ${fmtDate(post.updated)}` : ""} ·{" "}
            {post.readingTime} min di lettura
          </p>
          <h1 className="mt-4 font-head text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em]">
            {post.title}
          </h1>

          <div className="prose-pa mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          <CtaProdottiDigitali />
        </div>
      </article>

      <div className="pt-4">
        <CTA
          kicker="Dalla teoria ai risultati"
          title="Vuoi questi sistemi"
          titleAccent="al lavoro sul tuo business?"
          lead="Ti mostriamo come lead generation, CRM e automazioni AI lavorano su operazioni reali, non in una demo. Una call, zero impegno."
          primaryLabel="Prenota una call"
        />
      </div>
    </main>
  );
}
