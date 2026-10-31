function siteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  try {
    return raw ? new URL(raw).origin : "https://example.com";
  } catch {
    return "https://example.com";
  }
}

export const site = {
  name: "Acryl",
  tagline: "Soluzioni digitali per ogni settore, con l'AI dove ottimizza davvero il lavoro.",
  url: siteUrl(),
  email: "ciao@example.com",
  responseHours: "[N]",
};

export type AiSolution = {
  slug: string;
  title: string;
  short: string;
  lead: string;
  demo: "chat" | "flow" | "doc" | "lang";
  capabilities: { title: string; text: string }[];
  forWho: string[];
  needs: string[];
  limits: string[];
};

export const aiSolutions: AiSolution[] = [
  {
    slug: "assistenti",
    title: "Assistenti e chatbot",
    short: "Rispondono a clienti e team con i vostri contenuti.",
    lead: "Assistenti che rispondono a clienti e team usando i vostri documenti, e passano la mano a una persona quando serve.",
    demo: "chat",
    capabilities: [
      { title: "Rispondono con i vostri contenuti", text: "Documenti, FAQ e listini diventano la base delle risposte, non il web in generale." },
      { title: "Dove stanno i vostri clienti", text: "Sito, WhatsApp, email o gestionale: lo stesso assistente, più canali." },
      { title: "Passano a una persona", text: "Quando serve, l'operatore riceve la conversazione completa e non fa ripetere nulla." },
      { title: "Citano la fonte", text: "Ogni risposta indica da quale documento arriva, così si può verificare." },
    ],
    forWho: [
      "Negozi online con molte richieste ripetitive su ordini, resi e spedizioni",
      "Studi e aziende di servizi con domande ricorrenti dei clienti",
      "Team interni che rispondono a HR, IT o amministrazione",
    ],
    needs: ["Documenti e FAQ aggiornati", "I canali da collegare", "Le regole di passaggio a un operatore"],
    limits: [
      "Non decide su rimborsi o contratti senza approvazione di una persona",
      "Dice «non lo so» invece di inventare una risposta",
      "Resta nel perimetro dei contenuti che gli avete dato",
    ],
  },
  {
    slug: "automazione",
    title: "Automazione dei processi",
    short: "Email, ordini e moduli che si gestiscono da soli.",
    lead: "Le attività ripetitive, come ordini, moduli, email e report, passano da sole da un sistema all'altro.",
    demo: "flow",
    capabilities: [
      { title: "Smistano email e richieste", text: "Leggono, classificano e inoltrano alla persona giusta, o rispondono quando la risposta è chiara." },
      { title: "Compilano e controllano", text: "Moduli e documenti si riempiono dai dati già presenti e vengono verificati prima dell'invio." },
      { title: "Collegano gli strumenti", text: "Gestionale, CRM e fogli condivisi si parlano, senza copiare dati a mano." },
      { title: "Chiedono conferma", text: "Nei passaggi che contano, una persona approva con un clic prima che il sistema agisca." },
    ],
    forWho: [
      "Aziende dove qualcuno ricopia dati da uno strumento all'altro",
      "Uffici amministrativi con moduli e approvazioni ricorrenti",
      "Team commerciali che ricevono richieste d'offerta via email",
    ],
    needs: ["La mappa del processo com'è oggi", "L'accesso agli strumenti coinvolti", "Le regole di approvazione"],
    limits: [
      "Non tocca pagamenti o dati sensibili senza approvazione",
      "Ogni azione viene registrata e si può ripercorrere",
      "Si può fermare in qualsiasi momento",
    ],
  },
  {
    slug: "documenti",
    title: "Documenti e dati",
    short: "Cercare, estrarre e riassumere dai vostri archivi.",
    lead: "Trovare un'informazione, estrarla, confrontarla: sui vostri documenti, in pochi secondi.",
    demo: "doc",
    capabilities: [
      { title: "Cerca come si parla", text: "Domande in linguaggio naturale su contratti, manuali e archivi, con il passaggio esatto." },
      { title: "Estrae i dati", text: "Da fatture, ordini e PDF ai campi del gestionale, senza digitarli." },
      { title: "Riassume e confronta", text: "Sintesi di documenti lunghi e differenze tra versioni, con i punti evidenziati." },
      { title: "Report sui dati interni", text: "Domande sui vostri numeri, con risposte che si possono verificare." },
    ],
    forWho: [
      "Studi con molti contratti e fascicoli",
      "Amministrazioni con fatture e ordini in formati diversi",
      "Aziende con manuali e procedure difficili da consultare",
    ],
    needs: ["Un campione di documenti reali", "Chi può vedere cosa", "I campi da estrarre"],
    limits: [
      "Cita sempre la fonte del passaggio",
      "Non sostituisce un controllo legale o contabile",
      "I dati restano dove decidete voi",
    ],
  },
  {
    slug: "contenuti",
    title: "Contenuti e marketing",
    short: "Testi e varianti in più lingue, rivisti da una persona.",
    lead: "Testi, schede prodotto, traduzioni e varianti di campagna prodotti con l'AI e rivisti da una persona.",
    demo: "lang",
    capabilities: [
      { title: "Schede prodotto multilingua", text: "Descrizioni coerenti in tutte le lingue dei vostri mercati, a partire dai dati di catalogo." },
      { title: "Bozze nel vostro tono", text: "Articoli, newsletter e post che seguono il vostro modo di parlare, non uno generico." },
      { title: "Varianti da testare", text: "Più versioni di annunci e pagine, per scoprire cosa funziona davvero." },
      { title: "Revisione prima di uscire", text: "Niente viene pubblicato senza che una persona lo abbia letto e approvato." },
    ],
    forWho: [
      "E-commerce con cataloghi ampi",
      "Aziende che parlano a più mercati",
      "Team marketing con poco tempo",
    ],
    needs: ["Esempi del vostro tono di voce", "Un glossario dei termini", "I dati di catalogo"],
    limits: [
      "Non inventa caratteristiche di prodotto",
      "Nulla viene pubblicato senza revisione",
      "Segnaliamo i contenuti generati dove la normativa lo richiede",
    ],
  },
];

export type Category = {
  id: string;
  title: string;
  intro: string;
  matters: string[];
  items: { title: string; text: string; href?: string }[];
  ask: string;
};

export const categories: Category[] = [
  {
    id: "ai",
    title: "Intelligenza artificiale",
    intro: "L'AI serve dove un'attività ripetitiva costa ore. La colleghiamo agli strumenti che avete già, con una persona che controlla.",
    matters: [
      "Si parte dal processo, non dalla tecnologia",
      "Una persona approva dove l'errore costa",
      "Dati e accessi sotto il vostro controllo, in linea con GDPR e AI Act",
    ],
    items: aiSolutions.map((s) => ({ title: s.title, text: s.short, href: `/ai/${s.slug}` })),
    ask: "Un processo da migliorare e qualcuno che lo conosca bene.",
  },
  {
    id: "siti",
    title: "Siti e e-commerce",
    intro: "Un sito serve a far capire in pochi secondi cosa fate e a rendere facile il passo successivo: contattarvi o comprare.",
    matters: [
      "Veloce e usabile da telefono: caricamento principale entro 2,5 secondi, risposta ai tocchi sotto i 200 ms",
      "Contenuti che rispondono alle domande dei clienti",
      "Un pannello semplice per modificare i testi in autonomia",
    ],
    items: [
      { title: "Siti aziendali", text: "Struttura, testi guidati e SEO di base, pensati per far contattare." },
      { title: "Landing page", text: "Una pagina, un obiettivo, misurata dal primo giorno." },
      { title: "Siti multilingua", text: "Contenuti e SEO curati per ogni lingua, non tradotti alla cieca." },
      { title: "E-commerce", text: "Catalogo, pagamenti, spedizioni e gestione degli ordini." },
      { title: "Cataloghi online", text: "Prodotti consultabili e filtrabili, senza carrello." },
      { title: "Restyling", text: "Migliorare ciò che c'è senza perdere il posizionamento già costruito." },
    ],
    ask: "Logo, materiali e accesso a dominio e strumenti attuali.",
  },
  {
    id: "prodotti",
    title: "Prodotti digitali",
    intro: "Software costruito sul vostro modo di lavorare, non il contrario.",
    matters: [
      "Si parte da un ambito piccolo che si usa subito",
      "Codice e dati sono vostri e si possono esportare",
      "Si integra con gli strumenti già in uso",
    ],
    items: [
      { title: "Web app", text: "Applicazioni nel browser, senza installazioni." },
      { title: "Gestionali su misura", text: "Ordini, clienti, magazzino: solo quello che serve a voi." },
      { title: "Portali clienti", text: "Un'area riservata dove i clienti vedono e fanno da soli." },
      { title: "App mobile", text: "Per iOS e Android, quando il telefono è lo strumento giusto." },
      { title: "Integrazioni API", text: "Far dialogare software che oggi non si parlano." },
      { title: "Dashboard e report", text: "I numeri che servono, aggiornati da soli." },
    ],
    ask: "Chi userà il software e cosa fa oggi a mano.",
  },
  {
    id: "marketing",
    title: "Marketing",
    intro: "Farsi trovare dalle persone giuste e sapere cosa funziona.",
    matters: [
      "Obiettivi misurabili prima di spendere",
      "Tracciamento corretto, nel rispetto del consenso cookie",
      "Report leggibili anche da chi non è del mestiere",
    ],
    items: [
      { title: "SEO", text: "Farsi trovare per ciò che i clienti cercano davvero." },
      { title: "Campagne a pagamento", text: "Budget speso su ciò che porta contatti, non su ciò che fa rumore." },
      { title: "Email marketing", text: "Sequenze e newsletter che partono al momento giusto." },
      { title: "Social", text: "Presenza costante, con contenuti rivisti da una persona." },
      { title: "Analytics e report", text: "Cosa porta richieste, spiegato in una pagina." },
    ],
    ask: "Obiettivi di business e accesso agli account pubblicitari.",
  },
  {
    id: "supporto",
    title: "Supporto",
    intro: "Un sito o un software vivono dopo il lancio. Qualcuno deve occuparsene.",
    matters: [
      "Aggiornamenti e backup regolari",
      "Tempi di risposta scritti nel contratto",
      "Un unico referente, sempre lo stesso",
    ],
    items: [
      { title: "Manutenzione", text: "Aggiornamenti, backup e controlli periodici." },
      { title: "Hosting e sicurezza", text: "Infrastruttura monitorata e protetta." },
      { title: "Assistenza continuativa", text: "Richieste e piccole modifiche, con tempi concordati." },
      { title: "Aggiornamenti e miglioramenti", text: "Nuove funzioni a tappe, in base a ciò che si usa davvero." },
      { title: "Formazione del team", text: "Per usare gli strumenti in autonomia." },
    ],
    ask: "Accessi agli strumenti già in uso e un referente interno.",
  },
];

export const sectors = [
  { name: "Retail e negozi", items: ["Ordini, resi e disponibilità gestiti da un assistente", "Schede prodotto scritte e tradotte a partire dal catalogo", "Riordini segnalati quando le scorte scendono"] },
  { name: "Manifattura", items: ["Richieste d'offerta lette e trasformate in preventivi da approvare", "Ricerca nei documenti tecnici e nelle procedure", "Avvisi su scorte e ritardi dei fornitori"] },
  { name: "Studi professionali", items: ["Ricerca nei fascicoli con il riferimento esatto", "Bozze di lettere e comunicazioni da rivedere", "Scadenze e promemoria che arrivano da sole"] },
  { name: "Ristorazione e hotel", items: ["Prenotazioni e domande frequenti gestite su più canali", "Risposte alle recensioni in bozza, da approvare", "Menu e descrizioni in più lingue"] },
  { name: "Sanità e benessere", items: ["Appuntamenti e promemoria", "Informazioni ai pazienti su orari, preparazioni e costi", "Dati sensibili trattati solo con garanzie documentate"] },
  { name: "Logistica", items: ["Richieste di stato spedizione gestite in automatico", "Documenti di trasporto letti e archiviati", "Comunicazioni ai clienti sui ritardi"] },
];

export const principles = [
  { title: "Prima per iscritto", text: "Ambito, tempi e prezzo sono nella proposta prima di iniziare. Se cambiano, lo decidiamo insieme." },
  { title: "Si vede cosa si costruisce", text: "Una demo a ogni tappa, non solo alla fine. Correggere presto costa meno." },
  { title: "Quello che costruiamo è vostro", text: "Codice, dati e accessi restano al cliente. Nessun vincolo nascosto." },
  { title: "L'AI con il freno a mano", text: "Una persona controlla dove serve, e vi spieghiamo cosa fa il sistema e cosa no." },
  { title: "Una sola persona di riferimento", text: "Parlate con chi lavora al vostro progetto, non con un reparto commerciale." },
];

export const steps = [
  { title: "Primo confronto", text: "Capiamo cosa fate, dove si perde tempo e cosa sarebbe un buon risultato.", out: "Un riepilogo scritto di ciò che abbiamo capito" },
  { title: "Proposta scritta", text: "Ambito, tempi per tappa e prezzo fisso. Si discute finché è chiara.", out: "Una proposta con data di inizio e consegna" },
  { title: "Sviluppo a tappe", text: "Costruiamo a blocchi piccoli e li mostriamo funzionanti, usati su casi reali.", out: "Una demo ad ogni tappa" },
  { title: "Lancio e supporto", text: "Pubblichiamo, formiamo chi lo usa e restiamo a gestirlo e migliorarlo.", out: "Il sistema in uso e un referente" },
];

export const faqs = [
  { q: "Quanto costa un progetto?", a: "Dipende dall'ambito. Il calcolatore dà una stima iniziale in pochi passaggi; la proposta a prezzo fisso arriva per iscritto dopo il primo confronto." },
  { q: "Quanto tempo ci vuole?", a: "Un sito aziendale e un'automazione hanno tempi molto diversi. Li indichiamo in proposta, con una data per ogni tappa." },
  { q: "Lavorate con il mio settore?", a: "Partiamo dal processo, non dal settore. Se c'è un'attività ripetitiva o una presenza online da costruire, possiamo lavorarci." },
  { q: "I miei dati sono al sicuro con l'AI?", a: "Dati e accessi restano sotto il vostro controllo. Documentiamo cosa viene condiviso con i fornitori di AI e perché, in linea con GDPR e AI Act." },
  { q: "Cosa succede dopo il lancio?", a: "Restiamo a gestire manutenzione, aggiornamenti e richieste, con tempi di risposta scritti. Un unico referente." },
];

export const nav = {
  main: [
    { label: "Soluzioni", href: "/soluzioni", mega: true },
    { label: "AI", href: "/ai" },
    { label: "Chi siamo", href: "/chi-siamo" },
  ],
};
