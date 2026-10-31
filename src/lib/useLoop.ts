"use client";
import { useEffect, useState } from "react";

/** Avanza da 0 a `count` ogni `ms`, poi si ferma `hold` ms e riparte. */
export function useLoop(count: number, ms = 1500, hold = 3500, active = true) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(count);
      return;
    }
    const t = setTimeout(() => setStep((s) => (s >= count ? 0 : s + 1)), step >= count ? hold : ms);
    return () => clearTimeout(t);
  }, [step, count, ms, hold, active]);
  return step;
}
