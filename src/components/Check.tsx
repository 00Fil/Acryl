"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

export function Check({ size = 28, className, tone = "blue" }: { size?: number; className?: string; tone?: "blue" | "white" }) {
  const blue = tone === "blue";
  return (
    <motion.span
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-5%" }}
      className={cn("inline-flex flex-none items-center justify-center rounded-full", blue ? "bg-blue text-white" : "bg-white text-blue", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d="M5 12.5l4.5 4.5L19 7.5" variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} />
      </svg>
    </motion.span>
  );
}
