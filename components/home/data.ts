// @ts-nocheck
// Contenuti della home: famiglie, film, funzioni e FAQ.
export const ICONS = {
  target: '<circle cx="26" cy="26" r="20"/><circle cx="26" cy="26" r="11"/><circle cx="26" cy="26" r="3"/><path d="M26 0v12M26 40v12M0 26h12M40 26h12"/>',
  page: '<rect x="6" y="8" width="40" height="36" rx="2"/><path d="M6 17h40M13 25h26M13 32h15"/>',
  flow: '<rect x="4" y="6" width="12" height="40"/><rect x="20" y="6" width="12" height="28"/><rect x="36" y="6" width="12" height="17"/>',
  node: '<circle cx="26" cy="26" r="6"/><circle cx="8" cy="10" r="4"/><circle cx="44" cy="10" r="4"/><circle cx="8" cy="42" r="4"/><circle cx="44" cy="42" r="4"/><path d="M11 13l11 9M41 13 30 22M11 39l11-9M41 39 30 30"/>',
};

export const FAMILIES = [
  {
    id: 'acquisizione', icon: 'target', title: '<b>Acquisizione</b> clienti', short: 'Contatti filtrati dall\'AI, pronti da chiamare.',
    tags: [['Meta Ads', '/agenzia-lead-generation'], ['Google Ads', '/agenzia-lead-generation'], ['PowerLeads', 'https://powerleads.poweragency.it/'], ['Qualifica AI', '/agenzia-lead-generation']],
    problem: 'Il form si riempie di curiosi. I venditori perdono la giornata a richiamarli.',
    ex: {
      title: 'Arriva un contatto. <b>Il resto</b> lo prepara il sistema.',
      msg: ['Nuovo lead da Meta Ads', 'Campagna preventivi · ore 09:42'],
      doc: ['Richiesta 4471', [['Nome', 'Marco R.'], ['Settore', 'Studio dentistico'], ['Budget', 'Dichiarato'], ['Tempi', 'Entro il mese']]],
      fields: [['Intento', 'Alto'], ['Priorità', 'Da chiamare oggi'], ['Risposta', 'WhatsApp inviato']],
      sheet: ['Lead 4471', 'Studio dentistico', [['Qualifica AI', 'superata'], ['Scheda nel CRM', 'creata'], ['Notifica al commerciale', 'inviata'], ['Secondo contatto', 'tra 2 giorni', 1]], 'Al commerciale arriva solo chi vale la chiamata.'],
      points: ['Ogni contatto viene filtrato per settore, budget e intento.', 'La risposta parte subito, anche di notte.', 'Il commerciale vede solo i lead caldi.'],
    },
    chips: [['Carrozzerie', 'Il nostro verticale più forte: <b>sinistri e preventivi</b> che non si perdono più.', '/gestionale-carrozzeria'], ['Studi dentistici', 'Prime visite che arrivano <b>già qualificate</b>.', '/agenzia-lead-generation'], ['Imprese edili', 'Preventivi solo da chi ha <b>un progetto vero</b>.', '/agenzia-lead-generation'], ['Servizi B2B', 'Contatti estratti, messaggi scritti, <b>outreach automatico</b>.', '/software']],
  },
  {
    id: 'siti', icon: 'page', title: '<b>Siti</b> e landing', short: 'Su misura, scritti per vendere, online in 48 ore.',
    tags: [['PowerLanding', 'https://powersite.vercel.app/'], ['Landing page', 'https://powersite.vercel.app/'], ['Copy', 'https://powersite.vercel.app/']],
    problem: 'Il sito è una brochure. Lo guardano, lo chiudono, e nessuno scrive.',
    ex: {
      title: 'Ci dai il brief. <b>In 48 ore</b> il sito è online.',
      msg: ['Brief ricevuto', 'Studio legale · lunedì ore 10:00'],
      doc: ['Il tuo brief', [['Attività', 'Studio legale'], ['Obiettivo', 'Più consulenze'], ['Offerta', 'Prima call gratuita'], ['Dominio', 'Incluso']]],
      fields: [['Copy', 'Scritto a mano'], ['Design', 'Nessun template'], ['Codice', 'Tuo per sempre']],
      sheet: ['Sito in consegna', 'Studio legale', [['Copy e struttura', 'pronti'], ['Sviluppo su misura', 'fatto'], ['Hosting e dominio', 'inclusi'], ['Online', 'mercoledì ore 10:00', 1]], 'Repository e sorgenti restano tuoi.'],
      points: ['Niente template: lo disegniamo e lo scriviamo noi.', 'Il testo è pensato per far scrivere chi legge.', 'Hosting, dominio e codice sono compresi.'],
    },
    chips: [['Professionisti', 'Un sito <b>credibile</b> senza spendere migliaia di euro.', 'https://powersite.vercel.app/'], ['Piccole imprese', 'Una pagina che <b>porta richieste</b>, non visite.', 'https://powersite.vercel.app/'], ['Campagne', 'La landing giusta per <b>ogni offerta</b>.', '/agenzia-lead-generation']],
  },
  {
    id: 'gestionali', icon: 'flow', title: '<b>Gestionali</b> e CRM', short: 'Dal lead alla consegna, un posto solo.',
    tags: [['CRM su misura', '/crm'], ['Gestionale carrozzeria', '/gestionale-carrozzeria'], ['Email e WhatsApp', '/crm'], ['Integrazioni', '/crm']],
    problem: 'Contatti su Excel, preventivi su WhatsApp, pratiche nella testa di una persona sola.',
    ex: {
      title: 'Entra un preventivo. <b>Il resto</b> va avanti da solo.',
      msg: ['Preventivo accettato', 'Carrozzeria · pratica 2417'],
      doc: ['Pratica 2417', [['Cliente', 'Giulia B.'], ['Lavoro', 'Paraurti e fiancata'], ['Stato', 'Accettato'], ['Consegna', 'Venerdì']]],
      fields: [['Pipeline', 'In lavorazione'], ['Cliente', 'Conferma inviata'], ['Promemoria', 'Impostato']],
      sheet: ['Pratica 2417', 'Dal lead alla consegna', [['Conferma via WhatsApp', 'partita'], ['Documenti', 'allegati'], ['Gestionale esistente', 'sincronizzato'], ['Avviso di ritiro', 'venerdì', 1]], 'Il cliente è informato e tu non rincorri nessuno.'],
      points: ['Lead, preventivi e lavori in una pipeline sola.', 'Conferme e promemoria partono da soli.', 'Si collega a ciò che usi già, via webhook.'],
    },
    chips: [['Su misura', 'I tuoi stati, i tuoi documenti, <b>le tue automazioni</b>.', '/crm'], ['Carrozzerie', 'Il primo prodotto verticale, con <b>demo navigabile</b>.', '/gestionale-carrozzeria'], ['Altri settori', 'Ti diciamo se ti serve <b>su misura o pronto</b>.', '/crm']],
  },
  {
    id: 'ai', icon: 'node', title: '<b>Software</b> e automazioni AI', short: 'Il lavoro ripetitivo lo fa il sistema.',
    tags: [['PowerSocial', 'https://powersocial.poweragency.it/'], ['PowerLeads', 'https://powerleads.poweragency.it/'], ['Automazioni AI', '/software'], ['Tutti i software', '/software']],
    problem: 'Cinque strumenti scollegati, 200 o 400 euro al mese, e i dati da copiare a mano.',
    ex: {
      title: 'Scegli il pubblico. <b>Il resto</b> lo scrive e lo invia il software.',
      msg: ['Nuova ricerca su Google Maps', 'Officine · provincia di Milano'],
      doc: ['Lista estratta', [['Fonte', 'Google Maps'], ['Attività', 'Officine'], ['Zona', 'Milano'], ['Dati', 'Aggiornati ora']]],
      fields: [['Icebreaker', 'Scritto dall\'AI'], ['Canali', 'DM ed email'], ['Avvio', 'Automatico']],
      sheet: ['Campagna outreach', 'Una dashboard sola', [['Lead estratti', 'pronti'], ['Messaggi personalizzati', 'scritti'], ['Invio email dal tuo dominio', 'partito'], ['Risposte', 'da leggere', 1]], 'Attivo in cinque minuti, senza competenze tecniche.'],
      points: ['Dati freschi a ogni ricerca, mai liste vecchie.', 'Ogni messaggio è scritto su quel contatto.', 'Una dashboard al posto di cinque strumenti.'],
    },
    chips: [['PowerLeads', 'Lead da Instagram e Google Maps, <b>icebreaker AI</b> e outreach.', 'https://powerleads.poweragency.it/'], ['PowerSocial', 'Crea e pubblica i contenuti, <b>tutti gli account</b> in una vista.', 'https://powersocial.poweragency.it/'], ['Su misura', 'Se manca lo strumento giusto, <b>lo costruiamo</b>.', '/software']],
  },
];

export const TEAM = [['Strategia', 'Offerta e target'], ['Marketing', 'Campagne e creatività'], ['Software', 'Sviluppo su misura'], ['AI', 'Automazioni e qualifica'], ['Dati', 'Ottimizzazione continua']];

export const FAQ = [
  ['Cosa fa Power Agency?', 'Costruiamo asset digitali che generano clienti: sito, lead generation e CRM in un unico sistema guidato dall\'AI. Usiamo gli stessi strumenti sul nostro business prima di proporteli.'],
  ['A chi vi rivolgete?', 'Ad aziende e professionisti con vendita consulenziale, dove c\'è un percorso fatto di lead, preventivo e chiusura: carrozzerie, studi dentistici, imprese edili, studi professionali e servizi B2B. E ai singoli imprenditori che vogliono gestire i propri social senza perderci tempo.'],
  ['Quanto costa?', 'Dipende da cosa ti serve. PowerLeads e PowerSocial sono software in abbonamento, con i piani sulle loro pagine. Sito e CRM su misura si quotano dopo un breve audit: nella prima call ti diamo un range realistico.'],
  ['In quanto tempo arrivano i primi lead?', 'Il sistema si costruisce di solito in due o tre settimane. Da lì i primi lead qualificati entrano nel CRM e le prime quattro settimane le dedichiamo a ottimizzare sui dati reali.'],
  ['Posso prendere un solo pezzo?', 'Sì. Sito, lead generation e CRM funzionano insieme, ma puoi partire da uno solo e aggiungere il resto quando ti serve.'],
];

