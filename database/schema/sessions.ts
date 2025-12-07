import { pgTable, uuid, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

import { interviewers } from "./interviewers";
import { interviews } from "./interviews";
import { INTERVIEWER_ENUM } from "./enums";

export const interviewSessions = pgTable("interview_sessions", {
  id: uuid().primaryKey().defaultRandom(),
  interviewId: uuid("interview_id")
    .notNull()
    .references(() => interviews.id),
  interviewerId: INTERVIEWER_ENUM("interviewer_id")
    .notNull()
    .references(() => interviewers.id),
  interviewerVersion: integer("interviewer_version").notNull().default(1),

  promptUsed: jsonb("prompt_used").notNull(),
  metrics: jsonb(),
  transcript: jsonb(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});



