import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Manifesto from "@/components/Manifesto";
import ProductsTeaser from "@/components/ProductsTeaser";
import Team from "@/components/Team";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Stats />
      <Manifesto />
      <ProductsTeaser />
      <Team />
      <CTA />
    </main>
  );
}
