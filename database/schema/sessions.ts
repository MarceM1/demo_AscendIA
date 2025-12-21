import { pgTable, uuid, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

import { interviewers } from "./interviewers";
import { interviews } from "./interviews";
import { INTERVIEWER_ENUM, LANGUAGE_SIMULATION_ENUM, SESSION_STATUS_ENUM } from "./enums";
import { users } from "./users";

export const interviewSessions = pgTable("interview_sessions", {
  id: uuid().primaryKey().defaultRandom(),

  interviewId: uuid("interview_id")
    .notNull()
    .references(() => interviews.id),
  userId: uuid("user_id")
  .notNull()
  .references(() => users.id),
  
  interviewerId: INTERVIEWER_ENUM("interviewer_id")
    .notNull()
    .references(() => interviewers.id),
  interviewerVersion: integer("interviewer_version").notNull().default(1),

  status: SESSION_STATUS_ENUM("status").notNull().default("CREATED"),

  language: LANGUAGE_SIMULATION_ENUM("language").default("es"),

  prompt_snapshot: jsonb("prompt_snapshot").notNull(),
  context_snapshot: jsonb("context_snapshot"),

  metrics: jsonb(),

  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});



