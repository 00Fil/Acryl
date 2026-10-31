import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "light";

const base = "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-[15px] font-semibold tracking-[-0.005em] transition-[color,background-color,border-color,transform] duration-300 ease-out-expo active:scale-[0.98]";
const styles: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue-deep",
  outline: "border border-ink/15 text-ink hover:border-ink",
  light: "bg-white text-ink hover:bg-tint",
};

export function Button({ href, children, variant = "primary", arrow = true, className }: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string }) {
  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {children}
      {arrow && <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1">→</span>}
    </Link>
  );
}
