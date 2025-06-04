import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const blogs = pgTable("Blog", {
  id: serial("id").primaryKey(),
  author: varchar("author", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("imageUrl", { length: 512 }).notNull().default(""),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  readingTime: integer("readingTime").notNull(),
  readingTimeUnit: varchar("readingTimeUnit", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`),
});

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;

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
