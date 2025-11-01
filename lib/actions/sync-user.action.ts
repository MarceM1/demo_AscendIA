"use server";
import { db, users } from "@/database/db";
import { eq } from "drizzle-orm";
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
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.clerkId, user.clerkId),
    });

    if (existingUser) {
      await db
        .update(users)
        .set({
          email: user.email,
          firstName: user.firstName ?? existingUser.firstName,
          lastName: user.lastName ?? existingUser.lastName,
          imgUrl: user.imgUrl ?? existingUser.imgUrl,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, user.clerkId));
      console.log(`Usuario actualizado: ${user.email}`);
      // revalidatePath("/dashboard");
      return { status: "updated", userId: existingUser.id };
    }

    const newUser = await db
      .insert(users)
      .values({
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        imgUrl: user.imgUrl,
        role: "USER",
      })
      .returning({
        id: users.id,
      });

      console.log(`Nuevo usuario creado: ${user.email}`);
      // revalidatePath("/dashboard");
      return { status: "created", userId: newUser[0].id };

  } catch (error) {
    console.error("Error al sincronizar el usuario:", error);
  }
  console.log("Usuario Sincronizado");
}
