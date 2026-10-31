"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { aiSolutions } from "@/content/site";
import { DemoFor } from "./Demos";
import { cn } from "@/lib/cn";

export function AiTabs() {
  const [i, setI] = useState(0);
  const s = aiSolutions[i];
  return (
    <div>
      <div role="tablist" aria-label="Soluzioni AI" className="flex flex-wrap gap-2">
        {aiSolutions.map((a, k) => (
          <button key={a.slug} role="tab" aria-selected={i === k} onClick={() => setI(k)} className={cn("rounded-full px-6 py-3.5 text-[17px] font-medium transition-colors duration-300", i === k ? "bg-blue text-white" : "bg-tint text-ink hover:bg-tint-2")}>
            {a.title}
          </button>
        ))}
      </div>
      <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-line bg-tint p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <p className="text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-tight">{s.short}</p>
              <p className="mt-5 text-lg leading-relaxed text-mute">{s.lead}</p>
              <Link href={`/ai/${s.slug}`} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-blue px-7 py-4 font-semibold text-white transition-colors hover:bg-ink">
                Scopri {s.title.toLowerCase()} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>
              </Link>
            </div>
            <DemoFor kind={s.demo} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
