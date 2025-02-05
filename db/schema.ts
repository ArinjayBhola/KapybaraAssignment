import { date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("user", {
  id: uuid().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  password: varchar().notNull(),
});

export const notesTable = pgTable("notes", {
  id: uuid().primaryKey(),
  content: varchar().notNull(),
  bgColor: varchar().notNull(),
  dueDate: date(),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id),
});
