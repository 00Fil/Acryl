import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={cn("wrap scroll-mt-28 py-24 md:py-36", className)}>{children}</section>;
}
