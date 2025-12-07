import { AREAS } from "@/constants";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { areas } from "../schema";

export async function seedAreas (){
    console.log("🌱 Seeding areas...");
    for (const area of AREAS) {
    const exists = await db.query.areas.findFirst({
      where: eq(areas.id, area.id),
    });

    if (!exists) {
      await db.insert(areas).values(area);
      console.log(` → Inserted area: ${area.label}`);
    } else {
      console.log(` → Skipped (exists): ${area.label}`);
    }
    }

    console.log("✓ Seeding areas completed");

}
