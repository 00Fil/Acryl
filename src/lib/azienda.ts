/** Settore e soluzioni per l'ingresso personalizzato. Logica pura: usabile sia sul server sia nel browser. */

export type SectorKey = "hospitality" | "professional" | "retail" | "generic";
export type Solution = { tag: string; title: string; why: string };

export const sectorSolutions: Record<SectorKey, { label: string; items: Solution[] }> = {
  hospitality: {
    label: "Ristorazione e ospitalità",
    items: [
      { tag: "Sito", title: "Sito con prenotazioni e menu sempre aggiornato", why: "Chi cerca un ristorante decide dal telefono: menu e prenotazione devono essere al primo sguardo." },
      { tag: "AI", title: "Assistente che risponde su orari, menu e prenotazioni", why: "Le stesse domande arrivano ogni giorno, anche di sera. Una risposta pronta libera il telefono." },
      { tag: "Automazione", title: "Recensioni e richieste raccolte in un solo posto", why: "Nessun contatto o recensione si perde tra messaggi, mail e social." },
    ],
  },
  professional: {
    label: "Studi professionali",
    items: [
      { tag: "AI", title: "Ricerca nei fascicoli con il riferimento esatto", why: "Un documento si trova in pochi secondi, con il passaggio da cui viene la risposta." },
      { tag: "Automazione", title: "Scadenze e promemoria che arrivano da soli", why: "Nessuna scadenza dipende più dalla memoria di una persona." },
      { tag: "Sito", title: "Sito con moduli per nuovi clienti", why: "Chi vi cerca lascia i dati una volta sola, già in ordine per la prima consulenza." },
    ],
  },
  retail: {
    label: "Commercio e negozi",
    items: [
      { tag: "Siti", title: "Vendita online collegata alle scorte", why: "Il sito mostra solo ciò che è davvero disponibile, in negozio e online." },
      { tag: "AI", title: "Riordini segnalati quando le scorte scendono", why: "L'avviso arriva prima dell'esaurimento, non dopo." },
      { tag: "AI", title: "Schede prodotto scritte a partire dal catalogo", why: "Descrizioni complete per ogni articolo, riviste da una persona prima della pubblicazione." },
    ],
  },
  generic: {
    label: "Attività e servizi",
    items: [
      { tag: "Sito", title: "Sito che porta richieste", why: "Una pagina chiara che spiega cosa fate e raccoglie i contatti." },
      { tag: "Automazione", title: "Automazione di un lavoro ripetitivo", why: "Scegliamo insieme il processo che vi fa perdere più tempo." },
      { tag: "Software", title: "Software su misura per il vostro lavoro", why: "Quando fogli e messaggi non bastano più, uno strumento fatto per voi." },
    ],
  },
};

/** Settore dai tag OpenStreetMap (class/type) o, in mancanza, dal nome. */
export function sectorOf(name: string, osm?: { cls?: string; type?: string }): SectorKey {
  const c = osm?.cls ?? "";
  const t = osm?.type ?? "";
  if ((c === "amenity" && /restaurant|cafe|bar|pub|fast_food|biergarten|ice_cream/.test(t)) || (c === "tourism" && /hotel|guest_house|hostel|motel|apartment/.test(t))) return "hospitality";
  if (c === "office" && /lawyer|accountant|notary|architect|financial|insurance|consult/.test(t)) return "professional";
  if (c === "shop") return "retail";
  const n = name.toLowerCase();
  if (/(trattoria|ristor|bar|pizz|caff|osteria|hotel|b&b)/.test(n)) return "hospitality";
  if (/(studio|avvocat|commercialist|consul|notai|architett)/.test(n)) return "professional";
  if (/(negozio|shop|store|boutique|market|ferram)/.test(n)) return "retail";
  return "generic";
}

const PALETTE = ["#2a52ff", "#1b3ad1", "#1f5f8b", "#3b4a6b", "#0b1020"];

/** Colore pieno del logo, scelto dal nome. Nessun gradiente. */
export function colorOf(name: string): string {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

export function initialsOf(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}
