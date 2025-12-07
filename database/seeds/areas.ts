// database/seeds/areas.ts
import { db } from "../db";
import { areas } from "../schema/areas";
import { AREAS } from "@/constants";

export async function seedAreas() {
  console.log("🌱 Seeding areas...");

  for (const area of AREAS) {
    await db
      .insert(areas)
      .values({
        id: area.id,
        label: area.label,
        description: area.description,
        color: area.color,
        version: area.version,
      })
      .onConflictDoUpdate({
        target: areas.id,
        set: {
          label: area.label,
          description: area.description,
          color: area.color,
          version: area.version,
        },
      });

    console.log(`   → Area ${area.id} insertada/actualizada`);
  }

  console.log("✅ Areas seeded.\n");
}
