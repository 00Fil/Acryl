import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "white";

const styles: Record<Variant, string> = {
  primary: "bg-blue text-white",
  outline: "border border-ink/90 text-ink",
  white: "bg-white text-ink",
};
const sweep: Record<Variant, string> = {
  primary: "bg-ink",
  outline: "bg-ink",
  white: "bg-ink",
};

export function Button({ href, children, variant = "primary", arrow = true, className }: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-4 text-base font-semibold isolate transition-colors duration-300 hover:text-white",
        styles[variant],
        className,
      )}
    >
      <span aria-hidden="true" className={cn("absolute inset-0 -z-10 translate-y-full rounded-full transition-transform duration-500 ease-expo group-hover:translate-y-0", sweep[variant])} />
      {children}
      {arrow && <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-expo group-hover:translate-x-1.5">→</span>}
    </Link>
  );
}
