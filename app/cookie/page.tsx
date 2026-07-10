import LegalShell from "@/components/LegalShell";
import { CONTACT, COMPANY } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Cookie Policy",
  description: "Informativa sull'uso dei cookie del sito PowerAgency.",
  path: "/cookie",
});

// Versione policy: deve restare allineata a POLICY_VERSION in lib/consent.ts
// (è la versione registrata nel registro consensi a ogni scelta).
export default function CookiePage() {
  return (
    <LegalShell
      title="Cookie Policy"
      updated="10 luglio 2026 (versione 2026-07-10)"
      sections={[
        {
          heading: "1. Cosa sono i cookie",
          body: [
            "I cookie sono piccoli file di testo che i siti visitati salvano sul dispositivo dell'utente. Servono a far funzionare il sito, a memorizzare preferenze o a raccogliere statistiche d'uso. Tecnologie analoghe (es. localStorage) sono trattate allo stesso modo in questa informativa.",
          ],
        },
        {
          heading: "2. Come gestiamo il consenso",
          body: [
            "Alla prima visita nessun cookie diverso da quelli tecnici è attivo. Un banner ti permette di scegliere tra “Accetta tutti”, “Rifiuta non necessari” e “Personalizza” (selezione per singola categoria). Gli strumenti non necessari — incluso Google Analytics — vengono caricati solo dopo il tuo consenso esplicito per la relativa categoria.",
            "Puoi modificare o revocare il consenso in qualsiasi momento dal link “Preferenze cookie” presente nel footer di ogni pagina. La revoca ha effetto immediato.",
            "A ogni scelta registriamo, come prova del consenso: data e ora, versione di questa policy, categorie accettate o rifiutate e un identificativo tecnico casuale del browser (non associato alla tua identità). La registrazione avviene su sistemi del Titolare.",
          ],
        },
        {
          heading: "3. Cookie e archiviazione tecnica (necessari)",
          body: [
            "Archiviazione locale “pa_consent”: memorizza la scelta espressa sul banner (identificativo tecnico, categorie, versione policy, data). Durata: fino a cancellazione da parte dell'utente. Non richiede consenso.",
            "Il sito non installa altri cookie tecnici propri durante la semplice navigazione.",
          ],
        },
        {
          heading: "4. Cookie analitici (previo consenso)",
          body: [
            "Google Analytics 4 (Google Ireland Ltd. / Google LLC), proprietà “PowerAgency Web”: statistiche aggregate su visite, pagine e provenienza del traffico, per migliorare il sito.",
            "Cookie installati: “_ga” (durata 2 anni) e “_ga_Q2F9MKE0YZ” (durata 2 anni). Lo script gtag.js viene richiesto ai server Google solo dopo il consenso alla categoria “Analitici”; in caso di revoca i cookie vengono rimossi e la raccolta si interrompe.",
            "I dati possono essere trasferiti da Google verso gli Stati Uniti; il trasferimento è coperto dall'EU-U.S. Data Privacy Framework, a cui Google è certificata. Maggiori informazioni: policies.google.com/privacy.",
          ],
        },
        {
          heading: "5. Cookie di profilazione e marketing",
          body: [
            "Questo sito NON utilizza cookie di profilazione o di marketing (es. pixel pubblicitari). Se in futuro venissero introdotti, saranno attivati solo previo consenso per la relativa categoria e questa policy verrà aggiornata prima dell'attivazione.",
          ],
        },
        {
          heading: "6. Gestione dal browser",
          body: [
            "Oltre che dal link “Preferenze cookie” nel footer, puoi gestire o eliminare i cookie dalle impostazioni del tuo browser. La disattivazione dei cookie tecnici può compromettere alcune funzionalità del sito.",
          ],
        },
        {
          heading: "7. Titolare e contatti",
          body: [
            `Titolare del trattamento è ${COMPANY.identifier}.`,
            `Per qualsiasi richiesta puoi scrivere a ${CONTACT.email}.`,
          ],
        },
      ]}
    />
  );
}
