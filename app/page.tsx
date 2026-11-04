import { Newsreader, JetBrains_Mono } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { websiteSchema, faqSchema } from "@/lib/structured-data";
import { FAQ } from "@/components/home/data";
import HomeClient from "@/components/home/HomeClient";
import { HOME_HTML } from "@/components/home/markup";
import "@/components/home/home.css";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-pa-serif",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pa-mono",
  display: "swap",
});

export default function Home() {
  return (
    <>
      <JsonLd data={[websiteSchema(), faqSchema(FAQ.map(([q, a]) => ({ q, a })))]} />
      <div
        className={`pa-home ${serif.variable} ${mono.variable}`}
        dangerouslySetInnerHTML={{ __html: HOME_HTML }}
      />
      <HomeClient />
    </>
  );
}
