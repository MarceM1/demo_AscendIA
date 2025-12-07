import { INTERVIEWERS } from "@/constants";
import { db } from "../db";
import { interviewers } from "../schema/interviewers";
import { eq } from "drizzle-orm";

export async function seedInterviewers() {
  console.log("🌱 Seeding interviewers...");

  for (const interviewer of INTERVIEWERS) {
    const exists = await db.query.interviewers.findFirst({
      where: eq(interviewers.id, interviewer.id),
    });

    if (!exists) {
      await db.insert(interviewers).values(interviewer);
      console.log(` → Inserted interviewer: ${interviewer.label}`);
    } else {
      console.log(` → Skipped (exists): ${interviewer.label}`);
    }
  }

  console.log("✓ Seeding interviewers completed");
}
