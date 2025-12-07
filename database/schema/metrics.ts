import { index, integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

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

