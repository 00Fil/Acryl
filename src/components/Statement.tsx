"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

export function Statement({ text, accent = [] }: { text: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="max-w-5xl text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent.some((a) => w.toLowerCase().startsWith(a))}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const o = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity: o }} className={`mr-[0.25em] inline-block ${accent ? "text-blue" : ""}`}>
      {children}
    </motion.span>
  );
}
