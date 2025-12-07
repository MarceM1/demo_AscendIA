// database/seeds/interviewers.ts
import { db } from "../db";
import { interviewers } from "../schema/interviewers";
import { INTERVIEWERS } from "@/constants";

export async function seedInterviewers() {
  console.log("🌱 Seeding interviewers...");

  for (const interviewer of INTERVIEWERS) {
    await db
      .insert(interviewers)
      .values({
        id: interviewer.id,
        label: interviewer.label,
        description: interviewer.description,
        color: interviewer.color,
        personality: interviewer.personality,
        promptTemplate: interviewer.promptTemplate,
        version: interviewer.version,
      })
      .onConflictDoUpdate({
        target: interviewers.id,
        set: {
          label: interviewer.label,
          description: interviewer.description,
          color: interviewer.color,
          personality: interviewer.personality,
          promptTemplate: interviewer.promptTemplate,
          version: interviewer.version,
        },
      });

    console.log(`   → Interviewer ${interviewer.id} insertado/actualizado`);
  }

  console.log("✅ Interviewers seeded.\n");
}
