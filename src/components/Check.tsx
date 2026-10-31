import { cn } from "@/lib/cn";

/** Spunta essenziale: anello blu sottile e segno pieno. Nessun effetto superfluo. */
export function Check({ size = 22, tone = "blue", className }: { size?: number; tone?: "blue" | "white"; className?: string }) {
  const c = tone === "blue" ? "text-blue bg-tint-2" : "text-white bg-white/20";
  return (
    <span aria-hidden="true" className={cn("inline-flex flex-none items-center justify-center rounded-full", c, className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 16 16" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5l2.75 2.75L12.5 5" />
      </svg>
    </span>
  );
}
