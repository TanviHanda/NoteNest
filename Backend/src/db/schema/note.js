import {pgTable,serial,varchar,text,integer,timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./user.js";
import { folders } from "./folder.js";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  content: text("content").notNull(),

  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),

  folder_id: integer("folder_id")
    .references(() => folders.id),

  created_at: timestamp("created_at").defaultNow().notNull(),

  updated_at: timestamp("updated_at").defaultNow().notNull(),
});