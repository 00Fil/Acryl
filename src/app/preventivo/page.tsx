import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export const metadata: Metadata = { title: "Calcolare il preventivo", description: "Descrivete cosa vi serve in tre passaggi: ricevete una proposta scritta con ambito, tempi e prezzo." };

export default function Preventivo() {
  return (
    <>
      <PageHero eyebrow="Preventivo" title="Calcolare il preventivo." lead="Tre passaggi. Ti rispondiamo con una proposta scritta: ambito, tempi e prezzo fisso." bg />
      <Section className="!pt-0">
        <Reveal><QuoteForm /></Reveal>
      </Section>
    </>
  );
}
