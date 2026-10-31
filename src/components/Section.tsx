import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal, Words } from "./Reveal";

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("wrap scroll-mt-24 pt-28 md:pt-44", className)}>
      {children}
    </section>
  );
}

export function SectionHead({ title, lead, className }: { title: string; lead?: string; className?: string }) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <Words as="h2" text={title} className="h-section" />
      {lead && (
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute md:text-xl">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full bg-tint px-4 py-2 text-sm font-medium text-blue">
      <span className="h-2.5 w-2.5 rounded-full bg-blue [animation:pulse-ring_1.8s_ease-out_infinite]" />
      {children}
    </span>
  );
}
