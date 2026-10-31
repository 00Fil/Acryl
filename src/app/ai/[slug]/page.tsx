import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "@/components/Check";
import { CheckList } from "@/components/CheckList";
import { Button } from "@/components/Button";
import { Cta } from "@/components/Cta";
import { DemoFor } from "@/components/Demos";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHead } from "@/components/SectionHead";
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
      <PageHero title={s.title} lead={s.lead} eyebrow={undefined}>
        <div className="flex flex-wrap items-center gap-6">
          <Button href="/preventivo">Calcola il preventivo</Button>
          <nav aria-label="Percorso" className="text-[15px] text-mute">
            <Link href="/soluzioni" className="hover:text-blue">Soluzioni</Link> / <Link href="/ai" className="hover:text-blue">AI</Link> / <span className="text-ink">{s.title}</span>
          </nav>
        </div>
      </PageHero>
      <Section className="!pt-0">
        <Reveal><DemoFor kind={s.demo} /></Reveal>
      </Section>

      <Section>
        <SectionHead index="01" eyebrow="Funzioni" title="Cosa può fare." />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {s.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.08}>
              <div className="h-full rounded-[var(--radius-card)] border border-line bg-white p-8 transition-colors duration-500 hover:border-blue/40 md:p-10">
                <Check size={36} />
                <h3 className="mt-7 text-2xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-mute">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-3">
          <Reveal><h3 className="mb-6 text-2xl font-semibold tracking-tight">Per chi è</h3><CheckList items={s.forWho} /></Reveal>
          <Reveal delay={0.1}><h3 className="mb-6 text-2xl font-semibold tracking-tight">Cosa serve per partire</h3><CheckList items={s.needs} /></Reveal>
          <Reveal delay={0.2}><h3 className="mb-6 text-2xl font-semibold tracking-tight">Limiti e controlli</h3><CheckList items={s.limits} /></Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead index="02" eyebrow="Metodo" title="Come procediamo." />
        <Steps />
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <SectionHead index="03" eyebrow="Domande" title="Domande frequenti." />
          <Faq items={faqs.slice(0, 4)} />
        </div>
      </Section>

      <Section>
        <SectionHead index="04" eyebrow="Altre" title="Altre soluzioni AI." />
        <div className="mt-12 divide-y divide-line border-y border-line">
          {others.map((o) => (
            <Link key={o.slug} href={`/ai/${o.slug}`} className="group grid items-center gap-3 py-8 transition-colors md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-8">
              <span className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold tracking-[-0.03em] transition-colors group-hover:text-blue">{o.title}</span>
              <span className="text-[17px] text-mute">{o.short}</span>
              <span aria-hidden="true" className="text-2xl text-blue transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>
      </Section>
      <Cta />
    </>
  );
}
