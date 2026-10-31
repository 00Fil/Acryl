# Acryl

Sito della web agency. Next.js (App Router) · TypeScript · Tailwind v4 · Motion · Lenis.

## Avvio

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Copia `.env.example` in `.env.local` e compila le variabili.

## Struttura

- `src/content/site.ts`: **tutti i testi**: soluzioni AI, categorie, settori, principi, passi, FAQ, menu. Si modifica qui senza toccare i componenti.
- `src/components`: componenti (Header con mega menu, demo animate, tab, FAQ, form).
- `src/app`: pagine (`/`, `/soluzioni`, `/ai`, `/ai/[slug]`, `/chi-siamo`, `/preventivo`, `/privacy`) e `api/preventivo`.

## Aggiungere una soluzione AI

Aggiungi un oggetto a `aiSolutions` in `src/content/site.ts`: pagina, menu, footer e sitemap si aggiornano da soli.

## Form preventivo

`POST /api/preventivo`: validazione con zod, honeypot, limite di 5 richieste ogni 10 minuti per IP. Con `RESEND_API_KEY` invia l'email; senza, scrive la richiesta nei log. Il limite è in memoria: con più repliche va spostato su Redis.

## Deploy

`Dockerfile` pronto (output standalone, utente non root). Su Dokploy: build da Dockerfile, porta 3000, variabili da `.env.example`; `NEXT_PUBLIC_SITE_URL` anche come build arg.

## Da completare prima del lancio

- Segnaposto `[...]`: ragione sociale, P.IVA, indirizzo, team, tempi di risposta, dominio e email in `site.ts`.
- `/privacy`: bozza da far scrivere a un consulente.
- Testi di esempio (settori, FAQ, demo): verificare con i servizi reali.
- Prezzi: volutamente assenti; la stima mostra solo la complessità.
