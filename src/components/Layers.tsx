"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import DotGrid from "./rb/DotGrid";

/** Il carattere di Acryl: piani trasparenti che si sovrappongono e creano nuovi toni. Nessun gradiente. */
const shapes = [
  { cls: "right-[3%] top-[5%] h-[34%] w-[26%] rounded-[3.5rem]", depth: 30, op: 0.14 },
  { cls: "right-[15%] top-[26%] h-[30%] w-[22%] rounded-[3rem]", depth: -22, op: 0.18 },
  { cls: "right-[4%] top-[44%] h-[22%] w-[13%] rounded-full", depth: 38, op: 0.22 },
  { cls: "left-[46%] top-[60%] h-[16%] w-[9%] rounded-[2rem]", depth: -16, op: 0.12 },
];

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
}

export function Layers({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 hidden overflow-hidden md:block ${className}`}>
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]">
        <DotGrid dotSize={4} gap={30} baseColor="#C5D1FF" activeColor="#2A52FF" proximity={140} strength={0.5} swell={1.2} fade={0} opacity={0.9} intro paused={reduced} clickShock />
      </div>
      {shapes.map((s, i) => (
        <Shape key={i} {...s} sx={sx} sy={sy} />
      ))}
    </div>
  );
}

function Shape({ cls, depth, op, sx, sy }: { cls: string; depth: number; op: number; sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring> }) {
  const tx = useTransform(sx, (v) => v * depth * 2);
  const ty = useTransform(sy, (v) => v * depth * 2);
  return (
    <motion.div
      className={`absolute bg-blue ${cls}`}
      style={{ x: tx, y: ty, opacity: op, mixBlendMode: "multiply" }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: op }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
