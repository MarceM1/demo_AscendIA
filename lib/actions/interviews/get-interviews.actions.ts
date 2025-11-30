"use server";

import { db, interviews } from "@/database/db";
import { enrichInterviews } from "@/lib/mappers/interviews";
import { ActionResult, Interview } from "@/types/types";
import { desc, eq } from "drizzle-orm";

export const getInterviews = async (
  internalUserId: string
): Promise<ActionResult<{ interviews: Interview[] }>> => {
  try {
    // Fetch interviews for the user
    const userInterviews = await db.query.interviews.findMany({
      where: eq(interviews.userId, internalUserId),
      orderBy: desc(interviews.createdAt),
    });

    const  enriched = enrichInterviews(userInterviews as Interview[]);

    return {
      success: true,
      data: { interviews: enriched },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al obtener las entrevistas",
      error,
    };
  }
};
