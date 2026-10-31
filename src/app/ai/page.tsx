import type { Metadata } from "next";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { FlowDemo } from "@/components/Demos";
import { PageHero } from "@/components/PageHero";
import { ProcessToggle } from "@/components/ProcessToggle";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHead } from "@/components/SectionHead";
import { Steps } from "@/components/Steps";
import Link from "next/link";
import { aiSolutions, faqs } from "@/content/site";

export const metadata: Metadata = { title: "AI nei processi", description: "Assistenti, automazioni, analisi di documenti e contenuti: l'AI collegata agli strumenti che usate già, con una persona che controlla." };

const how = [
  { t: "Una persona controlla", d: "Dove l'errore costa, c'è sempre un passaggio di approvazione umana." },
  { t: "I vostri dati restano vostri", d: "Accessi limitati e documentati. Vi diciamo cosa va ai fornitori di AI e perché." },
  { t: "Si capisce cosa fa", d: "Spieghiamo in chiaro cosa automatizza il sistema, cosa no e come fermarlo." },
];

export default function AiPage() {
  return (
    <>
      <PageHero eyebrow="Soluzioni AI" title="AI dentro i processi." lead="Non un chatbot in più sul sito: la usiamo dove un'attività ripetitiva costa ore, e la colleghiamo agli strumenti che avete già.">
        <Reveal><FlowDemo /></Reveal>
      </PageHero>

      <Section>
        <SectionHead index="01" eyebrow="Quattro soluzioni" title="Ognuna ha la sua pagina." lead="Cosa fa, per chi è, cosa serve per partire e quali sono i limiti." split />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {aiSolutions.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.1}>
              <Link href={`/ai/${s.slug}`} className="group flex h-full min-h-[320px] flex-col justify-between rounded-[var(--radius-panel)] border border-line bg-white p-9 transition-all duration-500 hover:-translate-y-1 hover:border-blue/40 hover:shadow-[0_30px_80px_-40px_rgba(42,82,255,.45)] md:p-11">
                <h3 className="text-[clamp(1.9rem,3vw,2.75rem)] font-semibold leading-none tracking-[-0.04em]">{s.title}</h3>
                <div className="flex items-end justify-between gap-6">
                  <p className="max-w-xs text-[17px] leading-relaxed text-mute">{s.short}</p>
                  <span aria-hidden="true" className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-tint text-xl text-blue transition-all duration-500 group-hover:translate-x-1 group-hover:bg-blue group-hover:text-white">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead index="02" eyebrow="Confronto" title="Cosa cambia, in pratica." lead="Lo stesso processo, con e senza AI. Il lavoro resta alle persone dove serve giudizio." split />
        <div className="mt-14"><ProcessToggle /></div>
      </Section>

      <Section>
        <SectionHead index="03" eyebrow="Principi" title="Come usiamo l'AI." />
        <div className="mt-14 divide-y divide-line border-y border-line">
          {how.map((h, i) => (
            <Reveal key={h.t} delay={i * 0.05} y={16}>
              <div className="grid gap-4 py-9 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-8">
                <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold tracking-[-0.03em]">{h.t}</h3>
                <p className="text-[17px] leading-relaxed text-mute">{h.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead index="04" eyebrow="Metodo" title="Come lavoriamo." />
        <Steps />
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <SectionHead index="05" eyebrow="Domande" title="Domande frequenti." />
          <Faq items={faqs.slice(0, 4)} />
        </div>
      </Section>
      <Cta />
    </>
  );
}
