import * as z from "zod";

export const blogFormSchema = z.object({
  author: z.string().min(2, {
    message: "Der Autorenname muss mindestens 2 Zeichen lang sein.",
  }),
  title: z.string().min(5, {
    message: "Der Titel muss mindestens 5 Zeichen lang sein.",
  }),
  description: z.string().min(10, {
    message: "Die Beschreibung muss mindestens 10 Zeichen lang sein.",
  }),
  content: z.string().min(50, {
    message: "Der Inhalt muss mindestens 50 Zeichen lang sein.",
  }),
  imageUrl: z.string().url().or(z.literal("")),
  tags: z
    .array(z.string())
    .max(5, {
      message: "Es können maximal 5 Schlagwörter hinzugefügt werden.",
    })
    .default([]),
  readingTime: z.coerce.number().min(1),
  readingTimeUnit: z.enum(["minutes", "hours"]),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;
