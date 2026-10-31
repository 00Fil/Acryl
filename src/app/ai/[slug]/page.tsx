import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "@/components/Check";
import { CheckList } from "@/components/CheckList";
import { Cta } from "@/components/Cta";
import { DemoFor } from "@/components/Demos";
import { Faq } from "@/components/Faq";
import { Layers } from "@/components/Layers";
import { Button } from "@/components/Button";
import { Section, SectionHead } from "@/components/Section";
import { Reveal, Words } from "@/components/Reveal";
import { Steps } from "@/components/Steps";
import { aiSolutions, faqs } from "@/content/site";

export function generateStaticParams() {
  return aiSolutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = aiSolutions.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.lead } : {};
}

export default async function AiDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = aiSolutions.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = aiSolutions.filter((x) => x.slug !== s.slug);
  return (
    <>
      <section className="relative">
        <Layers className="!bottom-auto h-[600px]" />
        <div className="wrap relative pt-14 md:pt-20">
          <Reveal y={10}>
            <nav aria-label="Percorso" className="text-[15px] text-mute">
              <Link href="/soluzioni" className="hover:text-blue">Soluzioni</Link> / <Link href="/ai" className="hover:text-blue">AI</Link> / <span className="text-ink">{s.title}</span>
            </nav>
          </Reveal>
          <Words text={s.title} className="h-display mt-8 max-w-5xl" delay={0.05} />
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mute">{s.lead}</p>
            <div className="mt-10"><Button href="/preventivo">Calcola il preventivo</Button></div>
          </Reveal>
          <Reveal delay={0.55} y={60} className="mt-20"><DemoFor kind={s.demo} /></Reveal>
        </div>
      </section>

      <Section>
        <SectionHead title="Cosa può fare" />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {s.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.08}>
              <div className="group h-full rounded-[2rem] border border-line bg-tint p-8 transition-colors duration-500 hover:border-blue/40 hover:bg-tint-2 md:p-10">
                <Check size={40} />
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-mute">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <Reveal><h3 className="mb-5 text-2xl font-semibold tracking-tight">Per chi è</h3><CheckList items={s.forWho} /></Reveal>
          <Reveal delay={0.1}><h3 className="mb-5 text-2xl font-semibold tracking-tight">Cosa serve per partire</h3><CheckList items={s.needs} /></Reveal>
          <Reveal delay={0.2}><h3 className="mb-5 text-2xl font-semibold tracking-tight">Limiti e controlli</h3><CheckList items={s.limits} /></Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead title="Come procediamo" />
        <Steps />
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <SectionHead title="Domande frequenti" />
          <Faq items={faqs.slice(0, 4)} />
        </div>
      </Section>

      <Section>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight">Altre soluzioni AI</h2>
        <div className="mt-8 border-b border-line">
          {others.map((o) => (
            <Link key={o.slug} href={`/ai/${o.slug}`} className="group grid items-center gap-3 border-t border-line py-8 transition-all duration-500 ease-expo hover:rounded-3xl hover:border-transparent hover:bg-tint hover:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-8">
              <span className="text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold tracking-[-0.03em]">{o.title}</span>
              <span className="text-[17px] text-mute">{o.short}</span>
              <span aria-hidden="true" className="text-2xl text-blue transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          ))}
        </div>
      </Section>
      <Cta />
    </>
  );
}
