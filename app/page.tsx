import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Manifesto from "@/components/Manifesto";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { websiteSchema, faqSchema } from "@/lib/structured-data";
import { HOME_FAQ } from "@/lib/content";

export default function Home() {
  return (
    <main id="top">
      <JsonLd data={[websiteSchema(), faqSchema(HOME_FAQ)]} />
      <Hero />
      <Stats />
      <Manifesto />
      <Team />
      <Faq
        id="faq"
        title={<>Domande frequenti</>}
        items={HOME_FAQ}
        related={[
          { label: "Il CRM su misura", href: "/crm" },
          { label: "I nostri software", href: "/software" },
        ]}
      />
      <CTA />
    </main>
  );
}
