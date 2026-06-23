import { SITE_URL } from "@/lib/seo";

/**
 * Schema.org JSON-LD builders, emitted via <JsonLd>. The Organization is the
 * canonical entity (@id); Service nodes reference it by @id, so Organization
 * must be present on any page that emits a Service (it lives in the layout).
 */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const ORG_DESCRIPTION =
  "PowerAgency costruisce sistemi AI per generare clienti: sito, lead generation e CRM in un'unica infrastruttura. Software testati prima sul proprio business (ecommerce, prop firms) e poi portati ai clienti.";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "PowerAgency",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/brand/logo.png`,
    email: "info@poweragency.it",
    description: ORG_DESCRIPTION,
    sameAs: ["https://instagram.com/_poweragency_"],
    areaServed: { "@type": "Country", name: "Italia" },
    knowsAbout: [
      "lead generation",
      "CRM",
      "siti web",
      "automazione AI",
      "ecommerce",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "PowerAgency",
    inLanguage: "it-IT",
    publisher: { "@id": ORG_ID },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: `${SITE_URL}${input.path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Italia" },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
}) {
  const url = `${SITE_URL}/blog/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: input.date,
    dateModified: input.date,
    inLanguage: "it-IT",
    image: `${SITE_URL}/og.png`,
    author: { "@type": "Organization", name: input.author, "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
