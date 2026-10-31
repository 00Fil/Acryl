import type { Metadata } from "next";
import { Cta } from "@/components/Cta";
import { Layers } from "@/components/Layers";
import { Principles } from "@/components/Principles";
import { Pill, Section, SectionHead } from "@/components/Section";
import { Reveal, Words } from "@/components/Reveal";
import { Statement } from "@/components/Statement";
import { Check } from "@/components/Check";

export const metadata: Metadata = { title: "Chi siamo", description: "Un'agenzia che mette tutto per iscritto: prezzi, tempi, uso dell'AI e proprietà di ciò che costruiamo." };

const comms = ["Un aggiornamento a ogni tappa, non a fine progetto", "Un solo canale per tutto il progetto", "Risposta entro [N] ore lavorative", "Accesso in ogni momento allo stato del lavoro"];

export default function ChiSiamo() {
  return (
    <>
      <section className="relative">
        <Layers className="!bottom-auto h-[600px]" />
        <div className="wrap relative pt-20 md:pt-32">
          <Reveal y={16}><Pill>Chi siamo</Pill></Reveal>
          <Words text="Un'agenzia che mette tutto per iscritto." className="h-display mt-7 max-w-5xl" delay={0.1} />
          <Reveal delay={0.5}><p className="mt-8 max-w-2xl text-xl leading-relaxed text-mute">Siamo [N] persone. Costruiamo siti, software e automazioni, e spieghiamo ogni scelta in modo che sia chiara a chi la paga.</p></Reveal>
          <Reveal delay={0.6} y={60} className="mt-20">
            <div className="flex aspect-[16/8] items-center justify-center rounded-[2.5rem] border border-line bg-tint text-mute">[Foto del team o dello studio]</div>
          </Reveal>
        </div>
      </section>
      <Section>
        <Statement text="Siamo una nuova agenzia e partiamo da una scelta: dire le cose chiaramente. Tempi, prezzi, cosa fa l'AI e cosa no, di chi sono codice e dati." accent={["chiaramente", "chiare"]} />
      </Section>
      <Section>
        <SectionHead title="Come lavoriamo" />
        <div className="mt-14"><Principles /></div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <SectionHead title="Come comunichiamo" lead="Sapere a che punto è il lavoro non dovrebbe richiedere una telefonata." />
          <ul className="flex flex-col gap-3">
            {comms.map((c, i) => (
              <Reveal key={c} delay={i * 0.07} y={20}>
                <li className="flex items-center gap-4 rounded-2xl border border-line bg-tint px-5 py-4 text-[17px]"><Check size={28} />{c}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
      <Section>
        <SectionHead title="Il team" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex aspect-square items-center justify-center rounded-[2rem] border border-line bg-tint text-mute">[Foto]</div>
              <p className="mt-4 text-xl font-semibold">[Nome Cognome]</p>
              <p className="text-mute">[Ruolo]</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Cta title="Parliamo del tuo progetto." />
    </>
  );
}
