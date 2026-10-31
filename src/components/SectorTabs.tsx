"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sectors } from "@/content/site";
import { Check } from "./Check";
import { cn } from "@/lib/cn";

export function SectorTabs() {
  const [i, setI] = useState(0);
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div role="tablist" aria-label="Settori" className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
        {sectors.map((s, k) => (
          <button key={s.name} role="tab" aria-selected={i === k} onClick={() => setI(k)} onMouseEnter={() => setI(k)} className={cn("flex items-center justify-between rounded-full px-6 py-3.5 text-left text-lg font-medium transition-colors lg:rounded-2xl lg:py-4 lg:text-xl", i === k ? "bg-blue text-white" : "bg-tint hover:bg-tint-2 lg:bg-transparent")}>
            {s.name}
            <span aria-hidden="true" className="hidden lg:inline">→</span>
          </button>
        ))}
      </div>
      <div className="relative min-h-[360px] overflow-hidden rounded-[2.5rem] border border-line bg-tint p-8 md:p-12">
        <p className="text-sm font-medium text-mute">Esempi di cosa si può automatizzare</p>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{sectors[i].name}</h3>
            <ul className="mt-8 flex flex-col gap-3">
              {sectors[i].items.map((t) => (
                <li key={t} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 text-[17px]">
                  <Check size={28} />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
