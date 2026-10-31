import type { Metadata } from "next";
import { Welcome } from "@/components/Welcome";

export const metadata: Metadata = {
  title: "Azienda",
  description: "Inserite il nome della vostra azienda: vi mostriamo solo le soluzioni che servono a voi.",
  alternates: { canonical: "/azienda" },
};

export default function AziendaPage() {
  return <Welcome variant="page" />;
}
