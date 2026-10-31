"use client";
import FloatingLines from "@/components/rb/FloatingLines";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

/** Hero a tutta pagina: una promessa, una riga di spiegazione, una azione. */
export function Hero({ title, accent, lead }: { title: string; accent: string; lead: string }) {
  return (
    <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <FloatingLines enabledWaves={["top", "middle", "bottom"]} lineCount={[6, 7, 6]} lineDistance={[7, 6, 8]} linesGradient={["#2a52ff", "#8fa6ff", "#2a52ff"]} animationSpeed={0.6} interactive={false} parallax={false} backgroundColor="#0b1020" />
      </div>
      <div className="wrap pb-16 pt-40 md:pb-24">
        <Reveal>
          <h1 className="display max-w-[15ch] !text-[clamp(3rem,8vw,7.5rem)]">
            {title} <span className="text-sky">{accent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-xl leading-relaxed text-white/75">{lead}</p>
            <div className="flex flex-wrap items-center gap-7">
              <Button href="/preventivo" variant="light">Calcolare il preventivo</Button>
              <a href="#offerte" className="text-[15px] font-semibold text-white/80 transition-colors hover:text-white">Cosa facciamo ↓</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
