import {
  pgTable,
  text,
  jsonb,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { INTERVIEWER_ENUM } from "./enums";

export const interviewers = pgTable("interviewers", {
  id: INTERVIEWER_ENUM("id").primaryKey(),
  label: text().notNull(),
  description: text().notNull(),
  personality: jsonb(),
  color: text().notNull(),
  promptTemplate: jsonb("prompt_template"),
  version: integer().notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

