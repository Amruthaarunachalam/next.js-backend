import { pgTable, text, timestamp, serial, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const todo = pgTable("Todo", {
  id: serial().primaryKey().notNull(),
  title: text().notNull(),
  description: text(),
  status: boolean().default(false).notNull(),
  priority: text().default('normal'),
  createdAt: timestamp({ precision: 3, mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});