"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Entrata rapida: poca distanza, poco tempo, una sola volta. */
export function Reveal({ children, delay = 0, y = 16, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}
