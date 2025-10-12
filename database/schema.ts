import {
  integer,
  uuid,
  index,
  foreignKey,
  pgTable,
  text,
  timestamp,
  date,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", [
  "USER",
  "SUBSCRIPTOR",
  "ADMIN",
  "RECRUITER",
  "INSTITUTION",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
    email: text("email").notNull().unique(),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    imgUrl: text("img_url"),
    role: ROLE_ENUM("role").default("USER"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    lastActivityDate: date("last_activity_date").defaultNow(),
  },
  (table) => [
    index("email_idx").on(table.email),
    index("clerk_idx").on(table.clerkId),
  ]
);


export const metrics = pgTable(
  "metrics",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("user_id").notNull(),
    totalInterviews: integer("total_interviews").default(0),
    avgScore: integer("avg_score").default(0),
    lastImprovement: date("last_improvement"),
  },
  (table) => [
    index("metrics_user_idx").on(table.userId),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
    }),
  ]
);

// export const postsTable = pgTable('posts_table', {
//   id: serial('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at')
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

export const interviewsTable = pgTable("interviews_table", {});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
