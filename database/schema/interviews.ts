import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  index,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { AREA_ENUM, INTERVIEWER_ENUM } from "./enums";



export const interviews = pgTable(
  "interviews_table",
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

export const feedbacksTable = pgTable("feedbacks_table", {
  id: uuid().primaryKey().defaultRandom(),
  interviewId: uuid("interview_id")
    .notNull()
    .references(() => interviews.id),
  position: varchar({ length: 255 }),
  feedback: text(),
  score: integer(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});


