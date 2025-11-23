"use server";

import { db, interviews } from "@/database/db";
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
    return {
      success: true,
      data: { interviews: userInterviews as Interview[] },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al obtener las entrevistas",
      error,
    };
  }
};
