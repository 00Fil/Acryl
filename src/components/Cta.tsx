"use client";
import FloatingLines from "@/components/rb/FloatingLines";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function Cta({ title = "Hai un processo da migliorare?", text = "Raccontateci cosa volete ottenere: vi rispondiamo con una proposta scritta." }: { title?: string; text?: string }) {
  return (
    <section className="wrap py-24 md:py-36">
      <div className="relative isolate overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <FloatingLines enabledWaves={["top", "middle", "bottom"]} lineCount={[5, 6, 5]} lineDistance={[7, 6, 8]} linesGradient={["#2a52ff", "#8fa6ff", "#2a52ff"]} animationSpeed={0.8} interactive parallax={false} backgroundColor="#0b1020" />
        </div>
        <div className="relative flex flex-col items-start justify-between gap-10 p-9 md:flex-row md:items-end md:p-16 lg:p-20">
          <Reveal className="max-w-2xl">
            <h2 className="heading !text-[clamp(2.25rem,5vw,4.5rem)]">{title}</h2>
            <p className="mt-6 max-w-lg text-lg text-white/75">{text}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <Button href="/preventivo" variant="light">Calcolare il preventivo</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
