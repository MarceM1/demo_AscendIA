"use server";
import { db, users } from "@/database/db";
// import { eq } from "drizzle-orm";
// import { revalidatePath } from "next/cache";

interface ClerkUserPayload {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imgUrl?: string;
}

export async function syncUserWithDatabase(user: ClerkUserPayload) {
  

  try {

    if (!user.email) {
      console.warn(`Intento de sync sin email válido: ${user.clerkId}`);
      return { status: "invalid", message: "missing_email" };
    }

    const result = await db
      .insert(users)
      .values({
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        imgUrl: user.imgUrl,
        role: "USER",
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: users.clerkId,
        set: {
          email: user.email,
          firstName: user.firstName ?? "Usuario",
          lastName: user.lastName ?? "",
          imgUrl: user.imgUrl ?? "/user.svg",
          updatedAt: new Date(),
        },
      })
      .returning({
        id: users.id,
      });

    const updatedUser = result?.[0];

    if (updatedUser) {
      console.log(`Usuario sincronizado: ${user.email}`);
      return { status: "sync", userId: updatedUser.id };
    }

    console.log("No se pudo sincronizar el usuario:", user.email);
    return { status: "no_change", userId: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error al sincronizar el usuario:", error);
    return { status: "error", message: error.message };
  }
}
