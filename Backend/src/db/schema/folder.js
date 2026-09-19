import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

import { users } from "./user.js";

export const folders = pgTable("folders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
});