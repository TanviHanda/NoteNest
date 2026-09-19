import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { users } from "./user.js";
import { notes } from "./note.js";

export const favourites = pgTable("favourites", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  note_id: integer("note_id")
    .notNull()
    .references(() => notes.id),
});