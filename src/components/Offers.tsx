import { Check } from "./Check";
import { Reveal } from "./Reveal";

/** Le tre cose che vendiamo, dette in chiaro: a chi servono, cosa ottengono. */
const offers = [
  {
    title: "Un sito che porta richieste",
    who: "Per chi vuole farsi trovare su Google e ricevere contatti dal web.",
    gets: ["Sito veloce, leggibile da telefono", "Moduli che arrivano direttamente a voi", "Aggiornamenti e assistenza dopo il lancio"],
    href: "/soluzioni",
    cta: "Vedere i siti",
  },
  {
    title: "Software su misura",
    who: "Per chi gestisce ordini, clienti o pratiche ancora su fogli e messaggi.",
    gets: ["Un programma pensato per il vostro lavoro", "Accessi e ruoli per ogni persona del team", "I dati restano di proprietà vostra"],
    href: "/soluzioni",
    cta: "Vedere il software",
  },
  {
    title: "Automazioni con l'AI",
    who: "Per chi perde ore a copiare dati e rispondere alle stesse domande.",
    gets: ["Risposte automatiche su catalogo e documenti", "Dati passati da un programma all'altro", "Una persona approva ogni passaggio delicato"],
    href: "/ai",
    cta: "Vedere le soluzioni AI",
  },
];

export function Offers() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {offers.map((o, i) => (
        <Reveal key={o.title} delay={i * 0.06} className="flex">
          <a href={o.href} className="group flex w-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-8 transition-colors duration-300 hover:border-blue">
            <h3 className="text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">{o.title}</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-mute">{o.who}</p>
            <ul className="mt-8 flex flex-col gap-4 border-t border-line pt-8">
              {o.gets.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[16px] leading-snug">
                  <Check size={22} className="mt-px shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
            <span className="mt-auto pt-10 text-[15px] font-semibold text-blue">
              {o.cta} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
