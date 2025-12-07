import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { WEBHOOK_STATUS_ENUM } from "./enums";

export const webhookLogs = pgTable(
  "webhook_logs",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    eventId: varchar("event_id", { length: 255 }).unique().notNull(),
    eventType: varchar("event_type", { length: 100 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    status: WEBHOOK_STATUS_ENUM("status").notNull(),
    errorMessage: text("error_message"),
    payload: jsonb("payload").$type<Record<string, JSON>>(),
    processedAt: timestamp("processed_at"),
    attempId: varchar("attempt_id", { length: 255 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("webhook_logs_event_idx").on(table.eventId),
    index("webhook_logs_user_idx").on(table.userId),
    index("webhook_logs_status_idx").on(table.status),
  ]
);