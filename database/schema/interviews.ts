import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  index,
  integer,
  real,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { AREA_ENUM, INTERVIEWER_ENUM, SPEAKER_ENUM } from "./enums";
import { interviewSessions } from "./sessions";

export const interviews = pgTable(
  "interviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    area: AREA_ENUM("area").default("TECNOLOGIA_IT"),
    interviewer: INTERVIEWER_ENUM("interviewer").default("LUCIANA"),
    position: varchar("position", { length: 255 }),
    feedback: text("feedback"),
    score: integer("score"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("interviews_user_idx").on(table.userId)]
);

export const feedbacksTable = pgTable("feedbacks", {
  id: uuid().primaryKey().defaultRandom(),
  interviewId: uuid("interview_id")
    .notNull()
    .references(() => interviews.id),
  position: varchar({ length: 255 }),
  feedback: text(),
  score: integer(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const interview_transcripts = pgTable(
  "interview_transcripts",
  {
    id: uuid().primaryKey().defaultRandom(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => interviewSessions.id),

    speaker: SPEAKER_ENUM("speaker").notNull(),
    content: text("content").notNull(),
    confidence: real("confidence"),

    startedAt: timestamp("started_at"),
    endedAt: timestamp("ended_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),

    
  },

  (table) => [index("transcript_session_idx").on(table.sessionId)]
);
