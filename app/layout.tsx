import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: {
    default: "PowerAgency — Sistemi AI per chi vuole risultati reali",
    template: "%s — PowerAgency",
  },
  description:
    "Costruiamo asset che generano clienti. Sito, lead generation e CRM in un unico sistema AI-powered. Se non funziona sul nostro business, non lo portiamo fuori.",
  openGraph: {
    title: "PowerAgency — Sistemi AI per chi vuole risultati reali",
    description:
      "Costruiamo asset che generano clienti. Non un'agenzia: un trio che fa palestra ogni giorno sul proprio business.",
    type: "website",
    locale: "it_IT",
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
        <Background />
        <CustomCursor />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
