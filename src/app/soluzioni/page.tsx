import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/Cta";
import { CheckList } from "@/components/CheckList";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHead } from "@/components/SectionHead";
import { categories } from "@/content/site";

export const metadata: Metadata = { title: "Soluzioni", description: "Siti, prodotti digitali, AI, marketing e supporto: tutto quello che costruiamo e come lo facciamo." };

export default function Soluzioni() {
  return (
    <>
      <PageHero eyebrow="Soluzioni" title="Soluzioni per ogni fase." lead="Per ognuna: cosa conta davvero, cosa costruiamo e cosa ci serve da voi.">
        <nav aria-label="Categorie" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.id} href={`#${c.id}`} className="rounded-full border border-line bg-white px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-blue hover:text-blue">{c.title}</Link>
          ))}
        </nav>
      </PageHero>

      {categories.map((c, n) => (
        <Section key={c.id} id={c.id} className="border-t border-line">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHead index={`0${n + 1}`} eyebrow={c.title} title={c.title} lead={c.intro} />
              <Reveal delay={0.2} className="mt-12">
                <p className="mb-4 text-sm font-semibold text-mute">Cosa conta davvero</p>
                <CheckList items={c.matters} />
              </Reveal>
              <Reveal delay={0.25}>
                <p className="mt-6 rounded-[var(--radius-card)] bg-tint px-6 py-5 text-[15px] text-ink"><span className="font-semibold text-blue">Cosa ci serve da voi: </span>{c.ask}</p>
              </Reveal>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {c.items.map((it, i) => {
                const inner = (
                  <div className="group grid gap-2 py-8 transition-colors duration-300 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:items-baseline md:gap-8">
                    <h3 className="text-[clamp(1.4rem,2.2vw,1.875rem)] font-semibold tracking-[-0.03em] transition-colors group-hover:text-blue">{it.title}</h3>
                    <p className="text-[17px] leading-relaxed text-mute">{it.text}</p>
                    {it.href && <span aria-hidden="true" className="text-xl text-blue transition-transform duration-300 group-hover:translate-x-1">→</span>}
                  </div>
                );
                return <Reveal key={it.title} delay={i * 0.04} y={16}>{it.href ? <Link href={it.href}>{inner}</Link> : inner}</Reveal>;
              })}
            </div>
          </div>
        </Section>
      ))}
      <Cta title="Non sai da dove partire?" text="Descrivi la situazione: ti diciamo quale soluzione ha senso e quale no." />
    </>
  );
}
