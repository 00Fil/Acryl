"use client";
import MagicBento, { type MagicBentoItem } from "@/components/rb/MagicBento";
import { categories } from "@/content/site";

const visuals = { ai: "automation", siti: "collaboration", prodotti: "dashboard", marketing: "analytics", supporto: "security" } as const;

export function SolutionsGrid() {
  const items: MagicBentoItem[] = categories.map((c) => ({
    id: c.id,
    label: `0${categories.indexOf(c) + 1}`,
    title: c.title,
    description: c.intro,
    href: c.id === "ai" ? "/ai" : `/soluzioni#${c.id}`,
    visual: visuals[c.id as keyof typeof visuals] ?? "analytics",
    colSpan: c.id === "ai" ? 2 : 1,
  }));
  return <MagicBento items={items} theme="light" columns={3} rowHeight={340} gap={16} radius={28} glowColor="42, 82, 255" enableTilt={false} enableMagnetism={false} enableStars={false} enableSpotlight enableBorderGlow />;
}
