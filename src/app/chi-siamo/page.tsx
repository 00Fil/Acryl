import type { Metadata } from "next";
import { Cta } from "@/components/Cta";
import { Check } from "@/components/Check";
import { PageHero } from "@/components/PageHero";
import { Principles } from "@/components/Principles";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHead } from "@/components/SectionHead";
import { Statement } from "@/components/Statement";

export const metadata: Metadata = { title: "Chi siamo", description: "Un'agenzia che mette tutto per iscritto: prezzi, tempi, uso dell'AI e proprietà di ciò che costruiamo." };

const comms = ["Un aggiornamento a ogni tappa, non a fine progetto", "Un solo canale per tutto il progetto", "Risposta entro [N] ore lavorative", "Accesso in ogni momento allo stato del lavoro"];

export default function ChiSiamo() {
  return (
    <>
      <PageHero eyebrow="Chi siamo" title="Un'agenzia che mette tutto per iscritto." lead="Siamo [N] persone. Costruiamo siti, software e automazioni, e spieghiamo ogni scelta in modo chiaro a chi la paga." />
      <Section className="!pt-0">
        <Reveal><div className="flex aspect-[16/7] items-center justify-center rounded-[var(--radius-panel)] border border-line bg-tint text-mute">[Foto del team o dello studio]</div></Reveal>
      </Section>
      <Section>
        <Statement text="Siamo una nuova agenzia e partiamo da una scelta: dire le cose chiaramente. Tempi, prezzi, cosa fa l'AI e cosa no, di chi sono codice e dati." accent={["chiaramente", "chiare"]} />
      </Section>
      <Section>
        <SectionHead index="01" eyebrow="Principi" title="Come lavoriamo." />
        <div className="mt-14"><Principles /></div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <SectionHead index="02" eyebrow="Comunicazione" title="Sapere a che punto siamo." lead="Non dovrebbe richiedere una telefonata." />
          <ul className="flex flex-col gap-3">
            {comms.map((c, i) => (
              <Reveal key={c} delay={i * 0.07} y={16}>
                <li className="flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-white px-6 py-5 text-[17px]"><Check size={26} />{c}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
      <Section>
        <SectionHead index="03" eyebrow="Team" title="Le persone dietro il lavoro." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex aspect-[4/5] items-center justify-center rounded-[var(--radius-card)] border border-line bg-tint text-mute">[Foto]</div>
              <p className="mt-5 text-xl font-semibold">[Nome Cognome]</p>
              <p className="text-mute">[Ruolo]</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Cta title="Parliamo del tuo progetto." />
    </>
  );
}
