import type { Metadata } from "next";
import { Layers } from "@/components/Layers";
import { QuoteForm } from "@/components/QuoteForm";
import { Pill } from "@/components/Section";
import { Reveal, Words } from "@/components/Reveal";

export const metadata: Metadata = { title: "Calcola il preventivo", description: "Descrivi cosa ti serve in tre passaggi: ricevi una proposta scritta con ambito, tempi e prezzo." };

export default function Preventivo() {
  return (
    <section className="relative pb-8">
      <Layers className="!bottom-auto h-[480px]" />
      <div className="wrap relative pt-20 md:pt-28">
        <Reveal y={16}><Pill>Tre passaggi</Pill></Reveal>
        <Words text="Calcola il preventivo." className="h-display mt-7 max-w-4xl" delay={0.1} />
        <Reveal delay={0.4}><p className="mt-8 max-w-xl text-xl leading-relaxed text-mute">Raccontaci cosa ti serve: ti rispondiamo con una proposta scritta.</p></Reveal>
        <Reveal delay={0.5} className="mt-16"><QuoteForm /></Reveal>
      </div>
    </section>
  );
}
