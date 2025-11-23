"use server";
import { db, users } from "@/database/db";
import { interviews } from "@/database/schema";
import { NewInterviewFormSchema } from "@/lib/zod/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; error?: unknown };

export const createNewInterview = async (
  prevState: unknown,
  data: { area: string; interviewer: string; position: string }
): Promise<ActionResult<{ interviewId: string }>> => {
  console.log("createNewInterview called with data:", data);
  try {
    //Auth with clerk
    console.log("Authenticating user...");
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return { success: false, message: "Usuario no autenticado" };
    }
    console.log("User authenticated with ID:", clerkId);

    //Get internal user ID from DB
    console.log("Fetching internal user ID from database...");
    
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    if (!dbUser) {
      return { success: false, message: "Usuario no encontrado en BD" };
    }

    const internalUserId = dbUser.id; 

    // Zod validation in server
    console.log("Parsing and validating form data...");
    const parsedData = NewInterviewFormSchema().parse(data);
    if (!parsedData) {
      return { success: false, message: "Payload inválido o ausente" };
    }
    console.log("Form data parsed and validated:", parsedData);

    //Insercion en DB
    console.log("Inserting new interview into database...");
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
    console.log("Interview created with ID:", createdInterview.id);

    return { success: true, data: { interviewId: createdInterview.id } };
  } catch (error) {
    console.error("Error en createNewInterview:", error);
    return {
      success: false,
      message: "Error al crear entrevista",
      error: error as unknown,
    };
  }
};
