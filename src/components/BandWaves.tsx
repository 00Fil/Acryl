"use client";
import { useEffect, useState } from "react";
import Waves from "./rb/Waves";

/** Linee animate su fondo blu, per le bande a tutta larghezza. */
export function BandWaves() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      <Waves backgroundColor="#2A52FF" lineColor="#8FA6FF" accentColor="#FFFFFF" amplitude={0.8} speed={0.6} paused={reduced} />
    </div>
  );
}
