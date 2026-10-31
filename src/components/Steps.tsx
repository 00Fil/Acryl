"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { steps } from "@/content/site";

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  return (
    <div ref={ref} className="relative mt-16">
      <div className="absolute left-0 right-0 top-[15px] hidden h-[3px] rounded-full bg-tint-2 md:block" />
      <motion.div style={{ scaleX: p }} className="absolute left-0 right-0 top-[15px] hidden h-[3px] origin-left rounded-full bg-blue md:block" />
      <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <motion.span initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }} className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">
              {i + 1}
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-3 text-[17px] leading-relaxed text-mute">{s.text}</p>
            <p className="mt-5 rounded-2xl bg-tint px-4 py-3 text-[15px] text-blue">
              <span className="font-semibold">Risultato:</span> {s.out}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
