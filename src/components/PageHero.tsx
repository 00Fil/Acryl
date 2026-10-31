"use client";
import BlurText from "@/components/rb/BlurText";
import Threads from "@/components/rb/Threads";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

/** Testata delle pagine interne: stessa grammatica della home, più compatta. */
export function PageHero({ title, lead, eyebrow, children, bg = true }: { title: string; lead?: string; eyebrow?: string; children?: ReactNode; bg?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden">
      {bg && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,#000_30%,transparent_95%)]">
          <Threads color={[0.165, 0.32, 1]} amplitude={0.7} distance={0.1} lineCount={26} speed={0.18} enableMouseInteraction={false} />
        </div>
      )}
      <div className="wrap pt-20 pb-16 md:pt-32 md:pb-24">
        {eyebrow && <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>}
        <h1 className="sr-only">{title}</h1>
        <BlurText text={title} animateBy="words" direction="bottom" delay={80} className="display mt-6 max-w-[20ch]" />
        {lead && <Reveal delay={0.3}><p className="mt-8 max-w-xl text-xl leading-relaxed text-mute">{lead}</p></Reveal>}
        {children && <Reveal delay={0.45} className="mt-10">{children}</Reveal>}
      </div>
    </section>
  );
}
