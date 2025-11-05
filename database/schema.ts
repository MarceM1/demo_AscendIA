import { relations } from "drizzle-orm";
import {
  integer,
  uuid,
  index,
  pgTable,
  text,
  timestamp,
  pgEnum,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";
import { use } from "react";

//Enums
export const ROLE_ENUM = pgEnum("role", [
  "USER",
  "SUBSCRIPTOR",
  "ADMIN",
  "RECRUITER",
  "INSTITUTION",
]);

export const AREA_ENUM = pgEnum("area", [
  "IT",
  "MARKETING",
  "SALES",
  "HR",
  "FINANCE",
]);

export const INTERVIEWER_ENUM = pgEnum("interviewer", [
  "BOB",
  "LIZA",
  "MICHAEL",
  "MANUEL",
  "LUCIANA",
]);

//Tablas
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
    email: text("email").notNull().unique(),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    imgUrl: text("img_url"),
    role: ROLE_ENUM("role").default("USER"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
    lastActivityDate: timestamp("last_activity_date").defaultNow(),
  },
  (table) => [
    index("email_idx").on(table.email),
    index("clerk_idx").on(table.clerkId),
  ]
);

export const userSessions = pgTable(
  "user_sessions",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    sessionToken: text("session_token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    loginAt: timestamp("login_at").notNull().defaultNow(),
    logoutAt: timestamp("logout_at"),
    deviceInfo: jsonb("device_info"),
  },
  (table) => [index("user_sessions_user_idx").on(table.userId)]
);

export const webhookLogs = pgTable(
  "webhook_logs",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    eventId: varchar("event_id", { length: 255 }).notNull(),
    eventType: varchar("event_type", { length: 100 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("received"),
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

export const userProfiles = pgTable(
  "user_profiles",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    bio: text("bio"),
    location: varchar("location", { length: 255 }),
    skills: jsonb("skills").$type<string[]>(),
    preferences: jsonb("preferences").$type<{
      theme: string;
      notifications: boolean;
    }>(),
  },
  (table) => [index("user_profiles_user_idx").on(table.userId)]
);

export const userSkills = pgTable(
  "user_skills",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    skill: varchar("skill", { length: 255 }).notNull(),
  },
  (table) => [index("user_skills_user_idx").on(table.userId)]
);

export const metrics = pgTable(
  "metrics",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    totalInterviews: integer("total_interviews").default(0),
    avgScore: integer("avg_score").default(0),
    lastImprovement: timestamp("last_improvement"),
  },
  (table) => [index("metrics_user_idx").on(table.userId)]
);

export const interviews = pgTable(
  "interviews_table",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    area: AREA_ENUM("area").default("IT"),
    interviewer: INTERVIEWER_ENUM("interviewer").default("LUCIANA"),
    position: varchar("position", { length: 255 }),
    feedback: text("feedback"),
    score: integer("score"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("interviews_user_idx").on(table.userId)]
);

//Relaciones
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  sessions: many(userSessions),
  metrics: many(metrics),
  interviews: many(interviews),
  skills: many(userSkills),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));

export const metricsRelations = relations(metrics, ({ one }) => ({
  user: one(users, {
    fields: [metrics.userId],
    references: [users.id],
  }),
}));

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
}));

export const interviewsRelations = relations(interviews, ({ one }) => ({
  user: one(users, {
    fields: [interviews.userId],
    references: [users.id],
  }),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertProfile = typeof userProfiles.$inferInsert;
export type SelectProfile = typeof userProfiles.$inferSelect;
export type InsertedInterview = typeof interviews.$inferInsert;
export type SelectedInterview = typeof interviews.$inferSelect;
export type WebhookLog = typeof webhookLogs.$inferSelect;
