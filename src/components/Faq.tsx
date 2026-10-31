"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-b border-line">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className="border-t border-line">
            <h3>
              <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="group flex w-full items-center justify-between gap-6 py-7 text-left text-[clamp(1.25rem,2vw,1.6rem)] font-semibold tracking-tight transition-colors hover:text-blue">
                {f.q}
                <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-2xl transition-all duration-300 ${on ? "rotate-45 bg-blue text-white" : "bg-tint text-blue group-hover:bg-tint-2"}`}>+</span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <p className="max-w-3xl pb-8 pr-16 text-lg leading-relaxed text-mute">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
