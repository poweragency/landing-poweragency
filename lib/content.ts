export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/software", label: "Software" },
  { href: "/crm", label: "CRM" },
  { href: "/#team", label: "Team" },
] as const;

export const STATS = [
  { value: 10000, prefix: "", suffix: "€", display: "/day", label: "Ecommerce gestito quotidianamente" },
  { value: 120, prefix: "", suffix: "+", display: "", label: "Account prop firm operativi ogni giorno" },
  { value: 60, prefix: "", suffix: "+", display: "", label: "Lead generati in 2 settimane (carrozzeria)" },
  { value: 15000, prefix: "", suffix: "€", display: "", label: "Fatturato generato da un singolo caso" },
] as const;

export const FEATURES = [
  {
    icon: "⚙️",
    title: "Software testato sul campo",
    text: "Ogni tool nasce dalle nostre operazioni reali. Lo proviamo sul nostro business prima di portarlo fuori. Zero demo finte.",
  },
  {
    icon: "🧲",
    title: "Asset che generano clienti",
    text: "Sito, lead generation e CRM non sono tre fornitori diversi: un solo sistema AI-powered che lavora come una macchina sola.",
  },
  {
    icon: "🔥",
    title: "Trio che fa palestra",
    text: "Strategia, tecnica e verticali: tre persone che si allenano ogni giorno sul proprio business. Risultati, non slide.",
  },
] as const;

/* ============================================================
   SOFTWARE PROPRIETARI — pagina /software
   ============================================================ */
export type SoftwareStatus = "live" | "soon";

export type Software = {
  slug: string;
  index: string;
  name: string;
  tag: string;
  status: SoftwareStatus;
  icon: string;
  headline: string;
  description: string;
  features: string[];
  audience?: string;
  pricing?: string;
  url?: string;
  ctaLabel: string;
};

export const SOFTWARE: Software[] = [
  {
    slug: "powerleads",
    index: "01",
    name: "PowerLeads",
    tag: "SaaS · Lead Generation",
    status: "live",
    icon: "🧲",
    headline: "Un sistema. Non cinque tool.",
    description:
      "Piattaforma all-in-one che automatizza l'acquisizione clienti: estrae lead da Instagram e Google Maps, genera icebreaker personalizzati con AI e invia DM ed email in automatico. Una sola dashboard, un solo abbonamento — al posto di 3-5 strumenti separati da 200-400€/mese.",
    features: [
      "Estrazione lead da profili Instagram e ricerche Google Maps",
      "Icebreaker su misura generati con Anthropic Claude",
      "Outreach automatico: DM via estensione Chrome ed email dal tuo dominio",
      "Setup in 5 minuti, senza competenze tecniche",
      "Dati freschi ad ogni ricerca, mai database obsoleti",
    ],
    audience:
      "Coach, creator, freelancer, e-commerce · Agenzie, studi professionali, SaaS, consulenza, real estate",
    pricing: "Da 49€/mese · 7 giorni di prova gratis con 500 crediti inclusi",
    url: "https://powerleads.poweragency.it",
    ctaLabel: "Vai a PowerLeads",
  },
  {
    slug: "powerreel",
    index: "02",
    name: "PowerReel",
    tag: "In arrivo",
    status: "soon",
    icon: "🎬",
    headline: "Sezione in arrivo.",
    description:
      "Stiamo costruendo PowerReel. Questa sezione è da compilare: feature, descrizione e dettagli arrivano a breve.",
    features: [],
    ctaLabel: "Resta aggiornato",
  },
  {
    slug: "powerlanding",
    index: "03",
    name: "PowerLanding",
    tag: "Servizio · Siti web",
    status: "live",
    icon: "🚀",
    headline: "Sito su misura in 48 ore.",
    description:
      "Sito completamente personalizzato, disegnato e scritto a mano — nessun template. Copy strategico che converte, codice artigianale, hosting e dominio inclusi. Consegna garantita in 48 ore dal pagamento.",
    features: [
      "Sviluppo 100% personalizzato, nessun template o preset",
      "Codice scritto a mano, riga per riga",
      "Copy strategico studiato per convertire",
      "Hosting e dominio inclusi nel prezzo",
      "Codice sorgente e repository ceduti a te, per sempre",
      "Massimo 30 progetti al mese per qualità controllata",
    ],
    audience:
      "Piccole imprese e professionisti — dentisti, avvocati, personal trainer, studi — che vogliono un sito credibile senza spendere migliaia di euro.",
    pricing: "Da 397€ · 3 livelli: Standard, Premium, Signature",
    url: "https://powersite.vercel.app",
    ctaLabel: "Scopri PowerLanding",
  },
];

/* ============================================================
   CRM CARROZZERIE — pagina /crm
   ============================================================ */
export const CRM = {
  name: "CRM Carrozzerie",
  tag: "Verticale · Officine & Carrozzerie",
  headline: "Gestione lead & pratiche, in un unico flusso.",
  description:
    "Il gestionale verticale per carrozzerie: dal primo contatto del cliente alla pratica chiusa. Lead, preventivi, lavorazioni e follow-up in un'unica pipeline — con l'AI che lavora i contatti al posto tuo.",
  url: "https://crm-carrozzerie.vercel.app",
  modules: [
    {
      icon: "📥",
      title: "Gestione lead",
      text: "Ogni richiesta entra, viene qualificata e assegnata. Niente contatti persi tra WhatsApp, telefono e mail.",
    },
    {
      icon: "📋",
      title: "Pratiche & preventivi",
      text: "Dalla stima al consuntivo: storico completo di ogni pratica, documenti e stato di avanzamento sempre allineati.",
    },
    {
      icon: "🔧",
      title: "Pipeline lavorazioni",
      text: "Lo stato di ogni veicolo a colpo d'occhio: in attesa, in lavorazione, pronto, consegnato.",
    },
    {
      icon: "🤖",
      title: "Follow-up AI",
      text: "I preventivi non chiusi vengono ricontattati in automatico. L'AI scrive e insiste al posto tuo, con il tono giusto.",
    },
    {
      icon: "🔗",
      title: "Lead gen integrata",
      text: "I contatti che arrivano dalle ads entrano già dentro al CRM, pronti da lavorare. Zero copia-incolla.",
    },
    {
      icon: "📊",
      title: "Numeri reali",
      text: "Conversioni, tempi di chiusura e fatturato per periodo. Sai sempre cosa funziona e cosa no.",
    },
  ],
  workflow: [
    { step: "01", title: "Arriva il lead", text: "Dalle ads, dal sito o da Google: ogni richiesta entra nel CRM." },
    { step: "02", title: "Qualifica e preventivo", text: "Il contatto viene qualificato e riceve un preventivo tracciato." },
    { step: "03", title: "Follow-up automatico", text: "Se non risponde, l'AI lo ricontatta finché non chiude o dice no." },
    { step: "04", title: "Lavorazione e consegna", text: "Pratica in officina, stato aggiornato, cliente sempre informato." },
  ],
} as const;

export const CASE_METRICS = [
  { value: 60, suffix: "+", label: "lead in 2 settimane" },
  { value: 5, suffix: "", label: "clienti chiusi" },
  { value: 15000, suffix: "€", label: "fatturato generato" },
] as const;

/* ============================================================
   TEAM — fondatori + sales team (card)
   ============================================================ */
export type Person = {
  initials: string;
  name: string;
  role: string;
};

export const TEAM: Person[] = [
  { initials: "VA", name: "Vincenzo Amore", role: "Commerciale & strategia" },
  { initials: "MA", name: "Mattia", role: "Tecnico · AI · sviluppo" },
  { initials: "WA", name: "Wassim", role: "Vertical prop firms" },
];

export const SALES: Person[] = [
  { initials: "GA", name: "Gabriele", role: "Sales · Closer" },
  { initials: "GI", name: "Giorgio", role: "Sales · Closer" },
  { initials: "WI", name: "William", role: "Sales · Closer" },
];

export const CONTACT = {
  email: "info@poweragency.it",
  instagram: "https://instagram.com/_poweragency_",
  instagramHandle: "@_poweragency_",
} as const;
