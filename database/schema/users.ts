import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { ROLE_ENUM } from "./enums";


// Schemas

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


