import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  id: serial().primaryKey(),
  content: varchar().notNull(),
  bgColor: varchar().notNull(),
});
