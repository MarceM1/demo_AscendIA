"use server";

import { db } from "@/database/db";
import { eq } from "drizzle-orm";

import { interviews } from "@/database/schema/interviews";
import { areas } from "@/database/schema/areas";
import { interviewers } from "@/database/schema/interviewers";

import { EnrichedInterview } from "@/database/types";
import { ActionResult } from "@/types/types";

export async function getInterviewById(
  interviewId: string
): Promise<ActionResult<{ interview: EnrichedInterview }>> {
  try {
    const row = await db
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
      .where(eq(interviews.id, interviewId))
      .limit(1);

    if (!row || row.length === 0) {
      return {
        success: false,
        message: "Interview not found",
      };
    }

    return {
      success: true,
      data: {
        interview: row[0] as EnrichedInterview,
      },
    };
  } catch (err) {
    console.error("[getInterviewById] Error:", err);

    return {
      success: false,
      message: "Internal error fetching interview",
      error: err,
    };
  }
}
