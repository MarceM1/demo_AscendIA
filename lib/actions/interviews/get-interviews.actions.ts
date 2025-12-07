"use server";

import { db } from "@/database/db";
import { eq, desc } from "drizzle-orm";

import { interviews } from "@/database/schema/interviews";
import { areas } from "@/database/schema/areas";
import { interviewers } from "@/database/schema/interviewers";

import { EnrichedInterview, EnrichedInterviewWithSessions } from "@/database/types";
import { ActionResult } from "@/types/types";

export async function getInterviews(
  internalUserId: string
): Promise<ActionResult<{ interviews: EnrichedInterview[] }>> {
  try {
    const rows = await db
      .select({
        id: interviews.id,
        userId: interviews.userId,
        area: interviews.area,
        interviewer: interviews.interviewer,
        position: interviews.position,
        feedback: interviews.feedback,
        score: interviews.score,
        createdAt: interviews.createdAt,
        areaDetails: {
          id: areas.id,
          label: areas.label,
          description: areas.description,
          color: areas.color,
          version: areas.version,
        },
        interviewerDetails: {
          id: interviewers.id,
          label: interviewers.label,
          description: interviewers.description,
          color: interviewers.color,
          promptTemplate: interviewers.promptTemplate,
          version: interviewers.version,
        },
      })
      .from(interviews)
      .leftJoin(areas, eq(interviews.area, areas.id))
      .leftJoin(interviewers, eq(interviews.interviewer, interviewers.id))
      .where(eq(interviews.userId, internalUserId))
      .orderBy(desc(interviews.createdAt));

    return {
      success: true,
      data: {
        interviews: rows as unknown as EnrichedInterviewWithSessions[],
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al obtener las entrevistas",
      error,
    };
  }
}
