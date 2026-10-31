import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="wrap pt-32 pb-8">
      <p className="text-sm font-semibold text-blue">404</p>
      <h1 className="h-display mt-4">Pagina non trovata.</h1>
      <p className="mt-6 max-w-md text-xl text-mute">Il link potrebbe essere cambiato. Ripartiamo dalla home.</p>
      <div className="mt-10"><Button href="/">Torna alla home</Button></div>
    </section>
  );
}
