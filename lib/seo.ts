import type { Metadata } from "next";

export const SITE_URL = "https://www.poweragency.it";

// Brand OG card (1200x630) statica: public/og.png, generata dal logo ufficiale
// PAI via scripts/brand/gen-assets.mjs. Referenziata esplicitamente (non via la
// convention opengraph-image) così l'immagine sopravvive agli override openGraph
// per-pagina invece di essere scartata.
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "PowerAgency — sistemi AI per generare clienti",
};

/**
 * Full metadata block for a sub-page: title (templated by layout), description,
 * self-canonical, Open Graph and Twitter with the brand OG image.
 */
export function pageMeta(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${input.path}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "PowerAgency",
      title: input.title,
      description: input.description,
      url,
      locale: "it_IT",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [OG_IMAGE.url],
    },
  };
}
