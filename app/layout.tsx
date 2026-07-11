import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Background from "@/components/Background";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";
import { organizationSchema } from "@/lib/structured-data";
import { GA_ID } from "@/lib/gtag";
import { POLICY_VERSION } from "@/lib/consent";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsLoader from "@/components/AnalyticsLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const HOME_TITLE = "PowerAgency — Agenzia AI per generare clienti";
const HOME_OG_DESCRIPTION =
  "Agenzia AI: costruiamo sistemi che generano clienti. Un team che ogni giorno testa sul proprio business ciò che vende, prima di proportelo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s — PowerAgency",
  },
  description:
    "Agenzia AI per generare clienti: sito, lead generation e CRM in un unico sistema guidato dall'AI. Se non funziona sul nostro business, non lo portiamo fuori.",
  alternates: { canonical: SITE_URL },
  applicationName: "PowerAgency",
  openGraph: {
    title: HOME_TITLE,
    description: HOME_OG_DESCRIPTION,
    type: "website",
    siteName: "PowerAgency",
    url: SITE_URL,
    locale: "it_IT",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_OG_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0606",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {/* Google Analytics 4 con Consent Mode v2 + blocco preventivo:
            questo init prepara solo la coda dataLayer (nessuna richiesta a
            Google); gtag.js viene caricato da <AnalyticsLoader/> SOLO dopo
            consenso alla categoria "analytics" (banner CMP, lib/consent.ts). */}
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var c='denied';
try{
  var raw=localStorage.getItem('pa_consent');
  if(raw){
    var v=JSON.parse(raw);
    /* consenso valido solo se espresso sulla versione corrente della policy
       (re-prompt su cambio versione, in sync con lib/consent.ts) */
    if(v.version==='${POLICY_VERSION}' && v.categories.analytics===true) c='granted';
  }
}catch(e){}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:c});
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        <AnalyticsLoader />
        <JsonLd data={organizationSchema()} />
        <Background />
        <Nav />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
