"use server";
import { db} from "@/database/db";
import { interviews } from "@/database/schema/interviews";
import { getInternalUser } from "@/lib/auth/getInternalUser";
import { NewInterviewFormSchema } from "@/lib/zod/schema";
import { ActionResult } from "@/types/types";



export const createNewInterview = async (
  prevState: unknown,
  data: { area: string; interviewer: string; position: string }
): Promise<ActionResult<{ interviewId: string }>> => {
  // console.log("createNewInterview called with data:", data);
  try {
    //Auth with clerk
    console.log("[createNewInterview] Authenticating user...");
    const user = await getInternalUser();
    if (!user) {
      return { success: false, message: "Usuario no autenticado" };
    }
    const { clerkId, internalId:internalUserId } = user;
    console.log("[createNewInterview] User authenticated with ID:", clerkId);

    // Zod validation in server
    console.log("[createNewInterview] Parsing and validating form data...");
    const parsedData = NewInterviewFormSchema().parse(data);
    if (!parsedData) {
      return { success: false, message: "Payload inválido o ausente" };
    }
    console.log("[createNewInterview] Form data parsed and validated:", parsedData);

    //Insercion en DB
    console.log("[createNewInterview] Inserting new interview into database...");
    const [createdInterview] = await db
      .insert(interviews)
      .values({
        area: parsedData.area,
        interviewer: parsedData.interviewer,
        position: parsedData.position,
        feedback: null,
        score: null,
        userId: internalUserId,
      })
      .returning({ id: interviews.id });

    if (!createdInterview) {
      return { success: false, message: "Error al crear entrevista" };
    }
    console.log("[createNewInterview] Interview created with ID:", createdInterview.id);

    return { success: true, data: { interviewId: createdInterview.id } };
  } catch (error) {
    console.error("[createNewInterview] Error en createNewInterview:", error);
    return {
      success: false,
      message: "Error al crear entrevista",
      error: error as unknown,
    };
  }
};
