"use server";

import { auth } from "@clerk/nextjs/server";
import { db, users } from "@/database/db";
import { eq } from "drizzle-orm";

export async function getInternalUser() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
    columns: { id: true }, // optimizado
  });

  if (!dbUser) return null;

  return {
    clerkId,
    internalId: dbUser.id,
  };
}
