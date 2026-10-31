import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/Cta";
import { CheckList } from "@/components/CheckList";
import { Layers } from "@/components/Layers";
import { Pill, Section } from "@/components/Section";
import { Reveal, Words } from "@/components/Reveal";
import { categories } from "@/content/site";

export const metadata: Metadata = { title: "Soluzioni", description: "Siti, prodotti digitali, AI, marketing e supporto: tutto quello che costruiamo e come lo facciamo." };

export default function Soluzioni() {
  return (
    <>
      <section className="relative">
        <Layers className="!bottom-auto h-[520px]" />
        <div className="wrap relative pt-20 md:pt-32">
          <Reveal y={16}><Pill>Tutto in un posto</Pill></Reveal>
          <Words text="Soluzioni per ogni fase." className="h-display mt-7 max-w-4xl" delay={0.1} />
          <Reveal delay={0.4}><p className="mt-8 max-w-xl text-xl leading-relaxed text-mute">Per ognuna: cosa conta davvero, cosa costruiamo e cosa ci serve da voi.</p></Reveal>
          <Reveal delay={0.5} className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.id} href={`#${c.id}`} className="rounded-full bg-tint px-5 py-3 text-base font-medium transition-colors hover:bg-blue hover:text-white">{c.title}</Link>
            ))}
          </Reveal>
        </div>
      </section>

      {categories.map((c, n) => (
        <Section key={c.id} id={c.id}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-semibold text-blue">0{n + 1}</p>
              <Words as="h2" text={c.title} className="h-section mt-3" />
              <Reveal delay={0.1}><p className="mt-6 text-lg leading-relaxed text-mute">{c.intro}</p></Reveal>
              <Reveal delay={0.15} className="mt-8">
                <p className="mb-3 text-sm font-semibold text-mute">Cosa conta davvero</p>
                <CheckList items={c.matters} />
              </Reveal>
              <Reveal delay={0.2}><p className="mt-6 rounded-2xl bg-tint px-5 py-4 text-[15px] text-blue"><span className="font-semibold">Cosa ci serve da voi:</span> {c.ask}</p></Reveal>
            </div>
            <div className="border-b border-line">
              {c.items.map((it, i) => {
                const inner = (
                  <div className="group grid items-baseline gap-2 border-t border-line py-7 transition-all duration-500 ease-expo hover:rounded-3xl hover:border-transparent hover:bg-tint hover:px-7 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-8">
                    <h3 className={`text-[clamp(1.4rem,2.2vw,2rem)] font-semibold tracking-tight ${it.href ? "text-blue" : ""}`}>{it.title}</h3>
                    <p className="text-[17px] leading-relaxed text-mute">{it.text}</p>
                    {it.href && <span aria-hidden="true" className="text-xl text-blue transition-transform duration-300 group-hover:translate-x-1.5">→</span>}
                  </div>
                );
                return (
                  <Reveal key={it.title} delay={i * 0.04} y={20}>
                    {it.href ? <Link href={it.href}>{inner}</Link> : inner}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Section>
      ))}
      <Cta title="Non sai da dove partire?" text="Descrivi la situazione: ti diciamo quale soluzione ha senso e quale no." />
    </>
  );
}
