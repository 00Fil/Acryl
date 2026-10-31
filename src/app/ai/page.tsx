import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { FlowDemo } from "@/components/Demos";
import { Layers } from "@/components/Layers";
import { ProcessToggle } from "@/components/ProcessToggle";
import { Pill, Section, SectionHead } from "@/components/Section";
import { Reveal, Words } from "@/components/Reveal";
import { Steps } from "@/components/Steps";
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
      <section className="relative">
        <Layers className="!bottom-auto h-[640px]" />
        <div className="wrap relative pt-20 md:pt-32">
          <Reveal y={16}><Pill>Soluzioni AI</Pill></Reveal>
          <Words text="AI dentro i processi." className="h-display mt-7 max-w-4xl" delay={0.1} />
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mute">Non un chatbot in più sul sito: la usiamo dove un'attività ripetitiva costa ore, e la colleghiamo agli strumenti che avete già.</p>
          </Reveal>
          <Reveal delay={0.55} y={60} className="mt-20"><FlowDemo /></Reveal>
        </div>
      </section>

      <Section>
        <SectionHead title="Quattro soluzioni" lead="Ognuna ha la sua pagina: cosa fa, per chi è, cosa serve per partire e quali sono i limiti." />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {aiSolutions.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.1}>
              <Link href={`/ai/${s.slug}`} className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[2.5rem] border border-line bg-tint p-9 transition-colors duration-500 hover:bg-blue hover:text-white md:p-11">
                <span aria-hidden="true" className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-blue/10 transition-all duration-700 ease-expo group-hover:scale-150 group-hover:bg-white/15" />
                <h3 className="relative text-[clamp(1.9rem,3vw,2.9rem)] font-semibold leading-none tracking-[-0.035em]">{s.title}</h3>
                <div className="relative flex items-end justify-between gap-6">
                  <p className="max-w-xs text-[17px] leading-relaxed text-mute transition-colors group-hover:text-white/85">{s.short}</p>
                  <span aria-hidden="true" className="text-3xl text-blue transition-all duration-500 ease-expo group-hover:translate-x-2 group-hover:text-white">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Cosa cambia, in pratica" lead="Lo stesso processo, con e senza AI. Il lavoro resta alle persone dove serve giudizio." />
        <div className="mt-14"><ProcessToggle /></div>
      </Section>

      <Section>
        <SectionHead title="Come usiamo l'AI" />
        <div className="mt-14 border-b border-line">
          {how.map((h, i) => (
            <Reveal key={h.t} delay={i * 0.05} y={24}>
              <div className="grid gap-4 border-t border-line py-9 transition-all duration-500 ease-expo hover:rounded-3xl hover:border-transparent hover:bg-tint hover:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                <h3 className="text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold tracking-[-0.03em]">{h.t}</h3>
                <p className="text-[17px] leading-relaxed text-mute">{h.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Come lavoriamo" />
        <Steps />
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <SectionHead title="Domande frequenti" />
          <Faq items={faqs.slice(0, 4)} />
        </div>
      </Section>
      <Cta />
    </>
  );
}
