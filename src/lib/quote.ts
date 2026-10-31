import { z } from "zod";

export const quoteSchema = z.object({
  needs: z.array(z.string().min(1).max(80)).min(1, "Seleziona almeno una voce").max(20),
  situation: z.enum(["nuovo", "rifare", "esistente"]),
  timing: z.enum(["subito", "1-3-mesi", "valutando"]),
  name: z.string().trim().min(2, "Inserisci il nome").max(120),
  email: z.email("Email non valida").max(200),
  company: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
  consent: z.literal(true, { error: "Serve il consenso al trattamento dei dati" }),
  website: z.string().max(0).optional().default(""), // honeypot
});

export type QuoteInput = z.infer<typeof quoteSchema>;
