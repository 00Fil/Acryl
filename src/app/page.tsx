import { Hero } from "@/components/Hero";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Marquee } from "@/components/Marquee";
import { AiTabs } from "@/components/AiTabs";
import { Principles } from "@/components/Principles";
import { ProcessStack } from "@/components/ProcessStack";
import { SectorTabs } from "@/components/SectorTabs";
import { SectionHead } from "@/components/SectionHead";
import { Section } from "@/components/Section";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { Statement } from "@/components/Statement";
import { faqs, sectors } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero title="Soluzioni digitali per ogni settore." lead="Siti, software e automazioni, con l'intelligenza artificiale dove ottimizza davvero il lavoro." />
      <Marquee items={sectors.map((s) => s.name)} />

      <Section>
        <Statement text="Le aziende non hanno bisogno di più strumenti. Hanno bisogno che quelli che hanno lavorino insieme, e che le attività ripetitive non occupino più il tempo delle persone." accent={["lavorino", "ripetitive"]} />
      </Section>

      <Section>
        <SectionHead index="01" eyebrow="Cosa facciamo" title="Tutte le soluzioni, in un posto." lead="Dal sito al software, dal marketing al supporto. Un unico interlocutore per tutto il percorso." split />
        <div className="mt-14"><SolutionsGrid /></div>
      </Section>

      <Section>
        <SectionHead index="02" eyebrow="AI nei processi" title="Cosa può fare l'AI nella tua azienda." lead="Quattro modi concreti per usarla. Ognuno parte da un processo che conoscete già." split />
        <div className="mt-14"><AiTabs /></div>
      </Section>

      <Section>
        <SectionHead index="03" eyebrow="Settori" title="Per ogni settore, il processo giusto." lead="Non partiamo dal settore ma dal processo. Ecco cosa cambia in pratica, in alcuni di essi." split />
        <div className="mt-14"><SectorTabs /></div>
      </Section>

      <Section>
        <SectionHead index="04" eyebrow="Metodo" title="Quattro passi, ognuno con un risultato." lead="Scorri: ogni passaggio produce qualcosa che potete leggere o provare." />
        <ProcessStack />
      </Section>

      <Section>
        <SectionHead index="05" eyebrow="Principi" title="Come lavoriamo ogni giorno." split lead="Cinque regole che valgono per ogni progetto, piccolo o grande." />
        <div className="mt-14"><Principles /></div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <SectionHead index="06" eyebrow="Domande" title="Domande frequenti." />
          <Faq items={faqs} />
        </div>
      </Section>

      <Cta title="Hai un progetto?" text="Raccontaci cosa vuoi ottenere: ti rispondiamo con una proposta scritta." />
    </>
  );
}
