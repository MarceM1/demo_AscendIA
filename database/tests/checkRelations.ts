// database/tests/check-relations.ts
import "dotenv/config";
import { db } from "../db";
import { sql, eq, isNull } from "drizzle-orm";

import { interviews } from "../schema/interviews";
import { areas } from "../schema/areas";
import { interviewers } from "../schema/interviewers";

async function main() {
  try {
    // Check missing area
    const missingArea = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(interviews)
      .leftJoin(areas, eq(interviews.area, areas.id))
      .where(isNull(areas.id))
      .limit(1);

    // Check missing interviewer
    const missingInterviewer = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(interviews)
      .leftJoin(interviewers, eq(interviews.interviewer, interviewers.id))
      .where(isNull(interviewers.id))
      .limit(1);

    const missingAreaCount = missingArea[0]?.count ?? 0;
    const missingInterviewerCount = missingInterviewer[0]?.count ?? 0;

    if (missingAreaCount > 0 || missingInterviewerCount > 0) {
      console.error("\n❌ Relations integrity FAILED");
      console.error("Interviews with missing area:", missingAreaCount);
      console.error("Interviews with missing interviewer:", missingInterviewerCount);
      process.exitCode = 1;
      return;
    }

    console.log("\n✅ Relations integrity OK");
    process.exitCode = 0;
  } catch (err) {
    console.error("❌ Error checking relations:", err);
    process.exitCode = 2;
  }
}

main();
