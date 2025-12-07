// database/schema/areas.ts
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { AREA_ENUM } from "./enums";


export const areas = pgTable("areas", {
  id: AREA_ENUM("id").primaryKey(),
  label: text("label").notNull(),
  description: text("description").notNull(),
  color: text("color").notNull(),

  version: integer("version").notNull().default(1),

  createdAt: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull(),
});





