import { Button } from "@/components/Button";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { HeroDemo } from "@/components/Demos";
import { Layers } from "@/components/Layers";
import { Marquee } from "@/components/Marquee";
import { AiTabs } from "@/components/AiTabs";
import { Bento } from "@/components/Bento";
import { Principles } from "@/components/Principles";
import { SectorTabs } from "@/components/SectorTabs";
import { Statement } from "@/components/Statement";
import { Steps } from "@/components/Steps";
import { Section, SectionHead, Pill } from "@/components/Section";
import { Reveal, Words } from "@/components/Reveal";
import { faqs, sectors } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="relative">
        <Layers className="!bottom-auto h-[760px]" />
        <div className="wrap relative pt-20 md:pt-32">
          <Reveal y={16}><Pill>AI integrata nei processi</Pill></Reveal>
          <Words text="Soluzioni digitali per ogni settore." className="h-display mt-7 max-w-5xl" delay={0.1} />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-mute">Siti, software e automazioni, con l'intelligenza artificiale dove ottimizza davvero il lavoro.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/ai">Scopri le soluzioni AI</Button>
              <Button href="/preventivo" variant="outline" arrow={false}>Calcola il preventivo</Button>
            </div>
          </Reveal>
          <Reveal delay={0.65} y={60} className="mt-20 md:mt-28">
            <HeroDemo />
          </Reveal>
        </div>
        <div className="mt-24 md:mt-32">
          <Marquee items={sectors.map((s) => s.name)} />
        </div>
      </section>

      <Section>
        <Statement text="Le aziende non hanno bisogno di più strumenti. Hanno bisogno che quelli che hanno lavorino insieme, e che le attività ripetitive non occupino più il tempo delle persone." accent={["lavorino", "ripetitive"]} />
      </Section>

      <Section>
        <SectionHead title="Cosa può fare l'AI nella tua azienda" lead="Quattro modi concreti per usarla. Ognuno parte da un processo che conoscete bene." />
        <div className="mt-14"><AiTabs /></div>
      </Section>

      <Section>
        <SectionHead title="Tutte le soluzioni" lead="Dal sito al software, dal marketing al supporto: un unico interlocutore per tutto il percorso." />
        <div className="mt-14"><Bento /></div>
      </Section>

      <Section>
        <SectionHead title="Per ogni settore" lead="Non partiamo dal settore ma dal processo. Ecco cosa cambia, in pratica, in alcuni di essi." />
        <div className="mt-14"><SectorTabs /></div>
      </Section>

      <Section>
        <SectionHead title="Come lavoriamo" lead="Ogni passaggio produce qualcosa che potete leggere o provare." />
        <Steps />
      </Section>

      <Section>
        <SectionHead title="Perché lavorare con noi" />
        <div className="mt-14"><Principles /></div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <SectionHead title="Domande frequenti" />
          <Faq items={faqs} />
        </div>
      </Section>

      <Cta title="Hai un progetto?" text="Raccontaci cosa vuoi ottenere: ti rispondiamo con una proposta scritta." />
    </>
  );
}
