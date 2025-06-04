import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
  integer,
} from "drizzle-orm/pg-core";

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
