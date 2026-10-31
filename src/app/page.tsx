import { Hero } from "@/components/Hero";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Marquee } from "@/components/Marquee";
import { AiTabs } from "@/components/AiTabs";
import { Offers } from "@/components/Offers";
import { Principles } from "@/components/Principles";
import { SectorTabs } from "@/components/SectorTabs";
import { SectionHead } from "@/components/SectionHead";
import { Section } from "@/components/Section";
import { Steps } from "@/components/Steps";
import { faqs, sectors } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={sectors.map((s) => s.name)} />

      <section id="offerte" className="bg-tint">
        <div className="wrap py-24 md:py-36">
          <SectionHead index="01" eyebrow="Cosa vendiamo" title="Tre cose, spiegate in chiaro." lead="Scegliete quella che risolve un problema vostro. Se ne servono più di una, le teniamo insieme." split />
          <div className="mt-14"><Offers /></div>
        </div>
      </section>

      <Section>
        <SectionHead index="02" eyebrow="AI nei processi" title="Dove l'AI fa risparmiare tempo." lead="Quattro usi concreti. Ognuno parte da un lavoro che fate già, e una persona controlla il risultato." split />
        <div className="mt-14"><AiTabs /></div>
      </Section>

      <Section>
        <SectionHead index="03" eyebrow="Settori" title="Per settore, il lavoro che cambia." lead="Partiamo dal processo, non dal settore. Ecco alcuni esempi concreti." split />
        <div className="mt-14"><SectorTabs /></div>
      </Section>

      <Section>
        <SectionHead index="04" eyebrow="Come lavoriamo" title="Quattro passi, con un risultato per ciascuno." lead="Sapete sempre a che punto siete e cosa avete in mano." />
        <Steps />
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

      <Cta title="Hai un progetto?" text="Raccontateci cosa volete ottenere: vi rispondiamo con una proposta scritta." />
    </>
  );
}
