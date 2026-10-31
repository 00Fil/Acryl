"use client";
import { useRef } from "react";
import Link from "next/link";
import DotGrid from "@/components/rb/DotGrid";
import RotatingText from "@/components/rb/RotatingText";
import VariableProximity from "@/components/rb/VariableProximity";
import { Button } from "./Button";
import { HeroDeck } from "./HeroDeck";
import { Reveal } from "./Reveal";

const BUILDS = ["siti web", "software", "automazioni AI", "assistenti AI"];

/** Hero: griglia viva, titolo che reagisce al cursore, mazzo di anteprime di ciò che consegniamo. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prox = { containerRef: ref, radius: 160, falloff: "gaussian" as const, fromFontVariationSettings: "'wght' 600, 'wdth' 100", toFontVariationSettings: "'wght' 700, 'wdth' 78" };

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_45%,#000_30%,transparent_80%)]">
        <DotGrid dotSize={3} gap={26} baseColor="#27305a" activeColor="#2a52ff" proximity={150} glow={0} swell={0.6} shockRadius={260} shockStrength={4} />
      </div>

      <div className="wrap grid min-h-[calc(100svh-72px)] items-center gap-14 py-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:py-24">
        <div>
          <Reveal>
            <p className="eyebrow !text-sky">Studio digitale per le aziende</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="display mt-7 !text-[clamp(2.75rem,5.6vw,5.75rem)] !leading-[1.02]">
              <VariableProximity label="Progettiamo" {...prox} />
              <br />
              <RotatingText
                texts={BUILDS}
                rotationInterval={2400}
                staggerDuration={0.05}
                staggerFrom="first"
                splitBy="words"
                mainClassName="my-[0.08em] inline-flex whitespace-nowrap overflow-hidden rounded-[0.22em] bg-blue px-[0.22em] pb-[0.06em] text-white"
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 380 }}
              />
              <br />
              <VariableProximity label="che lavorano" {...prox} />
              <br />
              <VariableProximity label="per voi." {...prox} />
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-9 max-w-lg text-xl leading-relaxed text-white/70">
              Per aziende che vogliono più clienti e meno lavoro ripetuto. Prezzo fisso, consegna a tappe, codice e dati vostri.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Button href="/preventivo" variant="light">Calcolare il preventivo</Button>
              <Link href="/azienda" className="group inline-flex items-center gap-2 text-[16px] font-semibold text-white/85 transition-colors hover:text-white">
                Soluzioni per la vostra azienda
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative hidden h-[560px] w-full lg:block">
          <div className="absolute inset-y-0 -left-16 right-20">
            <HeroDeck />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
