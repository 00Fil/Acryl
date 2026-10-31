"use client";
import Threads from "@/components/rb/Threads";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Check } from "./Check";


export function Hero({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,#000_40%,transparent_95%)]">
        <Threads color={[0.165, 0.32, 1]} amplitude={0.9} distance={0.12} lineCount={34} speed={0.22} enableMouseInteraction={false} />
      </div>
      <div className="wrap pt-20 pb-24 md:pt-32 md:pb-32">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-4 py-2 text-sm font-medium text-ink backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
            </span>
            Siti · Software · Automazioni AI
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display mt-8 max-w-[18ch]">{title}</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-9 max-w-xl text-xl leading-relaxed text-mute">{lead}</p>
          <div className="mt-11 flex flex-wrap gap-3">
            <Button href="/soluzioni">Vedi cosa facciamo</Button>
            <Button href="/preventivo" variant="outline" arrow={false}>Calcola un preventivo</Button>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="mt-20 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
          {[
            { label: "Consegna media", value: "[N]", unit: "settimane" },
            { label: "Codice e dati", value: "100%", unit: "vostri", check: true },
            { label: "Risposta", value: "[N]", unit: "ore lavorative" },
          ].map((s) => (
            <div key={s.label} className="bg-white p-7 md:p-9">
              <p className="text-sm text-mute">{s.label}</p>
              <p className="mt-3 flex items-baseline gap-2 text-[clamp(2rem,3.4vw,2.75rem)] font-semibold tracking-[-0.03em]">
                {s.check ? <Check size={26} className="self-center" /> : null}
                {s.value}
                <span className="text-base font-medium text-mute">{s.unit}</span>
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
